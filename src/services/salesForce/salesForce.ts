/**
 * Números da seção "Numbers" via Edge Function `salesforce-numbers`.
 * Secret usado pela function: SALESFORCE_API.
 *
 * Alguns contextos (ex.: "segmentos") não existem no Salesforce e a Apex
 * responde 500. Nesse caso tentamos o contexto "home" e, por fim, o fallback
 * local — sem quebrar a página. (Mesma regra aplicada no projeto Lovable.)
 */
import { getSupabase } from '@/lib/supabase'
import { COMPANY_METRICS_LEGACY } from '@/data/companyMetrics'

type NumberItem = { title?: string; subtitle?: string }

const FALLBACK: NumberItem[] = COMPANY_METRICS_LEGACY

const fetchContext = async (context: string): Promise<NumberItem[] | null> => {
  try {
    const { data, error } = await (await getSupabase()).functions.invoke(
      `salesforce-numbers?context=${encodeURIComponent(context)}`,
      { method: 'GET' }
    )
    if (error) return null
    return Array.isArray(data) && data.length ? (data as NumberItem[]) : null
  } catch {
    return null
  }
}

export const getNumbers = async (context: string): Promise<NumberItem[]> => {
  const ctx = context || 'home'
  const primary = await fetchContext(ctx)
  if (primary) return primary
  if (ctx !== 'home') {
    const home = await fetchContext('home')
    if (home) return home
  }
  console.warn(`[salesforce-numbers] sem dados para "${ctx}", usando fallback local`)
  return FALLBACK
}
