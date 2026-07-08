/**
 * Números da seção "Numbers" via Edge Function `salesforce-numbers`.
 * Secret usado pela function: SALESFORCE_API.
 */
import { supabase } from '@/lib/supabase'

type NumberItem = { title?: string; subtitle?: string }

const FALLBACK: NumberItem[] = [
  { title: '+ de 5 mil', subtitle: 'clientes recebendo nossas soluções em economia' },
  { title: '+ de R$400M', subtitle: 'de economia gerada aos nossos clientes' },
  { title: '+ de 15 mil', subtitle: 'toneladas de CO2 evitados na atmosfera' }
]

export const getNumbers = async (context: string): Promise<NumberItem[]> => {
  try {
    const { data, error } = await supabase.functions.invoke(
      `salesforce-numbers?context=${encodeURIComponent(context || '')}`,
      { method: 'GET' }
    )
    if (error) {
      console.error('salesforce-numbers error:', error)
      return FALLBACK
    }
    if (Array.isArray(data) && data.length) return data as NumberItem[]
    return FALLBACK
  } catch (e) {
    console.error('salesforce-numbers exception:', e)
    return FALLBACK
  }
}
