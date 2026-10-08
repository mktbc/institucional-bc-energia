/**
 * Cliente Supabase carregado sob demanda.
 *
 * PERFORMANCE 02 — o pacote `@supabase/supabase-js` pesa ~214 KB brutos
 * (~55 KB gzip). Antes ele entrava no bundle inicial de TODAS as rotas
 * (inclusive as que nunca chamam o backend), porque `lib/supabase.ts` era
 * importado estaticamente por `config/integrations.ts` (executado no boot).
 *
 * Agora o módulo é buscado via `import()` apenas quando alguém realmente
 * precisa do cliente — formulários, serviços (blog/segmentos/salesforce) e
 * o carregamento assíncrono da config pública.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

let clientPromise: Promise<SupabaseClient> | null = null

/**
 * Retorna (e memoiza) o cliente Supabase, baixando o SDK sob demanda.
 *
 * As variáveis `import.meta.env` são lidas AQUI, não em nível de módulo:
 * `import.meta.env` só existe sob Vite, então a leitura no topo do arquivo
 * quebrava qualquer ferramenta Node que importasse este módulo pela cadeia
 * `config/integrations` → `Navbar/Items.data` → `config/navigation`
 * (ex.: `scripts/audit-navigation.ts` sob `tsx`). Os valores e os fallbacks
 * são os mesmos, e continuam sendo resolvidos uma única vez, porque o
 * cliente é memoizado.
 */
export const getSupabase = (): Promise<SupabaseClient> => {
  if (!clientPromise) {
    const supabaseUrl =
      (import.meta.env.VITE_SUPABASE_URL as string) || 'https://ufbkblkahyzfsjsoqmzg.supabase.co'
    const supabaseAnonKey =
      (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
      'sb_publishable_IEyoZTETPiYQaFd7X2MNLQ_ar-1YyHY'

    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false }
      })
    )
  }
  return clientPromise
}
