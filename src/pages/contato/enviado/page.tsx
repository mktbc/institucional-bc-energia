import { PageHeader, Section } from '@/components'
import Image from '@/components/Image'

const Blog = () => (
  <div>
    <PageHeader title="Contato" bgImage="/img/pages/contact.jpeg" category="Contato Enviado " />
    <Section className="bg-white pt-0">
      <div className="flex flex-col items-center">
        <Image
          className=""
          src="/img/icons/mail-sent.svg"
          alt="BC Energia"
          width={130}
          height={130}
        />{' '}
        <h2 className="mb-3 text-center text-3xl uppercase text-teal-900">
          Formulário enviado com sucesso!
        </h2>
        <p className="text-center text-lg text-teal-900">
          Seus dados foram enviados e serão analisados pela nossa equipe o mais breve possível.
          Obrigado.
        </p>
      </div>
    </Section>
  </div>
)

export default Blog
