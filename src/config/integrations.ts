/**
 * Config pública do site.
 *
 * Backend: Supabase externo (projeto ufbkblkahyzfsjsoqmzg).
 *
 * - Chamadas de API/formulário → Edge Functions (via supabase.functions.invoke).
 *   Secrets ficam no Supabase (Dashboard → Edge Functions → Manage secrets):
 *   FORM_WEBHOOK_URL, SALESFORCE_API, BLOG_API, API.
 *
 * - Valores públicos do frontend (WhatsApp, tracking, vagas) ficam na tabela
 *   `public.app_config` no Supabase (RLS de leitura pública). São lidos no
 *   boot da app (loadAppConfig) e ficam disponíveis em INTEGRATIONS.
 */
import { supabase } from '@/lib/supabase'

type IntegrationsShape = {
  WHATSAPP_LINK: string
  WHATSAPP_LINK_COMPRAS: string
  WHATSAPP_LINK_PARCERIAS: string
  RDSTATION_TRACKING_SCRIPT_URL: string
  VAGAS_URL: string
  GTM_ID: string
}

// Defaults usados enquanto a config remota não carrega (e como fallback).
export const INTEGRATIONS: IntegrationsShape = {
  WHATSAPP_LINK: 'https://wa.link/o6o37f',
  WHATSAPP_LINK_COMPRAS: '/contato',
  WHATSAPP_LINK_PARCERIAS: '/contato',
  RDSTATION_TRACKING_SCRIPT_URL: '',
  VAGAS_URL: 'https://grupobcenergia.vagas.solides.com.br',
  GTM_ID: ''
}

const REMOTE_KEYS: Array<keyof IntegrationsShape> = [
  'WHATSAPP_LINK',
  'WHATSAPP_LINK_COMPRAS',
  'WHATSAPP_LINK_PARCERIAS',
  'RDSTATION_TRACKING_SCRIPT_URL',
  'VAGAS_URL',
  'GTM_ID'
]

// Alias aceito no banco (o pedido do usuário mencionou este nome).
const KEY_ALIASES: Record<string, keyof IntegrationsShape> = {
  RDSTATION_TRACKING_CODE_SCRIPT_URL: 'RDSTATION_TRACKING_SCRIPT_URL'
}

let loaded: Promise<void> | null = null

export const loadAppConfig = (): Promise<void> => {
  if (loaded) return loaded
  loaded = (async () => {
    try {
      const { data, error } = await supabase.from('app_config').select('key,value')
      if (error) {
        console.warn('[app_config] erro ao carregar:', error.message)
        return
      }
      for (const row of data ?? []) {
        const raw = String((row as any).key || '')
        const key = (KEY_ALIASES[raw] || raw) as keyof IntegrationsShape
        if (REMOTE_KEYS.includes(key) && typeof (row as any).value === 'string') {
          INTEGRATIONS[key] = (row as any).value
        }
      }
    } catch (e) {
      console.warn('[app_config] falha:', e)
    }
  })()
  return loaded
}
