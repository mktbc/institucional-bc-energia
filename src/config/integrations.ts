/**
 * Central de integrações do site institucional.
 *
 * Sem Lovable Cloud / edge functions: estes valores são públicos no navegador.
 * Para produção no Lovable sem Build Secrets, preencha PUBLIC_INTEGRATION_VALUES
 * abaixo. Variáveis `VITE_*` continuam funcionando em ambientes externos que as
 * injetem no build.
 *
 * ⚠️  Tudo que começa com `VITE_` vai para o bundle e é público no navegador.
 * NÃO coloque chaves privadas / tokens de servidor aqui — para isso é preciso
 * um backend (Lovable Cloud / edge function).
 */
const env = import.meta.env

const PUBLIC_INTEGRATION_VALUES = {
  FORM_WEBHOOK_URL: '',
  API: '',
  SALESFORCE_API: '',
  BLOG_API: '',
  SEGMENTS_API: '',
  WHATSAPP_LINK: '',
  WHATSAPP_LINK_COMPRAS: '',
  WHATSAPP_LINK_PARCERIAS: '',
  RDSTATION_TRACKING_SCRIPT_URL: '',
  VAGAS_URL: '',
  GTM_ID: ''
} as const

const pick = (value: string | undefined, fallback = ''): string =>
  (value ?? '').trim() || fallback

export const INTEGRATIONS = {
  /** Endpoint que recebe os formulários (antes: /api/form → N8N_WEBHOOK_URL). */
  FORM_WEBHOOK_URL: pick(
    PUBLIC_INTEGRATION_VALUES.FORM_WEBHOOK_URL,
    pick(env.VITE_FORM_WEBHOOK_URL ?? env.VITE_N8N_WEBHOOK_URL)
  ),

  /** API interna (antes: process.env.API). */
  API: pick(PUBLIC_INTEGRATION_VALUES.API, pick(env.VITE_API)),

  /** API de números/estatísticas da home (antes: SALESFORCE_API → getNumbers). */
  SALESFORCE_API: pick(PUBLIC_INTEGRATION_VALUES.SALESFORCE_API, pick(env.VITE_SALESFORCE_API)),

  /** API de posts do blog (antes: BLOG_API / rota /api/blog). */
  BLOG_API: pick(PUBLIC_INTEGRATION_VALUES.BLOG_API, pick(env.VITE_BLOG_API)),

  /** API de segmentos (opcional — há dados locais em src/data/segments). */
  SEGMENTS_API: pick(PUBLIC_INTEGRATION_VALUES.SEGMENTS_API, pick(env.VITE_SEGMENTS_API)),

  /** Link de WhatsApp principal. */
  WHATSAPP_LINK: pick(
    PUBLIC_INTEGRATION_VALUES.WHATSAPP_LINK,
    pick(env.VITE_WHATSAPP_LINK, 'https://wa.link/o6o37f')
  ),

  /** Link de WhatsApp para fornecedores/compras. */
  WHATSAPP_LINK_COMPRAS: pick(
    PUBLIC_INTEGRATION_VALUES.WHATSAPP_LINK_COMPRAS,
    pick(env.VITE_WHATSAPP_LINK_COMPRAS, '/contato')
  ),

  /** Link de WhatsApp para parcerias. */
  WHATSAPP_LINK_PARCERIAS: pick(
    PUBLIC_INTEGRATION_VALUES.WHATSAPP_LINK_PARCERIAS,
    pick(env.VITE_WHATSAPP_LINK_PARCERIAS, '/contato')
  ),

  /** URL do loader de rastreamento RD Station. */
  RDSTATION_TRACKING_SCRIPT_URL: pick(
    PUBLIC_INTEGRATION_VALUES.RDSTATION_TRACKING_SCRIPT_URL,
    pick(env.VITE_RDSTATION_TRACKING_CODE_SCRIPT_URL)
  ),

  /** URL da página de vagas (Solides etc.). */
  VAGAS_URL: pick(
    PUBLIC_INTEGRATION_VALUES.VAGAS_URL,
    pick(env.VITE_VAGAS_URL, 'https://grupobcenergia.vagas.solides.com.br')
  ),

  /** ID do Google Tag Manager. */
  GTM_ID: pick(PUBLIC_INTEGRATION_VALUES.GTM_ID, pick(env.VITE_GTM_ID))
} as const
