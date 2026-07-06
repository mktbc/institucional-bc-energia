import { Section, Heading, PageHeader, ButtonLink } from '@/components'
import Image from '@/components/Image'

const Page = () => (
  <div>
    <PageHeader
      title="Sobre"
      bgImage="/img/global/arrendamento-de-usinas.jpg"
      category="Segmentos"
    />
    <Section className="px-6 pt-0 lg:pt-10">
      <Heading>
        <Image
          className="mx-auto mb-8"
          src="/img/global/grupo-bc-logo-solo-color.svg"
          alt="Grupo BC Energia"
          width={64}
          height={46}
        />
        O Grupo BC Energia entrega soluções para redução na conta de energia a todos os perfis de
        clientes, no Mercado Livre de Energia e na Geração Distribuída.
      </Heading>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <ButtonLink href="/sobre/quem-somos" variant="gray" block size="xl" rounded>
          Quem Somos
        </ButtonLink>
        <ButtonLink href="/sobre/nossas-usinas" variant="gray" block size="xl" rounded>
          Nossas Usinas
        </ButtonLink>
        <ButtonLink href="/sobre/lgpd" variant="gray" block size="xl" rounded>
          LGPD
        </ButtonLink>
        <ButtonLink href="/sobre/leilao" variant="gray" block size="xl" rounded>
          Leilão
        </ButtonLink>
        <ButtonLink href="/sobre/fator-de-alavancagem" variant="gray" block size="xl" rounded>
          Fator de Alavancagem
        </ButtonLink>
        <ButtonLink href="/sobre/esg" variant="gray" block size="xl" rounded>
          ESG
        </ButtonLink>
        <ButtonLink href="/sobre/social" variant="gray" block size="xl" rounded>
          Social
        </ButtonLink>
      </div>
    </Section>
  </div>
)

export default Page
