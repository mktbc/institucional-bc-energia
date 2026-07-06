import { useParams } from 'react-router-dom'

import { Solutions } from '@/pages/home/Sections'
import NotFound from '@/pages/not-found'
import { AboutSegment, Customers, FormEmbed, Numbers, PageHeader } from '@/components'
import Seo from '@/components/Seo'
import { getSegmentData } from '@/data/segments'

import { Benefits } from '../../../components/Sections/'
import { Cta } from './Sections'

// SEO por segmento (equivalente ao antigo generateMetadata do App Router).
const getSegmentSeo = (segmento: string) => {
  if (segmento === 'energia-solar-para-empresas') {
    return {
      title: 'Energia Solar para Empresas | Grupo BC Energia',
      description:
        'Quer economizar na conta de luz da sua empresa? Conheça a energia solar por assinatura empresarial . Uma forma simples e barata de usar energia limpa.'
    }
  }

  if (segmento === 'residencial') {
    return {
      title: 'Energia Solar por Assinatura Residencial | Grupo BC Energia',
      description:
        'Quer economizar na conta de luz de casa? Conheça a energia solar por assinatura residencial . Uma forma simples e barata de usar energia limpa.'
    }
  }

  return {
    title: 'Segmentos | Grupo BC Energia',
    description:
      'Conheça as soluções do Grupo BC Energia para diferentes segmentos consumidores e reduza sua conta de luz com energia renovável.'
  }
}

const Page = () => {
  const { segmento = '' } = useParams<{ segmento: string }>()

  // Dados locais empacotados na migração (antes: getSegment → API externa).
  // TODO: TI reconectar API de segmentos (opcional — ver src/services/segments).
  const data = getSegmentData(segmento)
  if (!data || !data.title) return <NotFound />

  const seo = getSegmentSeo(segmento)

  return (
    <div>
      <Seo title={seo.title} description={seo.description} />

      <PageHeader
        title={data.title}
        description={data.description}
        bgImage={data.coverUrl}
        category="Segmentos"
        icon={data.icon}
      />

      <AboutSegment {...data.introduction} />

      <Cta {...data.cta} />

      <Benefits {...data.introduction} />

      {['agronegocio'].includes(segmento) && (
        <>
          <Numbers
            btnText="Quero Economizar"
            btnLink="#contato"
            context="home"
            subTitle=""
            bgImage="/img/components/numbers/fundo-numeros.jpg"
          >
            Somos a maior <span className="text-amber-400">comercializadora de energia</span> do
            Centro-Oeste e uma das principais independentes do país.
          </Numbers>

          <Solutions className="pb-0 pt-20" segmentsPage titleSection={false} />
        </>
      )}

      <Customers />

      <FormEmbed title="Entre em contato" />
    </div>
  )
}

export default Page
