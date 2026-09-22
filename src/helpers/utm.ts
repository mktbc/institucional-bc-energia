export type UtmChannel = 'Formulario Site' | 'Widget Site'

/**
 * UTMs padrão de trackeamento: aplicadas quando o visitante entra no site
 * sem nenhum parâmetro utm_* na URL (tráfego orgânico/direto).
 */
export const DEFAULT_UTMS: Record<string, string> = {
  utm_lp: 'grupobcenergia-com-br',
  utm_campaign_code: 'BCCAMPMKT033',
  utm_link_id: 'BCLINK000110',
  utm_source: 'SEO',
  utm_medium: 'organic',
  utm_font: 'marketing',
  utm_channel: 'Site',
  utm_product: 'GD',
  utm_segment: 'B2B B2C',
  utm_contract: 'sem fidelidade'
}

/**
 * Se a URL atual não tiver nenhum parâmetro utm_*, injeta os UTMs padrão
 * na URL (sem recarregar a página), para que links e formulários os usem.
 */
export const ensureDefaultUtms = (): void => {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  const hasUtm = Array.from(url.searchParams.keys()).some((key) => key.startsWith('utm_'))
  if (hasUtm) return

  Object.entries(DEFAULT_UTMS).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  window.history.replaceState(null, '', url.toString())
}

/**
 * Lê os parâmetros utm_* da URL atual. Se não houver nenhum, retorna os padrões.
 */
export const getUtmParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return { ...DEFAULT_UTMS }
  const params = new URLSearchParams(window.location.search)
  const utms: Record<string, string> = {}
  params.forEach((value, key) => {
    if (key.startsWith('utm_')) utms[key] = value
  })
  return Object.keys(utms).length > 0 ? utms : { ...DEFAULT_UTMS }
}

/**
 * Constrói a URL do simulador BC Energia com os UTMs da página atual
 * (ou os padrões), sobrescrevendo o canal conforme o ponto de contato.
 * @param channel - Ponto de contato: 'Formulario Site' (embeds) ou 'Widget Site' (pop-up)
 */
export const buildSimulatorUrl = (channel: UtmChannel): string => {
  const url = new URL('https://simulador.bcenergiacomdesconto.com.br/')
  const params: Record<string, string> = { ...getUtmParams(), utm_channel: channel }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  return url.toString()
}
