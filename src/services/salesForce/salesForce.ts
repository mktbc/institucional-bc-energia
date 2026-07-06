/**
 * MOCK — substitui a integração com o Salesforce (`getNumbers`).
 *
 * ⚠️  TODO: TI reconectar Salesforce.
 * Endpoint original: `${SALESFORCE_API}/getDadosParaConsulta-EILPjWCr1IDO7sF?query=<context>`
 * A UI (componente Numbers) permanece intacta; apenas a fonte de dados foi mockada.
 */

type NumberItem = { title?: string; subtitle?: string }

/**
 * Números de exemplo (PLACEHOLDER) para manter o layout da seção populado.
 * ⚠️  TODO: TI reconectar — estes valores são fictícios e devem vir do Salesforce.
 */
const MOCK_NUMBERS: Record<string, NumberItem[]> = {
  home: [
    { title: '+15 anos', subtitle: 'de atuação no setor elétrico' },
    { title: '+30 mil', subtitle: 'clientes atendidos' },
    { title: '+500 GWh', subtitle: 'de energia comercializada' },
    { title: 'Centro-Oeste', subtitle: 'maior comercializadora da região' }
  ]
}

export const getNumbers = async (context: string): Promise<NumberItem[]> => {
  // TODO: TI reconectar — trocar o mock abaixo por fetch ao Salesforce.
  return MOCK_NUMBERS[context] ?? MOCK_NUMBERS.home
}
