/**
 * Imagens sociais (og:image / twitter:image) em 1200×630, recortadas das
 * fotos já usadas no topo de cada página (public/img/og/). Rotas fora do
 * mapa usam OG_DEFAULT (foto do 1º slide do banner da Home).
 */
export const OG_IMAGES: Record<string, string> = {
  '/energia-solar-anapolis': '/img/og/energia-solar-anapolis.jpg',
  '/energia-solar-aparecida-de-goiania': '/img/og/energia-solar-aparecida-de-goiania.jpg',
  '/energia-solar-em-rio-verde': '/img/og/energia-solar-em-rio-verde.jpg',
  '/energia-solar-goiania': '/img/og/energia-solar-goiania.jpg',
  '/energia-solar-no-tocantins': '/img/og/energia-solar-no-tocantins.jpg',
  '/energia-solar-palmas': '/img/og/energia-solar-palmas.jpg',
  '/produtos/arrendamento-de-usinas': '/img/og/produtos-arrendamento-de-usinas.jpg',
  '/produtos/certificacao-renovavel-irec': '/img/og/produtos-certificacao-renovavel-irec.jpg',
  '/produtos/consorcio-bc-energia': '/img/og/produtos-consorcio-bc-energia.jpg',
  '/produtos/gestao-de-energia': '/img/og/produtos-gestao-de-energia.jpg',
  '/produtos/mercado-livre-de-energia': '/img/og/produtos-mercado-livre-de-energia.jpg',
  '/segmentos': '/img/og/segmentos.jpg',
  '/segmentos/agronegocio': '/img/og/segmentos-agronegocio.jpg',
  '/segmentos/bares-e-restaurantes': '/img/og/segmentos-bares-e-restaurantes.jpg',
  '/segmentos/condominio': '/img/og/segmentos-condominio.jpg',
  '/segmentos/educacional': '/img/og/segmentos-educacional.jpg',
  '/segmentos/lazer': '/img/og/segmentos-lazer.jpg',
  '/segmentos/religioso': '/img/og/segmentos-religioso.jpg',
  '/segmentos/residencial': '/img/og/segmentos-residencial.jpg',
  '/segmentos/saude': '/img/og/segmentos-saude.jpg',
  '/segmentos/servico': '/img/og/segmentos-servico.jpg',
  '/segmentos/turismo': '/img/og/segmentos-turismo.jpg',
  '/segmentos/varejo': '/img/og/segmentos-varejo.jpg',
  '/sobre/nossas-usinas': '/img/og/sobre-nossas-usinas.jpg',
  '/sobre/quem-somos': '/img/og/sobre-quem-somos.jpg',
  '/sobre/social': '/img/og/sobre-social.jpg',
  '/sobre/sustentabilidade': '/img/og/sobre-sustentabilidade.jpg'
}

export const OG_DEFAULT = '/img/og/home.jpg'

/** Dimensões comuns a todas as imagens de public/img/og/. */
export const OG_SIZE = { width: 1200, height: 630 } as const
