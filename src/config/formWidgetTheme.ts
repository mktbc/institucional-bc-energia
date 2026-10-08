/**
 * Tema enviado por postMessage ao simulador externo
 * (simulador.bcenergiacomdesconto.com.br).
 *
 * O widget roda em outro domínio e não enxerga os tokens CSS do site, por isso
 * as cores vão como hexadecimais literais — mas são os hexadecimais oficiais do
 * Manual de Marca. Antes existiam duas cópias divergentes deste objeto, com
 * tons aproximados (#1f7a6b e #27bdb1), o que fazia o formulário destoar do
 * restante do site.
 *
 * Só as chaves aceitas pelo widget: alterar nomes quebra a aplicação do tema.
 */
export const FORM_WIDGET_THEME = {
  /** Verde institucional #18857D */
  primary: '#18857D',
  buttonBg: '#18857D',
  buttonText: '#FFFFFF',
  cardBg: '#FFFFFF',
  /** Navy #242F40 — texto sobre superfície clara */
  text: '#242F40',
  inputBg: '#FFFFFF',
  inputBorder: '#18857D',
  primaryText: '#FFFFFF',
  /** Turquesa #24D2C8 — acento */
  accent: '#24D2C8'
} as const
