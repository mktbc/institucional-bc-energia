import type { BCIconName } from '@/config/icons'

type Pillar = { title: string; text: string; icon: BCIconName }

export const PILLARS: Array<Pillar> = [
  {
    title: 'Economia',
    icon: 'economia-na-conta',
    text: 'Redução consistente do custo de energia com estratégias no Mercado Livre e em geração distribuída.'
  },
  {
    title: 'Gestão',
    icon: 'monitoramento-consumo',
    text: 'Contratos, medição e faturamento acompanhados por um time técnico dedicado.'
  },
  {
    title: 'Previsibilidade',
    icon: 'contrato-aprovado',
    text: 'Contratos de longo prazo e acompanhamento do diagnóstico ao suporte, sem surpresas na conta.'
  },
  {
    title: 'Sustentabilidade',
    icon: 'planeta-sustentavel',
    text: 'Energia de fonte renovável, com origem comprovável e impacto positivo na agenda ESG.'
  }
]

