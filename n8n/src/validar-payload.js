// ============================================================
// Validar payload — Code node (n8n), "Run Once for All Items"
// Simulador institucional (/simulador-de-economia) → n8n → Salesforce.
//
// Valida o JSON recebido pelo webhook ANTES de qualquer gravação
// (Drive ou Salesforce) e devolve um único item:
//   { valido, erro, fatura_presente, duplicado, dedupe_key, body }
// `body` é a cópia normalizada do que o formulário enviou; a fatura em
// base64 segue só em `body.fatura_base64` (o campo `fatura`, mantido no
// contrato por compatibilidade com a PageConv, é aceito como alternativa).
// Nenhum dado pessoal é devolvido nas respostas de erro.
// ============================================================

// Regra comercial do formulário: a fatura é obrigatória NO FRONT-END.
// Aqui fica false para que um lead nunca seja descartado só por falta
// do arquivo (ele segue para o Salesforce sem link de fatura).
const EXIGIR_FATURA = false;

const MAX_FATURA_BYTES = 10 * 1024 * 1024; // mesmo limite do formulário (10 MB)
const TIPOS_FATURA = ['application/pdf', 'image/jpeg', 'image/png'];
const ESTADOS = ['GO', 'TO', 'PR', 'MG', 'MT'];
const TIPOS_CONTA = ['Residencial', 'Comercial', 'Industrial'];
const TITULAR = ['Sim', 'Não', 'Nao'];
const JANELA_DUPLICIDADE_MS = 10 * 60 * 1000; // 10 min

const raw = $input.first().json.body;
const body = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : null;

const str = (v, max = 255) => String(v ?? '').trim().slice(0, max);
const isTrue = (v) => v === true || String(v ?? '').trim().toLowerCase() === 'true';

function falha(erro) {
  return [{ json: { valido: false, erro, fatura_presente: false, duplicado: false } }];
}

if (!body) return falha('payload_invalido');

// ---------- campos obrigatórios ----------
const nome = str(body.nome, 120);
const whatsDigits = String(body.whatsapp || body.telefone_sf || '').replace(/\D/g, '');
const email = str(body.email || body.email_sf, 120).toLowerCase();
const estado = str(body.estado, 2).toUpperCase();
const valorConta = str(body.valor_conta, 60);
const tipo = str(body.tipo, 30);
const titular = str(body.titular, 10);

const faltando =
  nome.length < 2 ||
  whatsDigits.length < 10 || whatsDigits.length > 13 ||
  (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
  !ESTADOS.includes(estado) ||
  !valorConta ||
  !TIPOS_CONTA.includes(tipo) ||
  !TITULAR.includes(titular) ||
  !isTrue(body.lgpd);
if (faltando) return falha('payload_invalido');

// ---------- fatura (base64, sem o prefixo data:) ----------
let base64 = String(body.fatura_base64 || body.fatura || '').replace(/\s+/g, '');
if (base64.startsWith('data:')) base64 = base64.slice(base64.indexOf(',') + 1);
const faturaPresente = base64.length > 0;

if (!faturaPresente && EXIGIR_FATURA) {
  return falha('fatura_ausente');
}

let faturaTipo = str(body.fatura_tipo, 60).toLowerCase();
let faturaBytes = 0;
if (faturaPresente) {
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64) || base64.length % 4 !== 0) return falha('fatura_invalida');
  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  faturaBytes = (base64.length / 4) * 3 - padding;
  if (faturaBytes <= 0 || faturaBytes > MAX_FATURA_BYTES) return falha('fatura_invalida');

  // Confere o tipo real pelo início do arquivo (não confia só no MIME enviado).
  const head = Buffer.from(base64.slice(0, 16), 'base64');
  const real =
    head.slice(0, 4).toString('latin1') === '%PDF' ? 'application/pdf'
    : head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff ? 'image/jpeg'
    : head[0] === 0x89 && head.slice(1, 4).toString('latin1') === 'PNG' ? 'image/png'
    : '';
  if (!real || (faturaTipo && faturaTipo !== real && !(faturaTipo === 'image/jpg' && real === 'image/jpeg'))) {
    return falha('fatura_invalida');
  }
  faturaTipo = real;
}
if (faturaPresente && !TIPOS_FATURA.includes(faturaTipo)) return falha('fatura_invalida');

// Nome do arquivo sem caminho nem caracteres de controle.
const ext = { 'application/pdf': '.pdf', 'image/jpeg': '.jpg', 'image/png': '.png' }[faturaTipo] || '';
let faturaNome = str(body.fatura_nome, 120).replace(/[\\/:*?"<>|\u0000-\u001f]/g, '').trim();
if (faturaPresente && !faturaNome) faturaNome = 'fatura' + ext;

// ---------- duplicidade ----------
// Mesmo WhatsApp + e-mail + faixa de valor + tamanho da fatura em até 10 min.
// Guarda só um hash (sem dados pessoais) em staticData; vale para execuções
// de produção (workflow ativo). O registro é feito em "Registrar envio",
// depois do Salesforce confirmar, para não bloquear um reenvio após falha.
function fnv1a(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}
const dedupeKey = fnv1a([whatsDigits.slice(-11), email, valorConta, faturaBytes].join('|'));
const store = $getWorkflowStaticData('global');
const agora = Date.now();
store.envios = store.envios || {};
for (const [k, t] of Object.entries(store.envios)) if (agora - t > JANELA_DUPLICIDADE_MS) delete store.envios[k];
const duplicado = Boolean(store.envios[dedupeKey]);

return [{
  json: {
    valido: true,
    erro: '',
    fatura_presente: faturaPresente,
    duplicado,
    dedupe_key: dedupeKey,
    body: {
      ...body,
      nome,
      email,
      estado,
      valor_conta: valorConta,
      tipo,
      titular,
      fatura: '',
      fatura_base64: base64,
      fatura_anexada: faturaPresente ? 'true' : 'false',
      fatura_nome: faturaPresente ? faturaNome : '',
      fatura_tipo: faturaPresente ? faturaTipo : '',
      fatura_tamanho: faturaPresente ? String(faturaBytes) : '',
    },
  },
}];
