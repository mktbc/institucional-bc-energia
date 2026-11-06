import { INTEGRATIONS, loadAppConfig } from "@/config/integrations";

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
 * URL do webhook n8n, por ambiente. Ordem:
 * 1. VITE_SIMULADOR_WEBHOOK_URL (variável de build);
 * 2. chave SIMULADOR_WEBHOOK_URL em public.app_config (Supabase, sem novo build).
 * Sem valor válido (https), retorna "" e o formulário não envia o lead.
 */
export async function resolveCaptureEndpoint(): Promise<string> {
  const fromEnv = String(import.meta.env.VITE_SIMULADOR_WEBHOOK_URL ?? "").trim();
  let url = fromEnv;
  if (!url) {
    await loadAppConfig();
    url = String(INTEGRATIONS.SIMULADOR_WEBHOOK_URL ?? "").trim();
  }
  return /^https:\/\/[^\s]+$/i.test(url) ? url : "";
}
