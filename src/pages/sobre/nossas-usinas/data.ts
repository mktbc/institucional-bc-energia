import Local from '@/pages/sobre/nossas-usinas/Local'
import { ProductCardProps } from '@/components/ProductCard/ProductCard.type'

export const powerPlants: Array<ProductCardProps> = [
  {
    id: '1',
    img: '/img/pages/usinas/Aracu.webp',
    title: 'Complexo Araçu (GO)',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 8\n' +
        'Potência Total: 3.326,59 KWp\n' +
        'Tipo de Estrutura: Fixa e Tracker\n' +
        'Geração Anual Média: 5.877,96 MWh',
      local: 'Inhumas (GO)'
    })
  },
  {
    id: '2',
    img: '/img/pages/usinas/Barra-do-Garcas.webp',
    title: 'Complexo Barra do Garças (MT)',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 3\n' +
        'Potência Total: 881,28 KWp\n' +
        'Tipo de Estrutura: Fixa\n' +
        'Geração Anual Média: 1.378,40 MWh',
      local: 'Barra do Garças (MT)'
    })
  },
  {
    id: '3',
    img: '/img/pages/usinas/Bom-Sucesso.webp',
    title: 'Complexo Bom Sucesso',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 1\n' +
        'Potência Total: 785,81 KWp\n' +
        'Tipo de Estrutura: Fixa\n' +
        'Geração Anual Média: 1.261,80 MWh',
      local: 'Palmeiras de Goiás (GO)'
    })
  },
  {
    id: '4',
    img: '/img/pages/usinas/Caiaponia.webp',
    title: 'Complexo Caiapônia',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 8\n' +
        'Potência Total: 6.424,01 KWp\n' +
        'Tipo de Estrutura: Fixa e Tracker\n' +
        'Geração Anual Média: 11.145,98 MWh',
      local: 'Caiapônia (GO)'
    })
  },
  {
    id: '5',
    img: '/img/pages/usinas/palmeiras-de-goias-500x300.jpg',
    title: 'Complexo Palmeiras de Goiás (GO)',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 5\n' +
        'Potência Total: 7.128,00 KWp\n' +
        'Tipo de Estrutura: Tracker\n' +
        'Geração Anual Média: 14.378,00 MWh',
      local: 'Palmeiras de Goiás (GO)'
    })
  },
  {
    id: '6',
    img: '/img/pages/usinas/CGH-Rio-Bonito.webp',
    title: 'CGH Rio Bonito (GO)',
    description: Local({
      data:
        'Usinas Hidrelétricas: 2\n' +
        'Potência Total: 1.900,00 KWp\n' +
        'Tipo de Estrutura: Hidráulica\n' +
        'Geração Anual Média: 5.757,63 MWh',
      local: 'Caiapônia (GO)'
    })
  },
  {
    id: '7',
    img: '/img/pages/usinas/ClareiradeAracu.jpg',
    title: 'Complexo Clareira de Araçu (GO)',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 2\n' +
        'Potência Total: 1.902,78 KWp\n' +
        'Tipo de Estrutura: Tracker\n' +
        'Geração Anual Média: 3.487,70 MWh',
      local: 'Inhumas (GO)'
    })
  },
  {
    id: '8',
    img: '/img/pages/usinas/Corumba.jpg',
    title: 'Complexo Corumbá (GO)',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 6\n' +
        'Potência Total: 6.874,56 KWp\n' +
        'Tipo de Estrutura: Tracker\n' +
        'Geração Anual Média: 12.697,50 MWh',
      local: 'Corumbá de Goiás (GO)'
    })
  },
  {
    id: '9',
    img: '/img/pages/usinas/panama-1-500x300.jpg',
    title: 'Complexo Panamá (GO)',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 7\n' +
        'Potência Total: 491,94 KWp\n' +
        'Tipo de Estrutura: Fixa\n' +
        'Geração Anual Média: 826,37 MWh',
      local: 'Panamá (GO)'
    })
  },
  {
    id: '10',
    img: '/img/pages/usinas/paranoa-500x300.jpg',
    title: 'Complexo Paranoá (DF)',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 8\n' +
        'Potência Total: 3.124,89 KWp\n' +
        'Tipo de Estrutura: Fixa\n' +
        'Geração Anual Média: 5.036,31 MWh',
      local: 'Paranoá (DF)'
    })
  },
  {
    id: '11',
    img: '/img/pages/usinas/ufv-rio-bonito-1-500x300.jpg',
    title: 'Complexo Rio Bonito (GO)',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 2\n' +
        'Potência Total: 1.690,80 KWp\n' +
        'Tipo de Estrutura: Fixa\n' +
        'Geração Anual Média: 2.633,32 MWh',
      local: 'Caiapônia (GO)'
    })
  },
  {
    id: '12',
    img: '/img/pages/usinas/ufv-rio-monte-1-500x300.jpg',
    title: 'Complexo Rio Monte (GO)',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 3\n' +
        'Potência Total: 1.337,78 KWp\n' +
        'Tipo de Estrutura: Fixa\n' +
        'Geração Anual Média: 2.163,66 MWh',
      local: 'Caiapônia (GO)'
    })
  },
  {
    id: '13',
    img: '/img/pages/usinas/Varjao-de-Minas.webp',
    title: 'Complexo Varjão de Minas (MG)',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 6\n' +
        'Potência Total: 6.769,62 KWp\n' +
        'Tipo de Estrutura: Tracker\n' +
        'Geração Anual Média: 13.495,90 MWh',
      local: 'Varjão de Minas (MG)'
    })
  },
  {
    id: '14',
    img: '/img/pages/usinas/Vazante.webp',
    title: 'Complexo Vazante (MG)',
    description: Local({
      data:
        'Usinas Fotovoltaicas: 6\n' +
        'Potência Total: 6.542,73 KWp\n' +
        'Tipo de Estrutura: Tracker\n' +
        'Geração Anual Média: 13.084,90 MWh',
      local: 'Vazante (MG)'
    })
  }
]
