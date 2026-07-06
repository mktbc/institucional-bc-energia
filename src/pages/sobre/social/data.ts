import { FeatureV2Props } from '@/components/FeatureV2/FeatureV2.type'
import { AboutContent } from '@/components/Sections/Sections.type'

export const content: AboutContent = [
  {
    title: 'Sustentabilidade',
    description:
      'O Grupo BC Energia vai além do simples cumprimento de padrões ambientais, abraçamos a sustentabilidade como parte intrínseca de nossa identidade corporativa.\n \n Nossas usinas geram energia limpa e renovável e estamos comprometidos em fornecer\n' +
      'energia sustentável acessível para todos.\n'
  }
]

export const features: Array<FeatureV2Props> = [
  {
    icon: '/img/icons/fonte-renovavel.svg',
    title: '+ de 200 mil MWh',
    description: 'gerados através de fontes renováveis'
  },
  {
    icon: '/img/icons/no-co2.svg',
    title: '+ de 15 mil',
    description: 'toneladas de CO2 evitados na atmosfera'
  }
]
