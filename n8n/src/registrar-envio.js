// ============================================================
// Registrar envio — Code node (n8n), "Run Once for All Items"
// Roda só depois do Salesforce confirmar a criação do lead: guarda o hash
// do envio (sem dados pessoais) para barrar reenvios iguais por 10 min e
// devolve o id do lead para a resposta ao formulário.
// ============================================================

const lead = $input.first().json;
const { dedupe_key: chave } = $('Validar payload').first().json;

if (!lead || !lead.id) throw new Error('salesforce_sem_id');

const store = $getWorkflowStaticData('global');
store.envios = store.envios || {};
if (chave) store.envios[chave] = Date.now();

return [{ json: { lead_id: lead.id, fatura_status: $('Preparar Lead').first().json.fatura_status } }];
