/**
 * Configuração do formulário do simulador institucional (adaptação da PageConv).
 *
 * Identificação de origem própria do site institucional: os leads desta página
 * não usam mais "pageconv" nem "GoogleAds" como origem padrão. Os nomes dos
 * campos do payload são os mesmos da PageConv (compatibilidade com o n8n e o
 * mapeamento do Salesforce); só os valores mudam, e há três campos novos
 * (origem_site, origem_pagina, form_name).
 */
export const LEAD_ORIGIN = {
  origem_site: "site_institucional",
  origem_pagina: "/simulador-de-economia",
  origem_formulario: "simulador_institucional",
  form_name: "simulador_institucional",
} as const;

/**
 * URL pública do webhook de produção do n8n (workflow do simulador
 * institucional). Não é credencial: é a mesma URL que o navegador chama.
 */
export const SIMULADOR_WEBHOOK_PRODUCAO =
  "https://automacao-gd.grupobcenergia.com.br/webhook/simulador-institucional-leads";

/**
 * URL do webhook n8n. Ordem:
 * 1. VITE_SIMULADOR_WEBHOOK_URL (variável de build), para apontar outro ambiente;
 * 2. no build de produção, SIMULADOR_WEBHOOK_PRODUCAO.
 * Não consulta mais o Supabase (app_config). Em `npm run dev` sem a variável,
 * retorna "" e o formulário fica em modo de teste (só registra no console),
 * para nenhum envio local virar lead real.
 */
export async function resolveCaptureEndpoint(): Promise<string> {
  const fromEnv = String(import.meta.env.VITE_SIMULADOR_WEBHOOK_URL ?? "").trim();
  const url = fromEnv || (import.meta.env.PROD ? SIMULADOR_WEBHOOK_PRODUCAO : "");
  return /^https:\/\/[^\s]+$/i.test(url) ? url : "";
}
