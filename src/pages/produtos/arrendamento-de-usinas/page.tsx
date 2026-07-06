import {
  About,
  BcFormSection,
  Cta,
  FormularioParceiro,
  Heading,
  Numbers,
  PageHeader,
  Section
} from '@/components'

import { content, features, cta, benefits } from './data'


const PlantLeasing = () => (
  <div>
    <PageHeader
      icon="icon-arrendamento-de-usinas.svg"
      title="Arrendamento de usinas"
      description=""
      bgImage="/img/global/arrendamento-de-usinas.jpg"
      category="Produtos"
    />

    <About content={content} features={features} img="/img/pages/arendamento-de-usinas-intro.jpg" />

    <Cta
      className="container mx-auto mb-12 overflow-hidden sm:rounded-lg"
      {...cta}
      overlay
      overlayColor="dark"
    />

    <Section className="mx-auto pb-3 pl-6 pr-6 pt-6 text-justify lg:w-3/5">
      <Heading>Arrendamento de Usinas Solares: renda garantida sem complicações</Heading>

      <p>
        Se você é proprietário de uma usina solar pronta ou pretende entrar em operação e buscar uma
        maneira de maximizar seus lucros sem se preocupar com a gestão comercial, o arrendamento de
        usinas ao Grupo BC Energia é a solução ideal. Nós cuidamos de toda a parte comercial, desde
        a prospecção de clientes até a gestão dos contratos, enquanto você foca apenas na manutenção
        da usina.
      </p>
      <p>
        Com a concessão de usinas solares, você transforma sua usina em uma fonte de renda passiva.
        Quanto mais sua usina gerar energia, mais você ganha! O Grupo BC Energia se encarrega de
        captar e gerenciar clientes, garantindo um fluxo constante de consumo, sem que você precise
        se envolver na parte operacional ou administrativa.
      </p>
    </Section>

    <Section className="mx-auto pl-6 pr-6 pt-10 text-justify lg:w-3/5">
      <Heading>Vantagens do Arrendamento de Usinas Solares:</Heading>

      <ul className="mb-10 flex flex-col gap-6">
        {benefits.map((item, index) => (
          <li className="text-lg" key={index}>
            <strong>{item.title}</strong>: {item.description}
          </li>
        ))}
      </ul>
      <div className="rounded-lg bg-gray-100 p-5 text-teal-900 lg:p-10">
        <h3 className="mb-6 text-center text-2xl uppercase">
          Aumente sua rentabilidade com segurança e sem complicações.
        </h3>
        <p className="text-center text-xl">
          Entre em{' '}
          <a className="text-blue-500" href="#contato">
            contato
          </a>{' '}
          e maximize o potencial de sua usina com a <strong>locação de usinas solares</strong> ao{' '}
          <strong>Grupo BC Energia</strong>!
        </p>
      </div>
    </Section>

    <Numbers
      btnText="Quero Economizar"
      btnLink="#contato"
      context="arrendamento"
      bgImage="/img/components/numbers/fundo-numeros.jpg"
    >
      ALGUNS NÚMEROS
    </Numbers>

    <BcFormSection
      title="Entre em contato"
      description="Preencha o formulário abaixo e um de nossos consultores entrará em contato para fornecer mais informações e ajudar você a iniciar essa parceria vantajosa!"
    >
      <FormularioParceiro solucao="arrendamento" />
    </BcFormSection>
  </div>
)

export default PlantLeasing
