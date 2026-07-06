import {
  PageHeader,
  Cta,
  Features,
  Section,
  Resources,
  Customers,
  Heading,
  Numbers
} from '@/components'
import Image from '@/components/Image'
import Link from '@/components/Link'

import { content, features, resources } from './data'

const WhoWeAre = () => (
  <div>
    <PageHeader
      title="O Grupo BC Energia"
      description="Excelência em Comercialização de Energia Elétrica no Brasil."
      bgImage="/img/global/arrendamento-de-usinas.jpg"
      category="Sobre"
    />

    <Section className="px-6 pt-0">
      <div>
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="lg:basis-2/5">
            <Heading center={true} full>
              {content[0]?.title}
            </Heading>
            <p className="whitespace-pre-line text-justify text-lg">{content[0]?.description}</p>
          </div>
          <div className="lg:basis-3/5">
            <Link href="#contato">
              <Image
                className="ml-auto w-full rounded-lg"
                src="/img/pages/FOTO_SOBRE_NOS_01.webp"
                alt="Grupo BC Energia"
                width={1100}
                height={1500}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {features?.length ? (
          <div className="mt-10 grid items-center justify-between gap-8 align-middle lg:grid-cols-3">
            {features.map((feature) => (
              <Features key={feature.id} {...feature} />
            ))}
          </div>
        ) : null}
      </div>
    </Section>

    <Section className="px-6 pt-0">
      <iframe
        className="rounded-lg"
        width="100%"
        height="750"
        src="https://www.youtube.com/embed/gebh7iMoS9w?si=IS7HiOP5EFCbSzgh"
        title="Vídeo Institucional"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </Section>
    <Numbers
      btnText="Quero Economizar"
      btnLink="/contato"
      context="home"
      subTitle=""
      bgImage="/img/components/numbers/fundo-numeros.jpg"
    >
      <span className="text-xl font-normal normal-case">
        Escolher o Grupo BC Energia, uma distinta comercializadora de energia elétrica, significa
        optar por uma parceria baseada em valores fundamentais como respeito, comprometimento,
        transparência e aprendizagem. Somos mais do que uma empresa de energia elétrica; somos um
        grupo movido pela inovação responsável, pela segurança e pelo trabalho coletivo. A nossa
        energia gera valor porque acreditamos no poder do conhecimento compartilhado e na força da
        unidade.
      </span>
    </Numbers>

    <Resources {...resources} />

    <Cta
      title="O Grupo Bc Energia chegou para revolucionar o comércio de energia no Brasil"
      className="bg-teal-900"
    >
      <>
        <p>
          Ao eleger a BC Energia como sua comercializadora de energia elétrica, você escolhe um
          parceiro comprometido com a excelência, a inovação e a sustentabilidade. Estamos aqui para
          criar um futuro onde a energia é não apenas mais acessível e eficiente, mas também um
          pilar para um mundo mais sustentável. Não deixe de conferir nossos serviços inovadores e
          revolucionários, como{' '}
          <Link className="font-semibold text-amber-400" href="/produtos/consorcio-bc-energia">
            Geração distribuída de energia
          </Link>
          ,{' '}
          <Link className="font-semibold text-amber-400" href="/produtos/mercado-livre-de-energia">
            Mercado Livre de Energia
          </Link>{' '}
          e{' '}
          <Link className="font-semibold text-amber-400" href="/produtos/gestao-de-energia">
            Consultoria e gestão de energia
          </Link>
          .
        </p>
      </>
    </Cta>

    <Customers />
  </div>
)

export default WhoWeAre
