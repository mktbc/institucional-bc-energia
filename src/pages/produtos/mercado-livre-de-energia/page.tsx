import {
  Accordion,
  About,
  BcFormSection,
  Cta,
  Features,
  FormularioMercadoLivre,
  Heading,
  HowItWorks,
  Numbers,
  PageHeader,
  Section
} from '@/components'
import { FeaturesProps } from '@/components/Features/Features.type'

import { content, features, howItWorks, cta, faq } from './data'
import { Products } from './Sections'


const FreeEnergyMarket = () => (
  <div>
    <PageHeader
      icon="icon-mercado-energia.svg"
      title="Mercado livre de energia"
      description="O Mercado Livre de Energia dá ao consumidor poder de escolha sobre o fornecedor de energia elétrica, gerando um ambiente competitivo e, consequentemente, com preços mais baixos."
      bgImage="/img/global/mercado-livre-de-energia.jpg"
      category="Produtos"
    />

    <About
      imgLink="#contato"
      content={content}
      img="/img/pages/mercado-livre-de-energia-intro.png"
    />

    <Cta
      className="container mx-auto mb-12 overflow-hidden sm:rounded-lg"
      {...cta}
      overlay
      overlayColor="dark"
    />

    <Section className="p-6 pt-0">
      <div className="mt-10 grid content-center items-center justify-center gap-10 lg:grid-cols-3">
        {features.map((feature: FeaturesProps) => (
          <Features key={feature.id} {...feature} />
        ))}
      </div>
    </Section>

    <Numbers
      btnText="Quero Economizar"
      btnLink="#contato"
      context="mercado_livre"
      bgImage="/img/components/numbers/fundo-numeros.jpg"
    >
      ECONOMIA COM EFICIÊNCIA E RESPONSABILIDADE AMBIENTAL
    </Numbers>

    <Products />

    <HowItWorks {...howItWorks} />

    <Section>
      <Heading subtitle="Perguntas Frequentes">FAQ</Heading>

      <div className="mx-auto w-full max-w-3xl">
        {faq.map((item, i) => (
          <Accordion open={i === 0} key={i} title={item.title} content={item.content} />
        ))}
      </div>
    </Section>

    <BcFormSection title="Entre em contato">
      <FormularioMercadoLivre solucao="mercado_livre" />
    </BcFormSection>
  </div>
)

export default FreeEnergyMarket
