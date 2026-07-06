import { WrapperProps } from './Sliders.type'

const TileSlider1 = () => (
  <>
    Migre sua empresa para o <span className="text-amber-400">Mercado Livre</span> e economize na
    conta de energia
  </>
)

const TileSlider2 = () => (
  <>
    Faça sua adesão sem custos e economize até{' '}
    <span className="text-amber-400">26% na energia</span>
  </>
)

const TileSlider3 = () => (
  <>
    Mais de <span className="text-amber-400">R$ 400 milhões de economia</span> aos nossos clientes
  </>
)

export const slidersData: Array<WrapperProps> = [
  {
    id: 'slider_home_1',
    bgImage: '/bg-home.jpg',
    title: <TileSlider1 />,
    description:
      'Solução para empresas com contas acima de R$10 mil. Nossa atuação vai além da migração para o Mercado Livre de Energia. Ajudamos empresas na tomada de decisões e na gestão eficiente de energia.',
    textLink: 'Saiba Mais',
    link: '/produtos/mercado-livre-de-energia'
  },
  {
    id: 'slider_home_2',
    bgImage: '/img/pages/banner2.webp',
    title: <TileSlider2 />,
    description:
      'Por meio do consórcio BC Energia, consumidores com contas de energia a partir de R$250,00 economizam na conta de energia sem precisar fazer investimentos em placas solares.',
    textLink: 'ADESÃO GRATUITA',
    link: 'http://www.appenergia.com.br/Grupo_BC_Energia',
    target: '_blank'
  },
  {
    id: 'slider_home_3',
    bgImage: '/img/pages/nossas-usinas2.webp',
    title: <TileSlider3 />,
    description:
      'Soluções sustentáveis e inteligentes que reduzem os custos com energia e aumentam a competitividade de mercado.',
    textLink: 'Saiba Mais',
    link: '/sobre/quem-somos'
  }
]
