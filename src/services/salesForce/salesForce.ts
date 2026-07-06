/**
 * Números da seção "Numbers" (home e demais páginas que usam o bloco).
 *
 * Valores REAIS e FIXOS (hardcoded), definidos pela BC Energia. Substituem o
 * antigo mock com valores fictícios e a integração original com o Salesforce.
 *
 * // TODO: TI pode reconectar getNumbers (Salesforce) no futuro se quiser
 * valores dinâmicos. Endpoint original:
 * `${SALESFORCE_API}/getDadosParaConsulta-EILPjWCr1IDO7sF?query=<context>`
 */

type NumberItem = { title?: string; subtitle?: string }

// Números reais atuais, fixos no código.
const NUMBERS: NumberItem[] = [
  { title: '+ de 5 mil', subtitle: 'clientes recebendo nossas soluções em economia' },
  { title: '+ de R$400M', subtitle: 'de economia gerada aos nossos clientes' },
  { title: '+ de 15 mil', subtitle: 'toneladas de CO2 evitados na atmosfera' }
]

export const getNumbers = async (context: string): Promise<NumberItem[]> => {
  // TODO: TI pode reconectar getNumbers (Salesforce) no futuro para valores dinâmicos.
  return NUMBERS
}
