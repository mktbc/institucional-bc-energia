import type { BCIconName } from '@/config/icons'

/**
 * Escolhe um ícone da iconografia oficial para cada item de texto, pelo
 * assunto do título (e da descrição). Assim, benefícios, desafios e perfis de
 * todas as rotas ganham apoio visual sem duplicar dados nem alterar textos.
 * Dentro de uma mesma grade nenhum ícone se repete.
 */
type Rule = { match: RegExp; icons: Array<BCIconName> }

const RULES: Array<Rule> = [
  { match: /tipos de energia|fontes de energia/, icons: ['parque-eolico-solar', 'energia-eolica'] },
  { match: /industr/, icons: ['eficiencia-energetica', 'gestao-energia-renovavel'] },
  { match: /^comerc/, icons: ['economia-dinheiro', 'mercado-crescimento'] },
  { match: /^institui/, icons: ['contrato-aprovado', 'energia-global'] },
  { match: /residenc|condomin|hosped|conforto/, icons: ['solar-residencial', 'autoconsumo-solar'] },
  { match: /educac|saude|alimenta|idosos|comunidade|coletiva|recursos da/, icons: ['inovacao-sustentavel', 'ciclo-recursos', 'gestao-sustentavel'] },
  { match: /sustentab|esg|ambient|renovav|limpa|co2|i-rec|imagem da sua marca/, icons: ['planeta-sustentavel', 'energia-limpa', 'ciclo-energia-renovavel', 'inovacao-sustentavel', 'gestao-sustentavel'] },
  { match: /sem obra|sem instalac|estrutura fisica|sem mudanc|transtorno|adesao/, icons: ['geracao-distribuida', 'autoconsumo-solar', 'solar-residencial'] },
  { match: /geracao|usina|placa|painel|paineis|solar|arrendad/, icons: ['usina-solar', 'painel-solar', 'gestao-geracao-solar', 'energia-solar'] },
  { match: /contrat|proposta|ccee|camara|negociac|explicado|ambientes/, icons: ['contrato-aprovado', 'fatura-energia'] },
  { match: /investiment|investir|taxa|fidelidade|renda|pagamento|lucrativ|margem|custo|despesa|orcamento|conta de luz|econom|preco|reduz/, icons: ['economia-na-conta', 'economia-dinheiro', 'economia-na-mao', 'fatura-energia', 'meta-economia'] },
  { match: /gest|acompanh|visibilidade|tempo real|dados|consumo|monitor|inteligencia/, icons: ['monitoramento-consumo', 'gestao-energia-renovavel', 'eficiencia-energetica'] },
  { match: /rede|distribu|descentraliz|acesso/, icons: ['geracao-distribuida', 'energia-global'] },
  { match: /previsib|seguranc|autonomia|risco|garantid|ininterrupt|critic|toda a operacao/, icons: ['bateria-energia', 'bateria-carga', 'solar-armazenamento'] },
  { match: /flexib|eficienc|perdas|processo|escala|porte|espacos|areas/, icons: ['eficiencia-energetica', 'gestao-energia-renovavel', 'eficiencia-energetica-solar'] },
  { match: /unidades|loja/, icons: ['carregamento-dispositivos', 'energia-global'] },
  { match: /competitiv|mercado|destaque|referencia|independente|portfolio|solucoes|comercializadora/, icons: ['mercado-crescimento', 'meta-economia', 'energia-global'] },
  { match: /equipe|atendimento|proximo|necessidade|experiencia|especializ|goiania|regional|foco/, icons: ['energia-global', 'meta-economia', 'gestao-sustentavel'] }
]

const FALLBACK: Array<BCIconName> = [
  'energia-global', 'eficiencia-energetica', 'meta-economia', 'gestao-sustentavel', 'energia-limpa',
  'mercado-crescimento', 'usina-solar', 'contrato-aprovado', 'monitoramento-consumo', 'economia-na-mao'
]

const normalize = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export const assignIcons = (texts: Array<{ title: string; description?: string }>): Array<BCIconName> => {
  const used = new Set<BCIconName>()
  return texts.map(({ title, description }) => {
    const head = normalize(title)
    const body = normalize(`${title} ${description ?? ''}`)
    const candidates = [
      ...RULES.filter((rule) => rule.match.test(head)).flatMap((rule) => rule.icons),
      ...RULES.filter((rule) => rule.match.test(body)).flatMap((rule) => rule.icons),
      ...FALLBACK
    ]
    const icon = candidates.find((name) => !used.has(name)) ?? FALLBACK[0]
    used.add(icon)
    return icon
  })
}
