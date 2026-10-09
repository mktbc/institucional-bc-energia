/**
 * Dados institucionais do Grupo BC Energia — fonte única para rodapé e
 * dados estruturados (Organization). Tudo aqui já é publicado no site:
 *  - razão social e CNPJ: página /sobre/lgpd;
 *  - endereços: rodapé e /contato;
 *  - WhatsApp oficial: link "WhatsApp oficial" do cabeçalho/rodapé.
 * Não incluir telefone fixo, e-mail ou horários: não há fonte publicada.
 *
 * ⚠️ O CEP de Goiânia diverge entre o rodapé/contato (74810-240) e a página
 * LGPD (74.810-100). Mantido o do rodapé/contato até confirmação da empresa.
 */
export type Office = {
  /** Rótulo exibido no rodapé. */
  label: string
  /** Endereço como exibido no rodapé (texto publicado, sem alteração). */
  display: string
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
}

export const COMPANY = {
  name: 'Grupo BC Energia',
  legalName: 'BC Geração e Comercialização de Energia Ltda.',
  taxId: '28.409.693/0001-90',
  /** Número do link wa.me "WhatsApp oficial" (E.164). */
  whatsapp: '+55-62-3999-2050'
} as const

export const OFFICES: Office[] = [
  {
    label: 'Goiânia (GO)',
    display:
      'Av. Dep. Jamel Cecílio, c/ rua 56, nº 2929, Salas 2802/2803, Ed. Brookfield Towers Torre B, Jardim Goiás, Goiânia (GO), 74810-240',
    streetAddress: 'Av. Dep. Jamel Cecílio, nº 2929, Salas 2802/2803, Ed. Brookfield Towers Torre B, Jardim Goiás',
    addressLocality: 'Goiânia',
    addressRegion: 'GO',
    postalCode: '74810-240'
  },
  {
    label: 'São Paulo (SP)',
    display:
      'Av. Pres. Juscelino Kubitschek, 360, 7º andar cj 71, Edifício JK 360, Vila Nova Conceição, São Paulo (SP), 04543-000',
    streetAddress: 'Av. Pres. Juscelino Kubitschek, 360, 7º andar cj 71, Edifício JK 360, Vila Nova Conceição',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '04543-000'
  }
]
