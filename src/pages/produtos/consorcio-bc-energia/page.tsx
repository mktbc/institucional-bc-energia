import {
  About,
  PageHeader,
  HowItWorks,
  Numbers,
  FormEmbed,
  Section,
  Features,
  Heading,
  Accordion
} from '@/components'
import { FeaturesProps } from '@/components/Features/Features.type'
import Image from '@/components/Image'

import { content, features, faq, howItWorks } from './data'

const howItWorksB = [
  {
    title: 'Geração de Energia',
    description:
      'O Grupo BC Energia gera energia limpa e renovável por meio de centenas de usinas fotovoltaicas espalhadas pelo país.'
  },
  {
    title: 'Injeção na Rede de Distribuição',
    description:
      'Toda a energia gerada é injetada diretamente na rede de distribuição local, contribuindo para o fornecimento de eletricidade de sua região.'
  },
  {
    title: 'Créditos de Energia',
    description:
      'Uma distribuidora de energia converte a quantidade de energia injetada em créditos, que são repassados ao Grupo BC Energia.'
  },
  {
    title: 'Economia na Conta de Luz',
    description:
      'Esses créditos são compartilhados com os consumidores alocados no consórcio, resultando em um desconto de até 26% na sua conta de energia, sem necessidade de investimento ou instalação de placas solares.'
  }
]


const SubscriptionEnergy = () => (
  <div>
    <PageHeader
      icon="icon-energia-assinatura.svg"
      title="Consórcio BC Energia"
      description="Se você não se enquadra nos requisitos necessários para migração para o Mercado Livre de Energia, a geração distribuída de energia surge como alternativa para reduzir os gastos com luz. Nessa modalidade, os consumidores têm a possibilidade de gerar a própria energia elétrica, gerenciar sua distribuição e aproveitar créditos com validade de até 60 meses para abater o valor da conta de consumo."
      bgImage="/img/global/energia-por-assinatura.jpg"
      category="Produtos"
    />

    <About
      target="_blank"
      imgLink="https://www.appenergia.com.br/Grupo_BC_Energia/"
      content={content}
      img="/img/pages/consorcio-intro.png"
    >
      <Section className="p-6 pb-0 pl-0 pt-0">
        <h3 className="text-xl uppercase leading-tight text-teal-800 lg:text-2xl">
          Benefícios do Consórcio BC Energia:
        </h3>
        <div className="mt-6 content-center items-center justify-center gap-6">
          {features.map((feature: FeaturesProps) => (
            <Features key={feature.id} {...feature} />
          ))}
        </div>
      </Section>
    </About>

    <p className="-mt-10 mb-20 px-6 text-center text-2xl">
      Garanta sua economia de forma simples e sustentável com o Consórcio BC Energia!
    </p>

    <Section className="bg-gray-100 px-6">
      <div className="flex flex-col-reverse gap-16 lg:flex-row">
        <div className="basis-1/4">
          <Image
            className="rounded-2xl"
            src={`/img/pages/arrendamento-de-usinas-intro.jpg`}
            alt="Grupo BC Energia"
            width={1024}
            height={2014}
          />
        </div>
        <div className="basis-3/4">
          <h2 className="mb-6 text-2xl uppercase text-teal-900">
            Como funciona o Consórcio BC Energia?
          </h2>
          <div className="flex flex-col gap-6">
            {howItWorksB.map((item, i) => (
              <div key={i} className="flex gap-6">
                <h6 className="mt-1 h-9 w-9 flex-none items-center justify-center rounded-full border border-teal-600 p-[0.2rem] text-center text-lg font-bold text-teal-600">
                  {i + 1}
                </h6>
                <div>
                  <h4 className="text-xl text-teal-600">{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>

    <Numbers
      btnText="Quero Economizar"
      btnLink="http://www.appenergia.com.br/Grupo_BC_Energia/"
      target="_blank"
      context="consorcio"
      bgImage="/img/components/numbers/fundo-numeros.jpg"
    >
      ECONOMIA E SUSTENTABILIDADE
    </Numbers>

    <HowItWorks {...howItWorks} />

    <Section>
      <Heading subtitle="Perguntas Frequentes">FAQ</Heading>

      <div className="mx-auto w-full max-w-3xl">
        {faq.map((item, i) => (
          <Accordion open={i === 0} key={i} title={item.title} content={item.content} />
        ))}
      </div>
    </Section>

    <FormEmbed title="Entre em contato" />
  </div>
)

export default SubscriptionEnergy
