// ============================================================
// Preparar Lead — Code node (n8n), "Run Once for All Items"
// Base: "Preparar Lead1" do workflow "LP PageConv - Criação do SalesForce"
// (Padrão UTM v5.2, mesmos nomes e fallbacks). Mudanças para o simulador
// institucional estão marcadas com [SIMULADOR].
// ============================================================

// [SIMULADOR] Produção: macros não resolvidas ({{campaign.name}}, {campaignid},
// __PLACEMENT__) não vão para o CRM. Para depurar mapeamento, mude para false.
const LIMPAR_MACROS = true;

// [SIMULADOR] Lê o payload já validado (e não o webhook bruto).
const validado = $('Validar payload').first().json;
const body = validado.body || {};

// ------------------------------------------------------------
// HELPERS (iguais ao original)
// ------------------------------------------------------------

// Macros de plataforma que NAO foram resolvidas.
// Meta: {{campaign.name}} | Google: {campaignid} | TikTok: __CAMPAIGN_ID__
const MACRO_NAO_RESOLVIDA = /^(\{\{.*\}\}|\{[^{}]*\}|__.*__)$/;

function clean(v) {
  const s = String(v ?? '').trim();
  if (!s) return '';
  const low = s.toLowerCase();
  if (low === 'undefined' || low === 'null') return '';
  if (LIMPAR_MACROS && MACRO_NAO_RESOLVIDA.test(s)) return '';
  return s;
}

function pick(...vals) {
  for (const v of vals) {
    const c = clean(v);
    if (c) return c;
  }
  return '';
}

function boolOf(v) {
  return v === true || String(v ?? '').trim().toLowerCase() === 'true';
}

function cut(v, max) {
  const s = clean(v);
  return s.length > max ? s.slice(0, max) : s;
}

// [SIMULADOR] Campos texto do Salesforce: no máximo 255 caracteres.
const t = (v) => cut(v, 255);

// Telefone -> formato Salesforce (DD) 9XXXX-XXXX
function telSF(raw) {
  let d = String(raw || '').replace(/\D/g, '');
  if (d.length > 11 && d.startsWith('55')) d = d.slice(2);
  if (d.length === 10) d = d.slice(0, 2) + '9' + d.slice(2);
  if (d.length !== 11) return String(raw || '');
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// ------------------------------------------------------------
// FATURA (Drive)
// [SIMULADOR] Distingue "sem fatura" de "upload falhou": se o Drive falhar,
// o lead é criado mesmo assim e a falha fica registrada na descrição.
// ------------------------------------------------------------

let faturaUrl = '';
try {
  const up = $('Upload da fatura').first().json;
  if (up && up.id && !up.error) faturaUrl = `https://drive.google.com/file/d/${up.id}/view`;
} catch (e) {
  faturaUrl = ''; // branch sem anexo, ou a pasta não foi criada
}
const faturaStatus = !validado.fatura_presente ? 'sem_fatura' : faturaUrl ? 'anexada' : 'upload_falhou';

// ------------------------------------------------------------
// CAMPOS DERIVADOS / FALLBACKS (iguais ao original)
// ------------------------------------------------------------

// utm_project_id virou utm_campaign_code.
// FALLBACK PERMANENTE: existe QR code impresso que nao pode ser reemitido.
const campaignCode = pick(body.utm_campaign_code, body.utm_project_id);

// utm_adgroup foi unificado em utm_adset.
const adset = pick(body.utm_adset, body.utm_adgroup);
const adsetId = pick(body.utm_adset_id, body.utm_adgroup_id);

const cidade = pick(body.cidade, body.utm_city);
const estado = pick(body.estado, body.utm_state);

// ------------------------------------------------------------
// [SIMULADOR] Identificação da origem institucional. Campos próprios,
// sem sobrescrever utm_source/utm_campaign_code/utm_lp reais.
// ------------------------------------------------------------
const leadOrigin = pick(body.origem_site) || 'site_institucional';
const leadForm = pick(body.form_name, body.origem_formulario) || 'simulador_institucional';
const pagePath = pick(body.origem_pagina, body.page_path) || '/simulador-de-economia';

const nome = cut(body.nome, 80);

// [SIMULADOR] Company é obrigatório no Lead do Salesforce e o formulário não
// coleta empresa. Padrão do Salesforce para pessoa física/lead sem empresa:
// usar o nome da pessoa. Não é inventado nenhum dado comercial.
const company = nome;

// [SIMULADOR] Dados do formulário sem campo próprio no mapeamento original
// (tipo de conta, titularidade, consentimento LGPD, origem e situação da
// fatura) vão para o campo padrão Description, sem criar campos no CRM.
const statusFaturaTexto = {
  anexada: 'anexada (link no campo Link da fatura)',
  sem_fatura: 'não enviada',
  upload_falhou: 'enviada pelo visitante, mas o upload no Drive falhou; solicitar reenvio',
}[faturaStatus];
const descricao = [
  'Lead do simulador de economia do site institucional.',
  `Tipo de conta: ${clean(body.tipo) || '-'}`,
  `Titular da conta: ${clean(body.titular) || '-'}`,
  `Consentimento LGPD: ${boolOf(body.lgpd) ? 'sim' : 'não'}${clean(body.created_at) ? ` (${clean(body.created_at)})` : ''}`,
  `Fatura: ${statusFaturaTexto}`,
  `Origem: ${leadOrigin} · formulário ${leadForm} · página ${pagePath}`,
].join('\n');

// ------------------------------------------------------------
// PAYLOAD (mesmos campos do original + os marcados [SIMULADOR])
// ------------------------------------------------------------

return [{
  json: {
    // --- dados do formulario ---
    nome,
    company,
    email: clean(body.email || body.email_sf).toLowerCase(),
    telefone_sf: telSF(body.whatsapp || body.telefone_sf),
    cidade: t(cidade),
    estado: t(estado),
    valor_conta: t(body.valor_conta),
    tipo: t(body.tipo),
    titular: t(body.titular),
    lgpd: boolOf(body.lgpd),

    // --- fatura ---
    fatura_url: faturaUrl,
    fatura_status: faturaStatus,
    fatura_anexada: boolOf(body.fatura_anexada),
    fatura_nome: t(body.fatura_nome),
    fatura_tipo: t(body.fatura_tipo),
    fatura_tamanho: t(body.fatura_tamanho),

    // --- rastreio / contexto ---
    lead_source: t(body.lead_source),
    origem_formulario: t(body.origem_formulario),
    lead_origin: leadOrigin,
    lead_form: leadForm,
    gclid: t(body.gclid),
    page_url: t(body.page_url),
    page_url_full: t(body.page_url_full),
    page_path: pagePath,
    created_at: t(body.created_at),
    descricao,

    // --- identificacao da origem ---
    utm_source: t(body.utm_source),
    utm_medium: t(body.utm_medium),
    utm_font: t(body.utm_font),
    utm_channel: t(body.utm_channel),
    utm_placement: t(body.utm_placement),

    // --- campanha BC (interna) ---
    utm_campaign_code: t(campaignCode),
    utm_campaign: t(body.utm_campaign),
    utm_campaign_id: t(body.utm_campaign_id),
    utm_link_id: t(body.utm_link_id),

    // --- hierarquia do gerenciador de anuncios ---
    utm_adcampaign: t(body.utm_adcampaign),
    utm_adcampaign_id: t(body.utm_adcampaign_id),
    utm_adset: t(adset),
    utm_adset_id: t(adsetId),
    utm_content: t(body.utm_content),
    utm_content_id: t(body.utm_content_id),
    utm_term: t(body.utm_term),

    // --- originador / vendedor ---
    utm_originator: t(body.utm_originator),
    utm_seller: t(body.utm_seller),

    // --- classificacao ---
    utm_product: t(body.utm_product),
    utm_segment: t(body.utm_segment),
    utm_public: t(body.utm_public),
    utm_region: t(body.utm_region),
    utm_state: t(body.utm_state),
    utm_city: t(body.utm_city),
    utm_offer: t(body.utm_offer),
    utm_objective: t(body.utm_objective),
    utm_contract: t(body.utm_contract),
    utm_lp: t(body.utm_lp),
    utm_id: t(body.utm_id),

    // --- legado (mantidos pra nao quebrar mapeamento existente) ---
    utm_project_id: t(body.utm_project_id),
    utm_adgroup: t(body.utm_adgroup),
    utm_adgroup_id: t(body.utm_adgroup_id),
  },
}];
