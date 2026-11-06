export type SubmissionFailure = "file_read" | "network" | "http" | "not_configured" | "unconfirmed";

/**
 * O workflow n8n só responde `{ success: true, lead_id }` depois que o
 * Salesforce cria o lead (ou `{ success: true, duplicate: true }` para um
 * reenvio já confirmado). Um 2xx sem isso — por exemplo, um nó de resposta
 * provisório antes do Salesforce — não conta como sucesso.
 */
export function crmConfirmou(responseText: string): boolean {
  try {
    const data = JSON.parse(responseText);
    if (!data || data.success !== true) return false;
    return data.duplicate === true || (typeof data.lead_id === "string" && data.lead_id.trim().length > 0);
  } catch {
    return false;
  }
}

/** Never display arbitrary webhook bodies, which may contain personal data. */
export function submissionErrorMessage(failure: SubmissionFailure, status?: number): string {
  if (failure === "file_read") {
    return "Não conseguimos ler a fatura anexada. Selecione o arquivo novamente ou use outra cópia em PDF, JPG ou PNG. Seus dados foram mantidos.";
  }
  // Site institucional: webhook do simulador ainda não configurado no ambiente.
  if (failure === "not_configured") {
    return "O envio está temporariamente indisponível e sua solicitação não foi enviada. Seus dados foram mantidos. Fale com nossa equipe pelo WhatsApp.";
  }
  if (failure === "unconfirmed") {
    return "O envio chegou ao serviço, mas o cadastro não foi confirmado. Seus dados e o anexo foram mantidos. Confirme com nossa equipe antes de reenviar para evitar duplicidade.";
  }
  if (failure === "network") {
    return "A conexão falhou e não conseguimos confirmar o recebimento. Seus dados e o anexo foram mantidos. Antes de reenviar, confirme com nossa equipe se a solicitação chegou para evitar duplicidade.";
  }
  if (status === 413) {
    return "O serviço recusou o tamanho do envio (HTTP 413). Selecione uma fatura menor em PDF, JPG ou PNG. Seus dados foram mantidos.";
  }
  if (status === 400 || status === 422) {
    return `O serviço recusou os dados ou o anexo (HTTP ${status}). Seus dados foram mantidos. Nossa equipe precisa verificar a resposta do envio para identificar o campo recusado.`;
  }
  if (status === 401 || status === 403) {
    return `O serviço não autorizou o envio (HTTP ${status}). Seus dados foram mantidos. Entre em contato com nossa equipe; não é necessário alterar seus dados.`;
  }
  return `O serviço retornou um erro${status ? ` (HTTP ${status})` : ""} e não conseguimos confirmar o recebimento. Seus dados e o anexo foram mantidos. Confirme com nossa equipe antes de reenviar para evitar duplicidade.`;
}