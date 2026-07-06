import { PageHeader, Section, Heading, ButtonLink } from '@/components'
import Image from '@/components/Image'

const Esg = () => (
  <div>
    <PageHeader
      title="Social"
      description=""
      bgImage="/img/global/energia-por-assinatura.jpg"
      category="Sobre"
    />

    <Section className="px-6 pt-0">
      <Heading center>
        Compromisso Social do Grupo BC Energia: Transformando Vidas com a Associação Bloomy
      </Heading>
      <div className="grid grid-cols-1 gap-16 pt-6 lg:grid-cols-2">
        <div>
          <p className="mb-10 text-center text-lg lg:text-justify">
            No <strong>Grupo BC Energia</strong>, a responsabilidade social é uma parte central do
            nosso propósito. Além de fornecer energia limpa e renovável, estamos engajados em ações
            sociais que impactam positivamente comunidades em situação de vulnerabilidade. Em
            parceria com a <strong>Associação Bloomy</strong>, apoiamos o{' '}
            <strong>Projeto SER</strong>, que leva educação, saúde e alimentação para crianças e
            adolescentes em Angola, transformando vidas e criando oportunidades para um futuro
            melhor.
          </p>
          <div className="flex flex-col items-center justify-center gap-10">
            <Image
              className="rounded-lg"
              src="/img/pages/bloomy.jpeg"
              alt="Grupo BC Energia"
              width={80}
              height={80}
            />
            <ButtonLink href="https://www.instagram.com/bloomy_ong/" target="_blank">
              Conheça os projetos
            </ButtonLink>
          </div>
        </div>
        <Image
          className="mx-auto rounded-lg"
          src="/img/pages/grupo-bg-esg-social.webp"
          alt="Grupo BC Energia"
          width={600}
          height={533}
        />
      </div>
    </Section>
    <Section className="px-6 pt-0">
      <h3 className="mb-4 text-2xl uppercase leading-tight text-teal-900 lg:text-2xl">
        Projeto SER: Educação e Esperança em Angola
      </h3>
      <p className="text-justify">
        O <strong>Projeto SER</strong>, desenvolvido pela Associação Bloomy, é uma das principais
        iniciativas sociais que apoiamos. Com foco em levar{' '}
        <strong>educação, alimentação e saúde</strong> para mais de{' '}
        <strong>600 crianças e adolescentes em Angola</strong>, o projeto é um símbolo do nosso
        compromisso em promover mudanças sociais significativas. Por meio da construção de escolas e
        da oferta de suporte essencial, o <strong>Grupo BC Energia</strong> contribui para garantir
        que essas crianças tenham acesso a melhores condições de vida e oportunidades de
        desenvolvimento.
      </p>
      <h3 className="mb-4 mt-10 text-2xl uppercase leading-tight text-teal-900 lg:text-2xl">
        Atuação Social no Brasil e no Mundo
      </h3>
      <p className="text-justify">
        Nosso compromisso social não se limita ao Brasil. Ao apoiar o{' '}
        <strong>Projeto SER em Angola </strong>, ampliamos nosso impacto global, promovendo{' '}
        <strong>educação</strong>e <strong>bem-estar</strong> para comunidades carentes. Além disso,
        no Brasil, especialmente no estado de Goiás, conquistou para ajudar <strong>idosos</strong>{' '}
        e <strong>mulheres</strong>, garantindo que mais pessoas em situação de vulnerabilidade
        tenham acesso a cuidados, inclusão e melhoria de qualidade de vida.
      </p>
      <h3 className="mb-4 mt-10 text-2xl uppercase leading-tight text-teal-900 lg:text-2xl">
        Nossas Ações Sociais em Destaque
      </h3>
      <p className="text-justify">
        <strong>Educação</strong>: Contribuímos para a construção de escolas e oferecemos programas
        que garantem que crianças e adolescentes em Angola tenham acesso à educação de qualidade.
      </p>
      <p className="text-justify">
        <strong>Saúde e Alimentação</strong>: O Grupo BC Energia participa ativamente da garantia de
        alimentos e cuidados de saúde essenciais para mais de 600 jovens, proporcionando um suporte
        vital para o desenvolvimento dessas comunidades.
      </p>
      <p className="text-justify">
        <strong>Apoio a Idosos e Mulheres</strong>: No Brasil, promovemos iniciativas inovadoras ao
        cuidado e inclusão de idosos e mulheres, reforçando nosso compromisso com a equidade social.
      </p>
      <h3 className="mb-4 mt-10 text-2xl uppercase leading-tight text-teal-900 lg:text-2xl">
        Transformando Comunidades em Parceria com a Associação Bloomy
      </h3>
      <p className="text-justify">
        Ao lado da Associação Bloomy , o Grupo BC Energia orgulha-se de fazer parte desta iniciativa
        transformadora que impacta positivamente tantas vidas. O nosso apoio ao Projeto SER em
        Angola reafirma o nosso compromisso de promover um mundo mais justo e sustentável, onde a
        educação, a saúde e a dignidade sejam acessíveis a todos.
      </p>
      <p className="mt-10 text-justify font-bold">
        Junte-se a nós nessa missão de transformação social e contribua para um futuro mais próspero
        e igualitário.
      </p>
    </Section>
  </div>
)

export default Esg
