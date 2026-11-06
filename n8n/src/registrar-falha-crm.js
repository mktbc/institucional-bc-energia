// ============================================================
// Registrar falha no CRM — Code node (n8n), "Run Once for All Items"
// Recebe a saída de erro de "Criar Lead no Salesforce" e extrai a
// mensagem do Salesforce (ex.: REQUIRED_FIELD_MISSING, INVALID_FIELD,
// INVALID_OR_NULL_FOR_RESTRICTED_PICKLIST). A mensagem NÃO vai para o
// visitante (a resposta continua genérica, 502 crm_indisponivel); ela vai
// para "Marcar execução com erro", que faz o n8n salvar a execução
// (saveDataErrorExecution: all) com o erro e o lead completo, para
// diagnóstico e reprocessamento sem perder o lead.
// ============================================================
const e = $input.first().json.error;
const texto =
  typeof e === 'string' ? e
  : e && typeof e === 'object' ? [e.message, e.description, e.cause && e.cause.message].filter(Boolean).join(' | ')
  : JSON.stringify($input.first().json);
const codigo = (String(texto).match(/\b[A-Z][A-Z_]{5,}\b/) || [''])[0];
return [{ json: { crm_codigo: codigo || 'DESCONHECIDO', crm_erro: String(texto).slice(0, 800) } }];
