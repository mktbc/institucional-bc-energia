import { Section, PageHeader, Heading, FormEmbed } from '@/components'

const Contato = () => (
  <div>
    <PageHeader title="Contato" bgImage="/img/pages/contact.jpeg" />
    <Section id="contato2" className="bg-white pb-4 pt-0">
      <Heading>Entre em contato conosco</Heading>
      <p className="text-center">
        Ficou com dúvidas sobre nossas soluções? Entre em contato conosco pelo formulário abaixo
      </p>
    </Section>

    <FormEmbed />
  </div>
)

export default Contato
