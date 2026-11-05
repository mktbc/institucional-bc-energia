export type UtmChannel = 'Formulario Site' | 'Widget Site'

/**
 * UTMs padrão de trackeamento: aplicadas quando o visitante entra no site
 * sem nenhum parâmetro utm_* na URL (tráfego orgânico/direto).
 *
 * Portado do projeto publicado no Lovable (edições de 22/09/2026: "Adicionou
 * UTMs auto em URL", "Removeu utm_link_id padrão", "Persistiu UTMs em toda
 * navegação"), sem alterar valores nem regras.
 */
export const DEFAULT_UTMS: Record<string, string> = {
  utm_lp: 'grupobcenergia-com-br',
  utm_campaign_code: 'BCCAMPMKT033',
  utm_source: 'SEO',
  utm_medium: 'organic',
  utm_font: 'marketing',
  utm_channel: 'Site',
  utm_product: 'GD',
  utm_segment: 'B2B B2C',
  utm_contract: 'sem fidelidade'
}

const STORAGE_KEY = 'bc_utms'

const readStoredUtms = (): Record<string, string> => {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, string>) : {}
  } catch {
    return {}
  }
}

const storeUtms = (utms: Record<string, string>): void => {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utms))
  } catch {
    /* sessionStorage indisponível */
  }
}

const readUrlUtms = (): Record<string, string> => {
  const utms: Record<string, string> = {}
  if (typeof window === 'undefined') return utms
  new URLSearchParams(window.location.search).forEach((value, key) => {
    if (key.startsWith('utm_')) utms[key] = value
  })
  return utms
}

/**
 * Garante que a URL atual sempre tenha UTMs:
 * - se vierem na URL, elas vencem e ficam guardadas na sessão;
 * - se não vierem, reaplica as da sessão (navegação interna) ou as padrão.
 * Roda em toda troca de página, sem recarregar.
 */
export const ensureDefaultUtms = (): void => {
  if (typeof window === 'undefined') return

  const fromUrl = readUrlUtms()
  const active =
    Object.keys(fromUrl).length > 0
      ? fromUrl
      : Object.keys(readStoredUtms()).length > 0
        ? readStoredUtms()
        : { ...DEFAULT_UTMS }

  storeUtms(active)

  const url = new URL(window.location.href)
  let changed = false
  Object.entries(active).forEach(([key, value]) => {
    if (url.searchParams.get(key) !== value) {
      url.searchParams.set(key, value)
      changed = true
    }
  })

  if (changed) window.history.replaceState(window.history.state, '', url.toString())
}

/**
 * Lê os parâmetros utm_* da URL atual, caindo para os da sessão ou os padrões.
 */
export const getUtmParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return { ...DEFAULT_UTMS }
  const fromUrl = readUrlUtms()
  if (Object.keys(fromUrl).length > 0) return fromUrl
  const stored = readStoredUtms()
  return Object.keys(stored).length > 0 ? stored : { ...DEFAULT_UTMS }
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
