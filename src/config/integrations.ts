/**
 * Central de integrações do site institucional.
 *
 * ⚠️  TODO: TI reconectar — todos os valores abaixo são PLACEHOLDERS.
 * Na migração de Next.js para React+Vite, a camada de backend (API routes,
 * Salesforce, blog, webhook de formulário) NÃO foi portada. A UI permanece
 * intacta; apenas as fontes de dados foram mockadas.
 *
 * Ao religar os serviços, o ideal é ler estes valores de variáveis de
 * ambiente do Vite (ex.: import.meta.env.VITE_FORM_WEBHOOK_URL).
 */
export const INTEGRATIONS = {
  /** Endpoint que recebe os formulários (antes: /api/form → N8N_WEBHOOK_URL). */
  FORM_WEBHOOK_URL: '', // TODO: TI reconectar endpoint de envio de formulários

  /** API de números/estatísticas da home (antes: SALESFORCE_API → getNumbers). */
  SALESFORCE_API: '', // TODO: TI reconectar Salesforce

  /** API de posts do blog (antes: BLOG_API / rota /api/blog). */
  BLOG_API: '', // TODO: TI reconectar API do blog

  /** API de segmentos (antes: process.env.API/segments). Hoje há mock local em src/data/segments. */
  SEGMENTS_API: '', // TODO: TI reconectar API de segmentos (opcional — há dados locais)

  /** Link de WhatsApp para fornecedores/compras (antes: WHATSAPP_LINK_COMPRAS). */
  WHATSAPP_LINK_COMPRAS: '/contato', // TODO: TI reconectar (ex.: https://wa.me/55...)

  /** Link de WhatsApp para parcerias (antes: WHATSAPP_LINK_PARCERIAS). */
  WHATSAPP_LINK_PARCERIAS: '/contato', // TODO: TI reconectar

  /** URL do loader de rastreamento RD Station (antes: RDSTATION_TRACKING_CODE_SCRIPT_URL). */
  RDSTATION_TRACKING_SCRIPT_URL: '', // TODO: TI reconectar loader RD Station

  /** ID do Google Tag Manager (antes hardcoded: GTM-KWRL7CWP). */
  GTM_ID: '' // TODO: TI reconectar GTM
} as const
