/**
 * Metadados de SEO por rota (substitui os `export const metadata` / `generateMetadata`
 * do App Router do Next). Consumido pelo <Seo> no RootLayout via pathname.
 */
export type PageMeta = { title: string; description?: string }

export const DEFAULT_META: PageMeta = {
  title: 'Comercializadora de Energia Solar | Grupo BC Energia',
  description:
    'Grupo BC Energia: sua comercializadora de energia solar. Economize com o Mercado Livre de Energia e soluções de gestão. Fale com um especialista!'
}

export const ROUTE_META: Record<string, PageMeta> = {
  '/': DEFAULT_META,
  '/produtos': {
    title: 'Energia Solar por Assinatura | Grupo BC Energia',
    description:
      'Conheça nossas soluções: energia solar por assinatura, Mercado Livre, gestão de energia e I-REC. Reduza sua conta de luz com o Grupo BC Energia.'
  },
  '/produtos/mercado-livre-de-energia': {
    title: 'Mercado Livre de Energia | Grupo BC Energia',
    description:
      'Entenda o que é o Mercado Livre de Energia e como sua empresa pode economizar até 40% na conta de luz. Migre com o suporte do Grupo BC Energia.'
  },
  '/produtos/consorcio-bc-energia': {
    title: 'Consórcio Energia Solar | Grupo BC Energia',
    description:
      'Economize sem investir! Com o consórcio energia solar do Grupo BC, você aluga créditos de energia e reduz sua conta. Ideal para residências e empresas.'
  },
  '/produtos/gestao-de-energia': {
    title: 'Consultoria em Gestão de Energia | Grupo BC Energia',
    description:
      'Otimize seu consumo e gere mais economia de energia com a consultoria em gestão de energia especializada do Grupo BC. Análise de faturas, medição e consultoria completa.'
  },
  '/produtos/irec': {
    title: 'Certificado I-REC | Grupo BC Energia',
    description:
      'Adquira o I-REC e comprove que sua empresa consome energia de fontes renováveis. Fortaleça sua marca e compromisso com a sustentabilidade.'
  },
  '/produtos/arrendamento-de-usinas': {
    title: 'Arrendamento de Usina Solar | Grupo BC Energia',
    description:
      'Tem uma usina solar ou um terreno? Oferecemos as melhores condições para o arrendamento de usina solar. Gere renda passiva com a energia solar.'
  },
  '/energia-solar-anapolis': {
    title: 'Energia Solar em Anápolis | Grupo BC Energia',
    description:
      'Quer economizar na conta de luz? Conheça a energia solar por assinatura em Anápolis. Uma forma simples e barata de usar energia limpa.'
  },
  '/energia-solar-aparecida-de-goiania': {
    title: 'Energia Solar em Aparecida de Goiânia | Grupo BC Energia',
    description:
      'Quer economizar na conta de luz? Conheça a energia solar por assinatura em Aparecida de Goiânia. Uma forma simples e barata de usar energia limpa.'
  },
  '/energia-solar-em-rio-verde': {
    title: 'Energia Solar em Rio Verde | Grupo BC Energia',
    description:
      'Quer economizar na conta de luz? Conheça a energia solar por assinatura em Rio Verde. Uma forma simples e barata de usar energia limpa.'
  },
  '/energia-solar-goiania': {
    title: 'Energia Solar em Goiânia | Grupo BC Energia',
    description:
      'Quer economizar na conta de luz? Conheça a energia solar por assinatura em Goiânia. Uma forma simples e barata de usar energia limpa.'
  },
  '/energia-solar-no-tocantins': {
    title: 'Energia Solar no Tocantins | Grupo BC Energia',
    description:
      'Quer economizar na conta de luz? Conheça a energia solar por assinatura no Tocantins. Uma forma simples e barata de usar energia limpa.'
  },
  '/energia-solar-palmas': {
    title: 'Energia Solar em Palmas | Grupo BC Energia',
    description:
      'Quer economizar na conta de luz? Conheça a energia solar por assinatura em Palmas. Uma forma simples e barata de usar energia limpa.'
  },
  '/energia-solar-trindade': {
    title: 'Energia Solar em Trindade | Grupo BC Energia',
    description:
      'Quer economizar na conta de luz? Conheça a energia solar por assinatura em Trindade. Uma forma simples e barata de usar energia limpa.'
  }
}

export const getRouteMeta = (pathname: string): PageMeta => ROUTE_META[pathname] ?? DEFAULT_META
