import { Cta, PageHeader, Section } from '@/components'
import Image from '@/components/Image'
import Link from '@/components/Link'

const Auction = () => (
  <div>
    <PageHeader title="Leilão" bgImage="/img/pages/contact.jpeg" category="Sobre" />
    <Section className="px-6 pt-10">
      <div className="flex flex-col gap-6 text-center">
        <Image
          className="mx-auto"
          src={`/img/icons/info.svg`}
          alt="Grupo BC Energia"
          width={50}
          height={50}
        />
        <p className="text-xl font-bold">Não temos leilões disponíveis no momento.</p>
      </div>
    </Section>

    <Cta
      title="O Grupo Bc Energia chegou para revolucionar o comércio de energia no Brasil"
      className="bg-gray-200"
      light
    >
      <>
        <p>
          Ao eleger a BC Energia como sua comercializadora de energia elétrica, você escolhe um
          parceiro comprometido com a excelência, a inovação e a sustentabilidade. Estamos aqui para
          criar um futuro onde a energia é não apenas mais acessível e eficiente, mas também um
          pilar para um mundo mais sustentável. Não deixe de conferir nossos serviços inovadores e
          revolucionários, como{' '}
          <Link className="font-semibold text-teal-600" href="/produtos/consorcio-bc-energia">
            Geração distribuída de energia
          </Link>
          ,{' '}
          <Link className="font-semibold text-teal-600" href="/produtos/mercado-livre-de-energia">
            Mercado Livre de Energia
          </Link>{' '}
          e{' '}
          <Link className="font-semibold text-teal-600" href="/produtos/gestao-de-energia">
            Consultoria e gestão de energia
          </Link>
          .
        </p>
      </>
    </Cta>
  </div>
)

export default Auction
