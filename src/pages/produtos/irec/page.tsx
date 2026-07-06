import { About, BcFormSection, FormularioIREC, Heading, PageHeader, Section } from '@/components'

import { content, benefits, content2 } from './data'


const PlantLeasing = () => (
  <div>
    <PageHeader
      icon="irec.svg"
      title="I-REC"
      description=""
      bgImage="/img/global/arrendamento-de-usinas.jpg"
      category="Produtos"
    />

    <About imgLink="#contato" content={content} img="/img/pages/irec1.jpg" />

    <Section className="pb-6 pt-0">
      <div className="grid lg:grid-cols-2 lg:gap-12">
        <div className="mx-auto mb-10 rounded-lg bg-gray-100 pb-12 pl-12 pr-12 pt-12 text-justify">
          <Heading>
            Como Funciona a Certificação <br /> I-REC:
          </Heading>
          <p className="text-justify text-xl">
            O certificado I-REC prova que a energia utilizada pela sua empresa é proveniente de
            fontes renováveis, como energia solar, eólica, de biomassa e hidráulica. A certificação
            está disponível para qualquer empresa, inclusive aquelas que operam no mercado cativo,
            permitindo a todas as organizações a oportunidade de demonstrar seu compromisso com a
            sustentabilidade.
          </p>
          <br />
          <p className="text-justify text-lg font-bold">
            Cada REC representa uma unidade de geração de energia renovável (1 REC = 1 MWh).
          </p>
        </div>

        <div className="mx-auto pl-6 pr-6 pt-6 text-justify">
          <Heading>Benefícios da Certificação I-REC:</Heading>

          <ul className="mb-6 flex flex-col gap-6">
            {benefits.map((item, index) => (
              <li className="text-lg" key={index}>
                <strong>{item.title}</strong>: {item.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>

    <About
      imgLink="#contato"
      inverter
      className="bg-gray-100 pt-16"
      content={content2}
      img="/img/pages/irec2.jpg"
    />

    <BcFormSection
      title="Entre em contato"
      description="Preencha o formulário abaixo e um de nossos consultores entrará em contato para fornecer mais informações sobre a certificação I-REC."
    >
      <FormularioIREC solucao="irec" />
    </BcFormSection>
  </div>
)

export default PlantLeasing
