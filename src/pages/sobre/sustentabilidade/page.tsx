import {
  About,
  Cta,
  PageHeader,
  FeatureV2,
  Section,
  Heading,
  ButtonLink,
  Resources
} from '@/components'
import Image from '@/components/Image'
import Link from '@/components/Link'

import { content, features, resources } from './data'

const Esg = () => (
  <div>
    <PageHeader
      title="Sustentabilidade"
      description="No Grupo BC Energia, sustentabilidade é mais do que um conjunto de práticas - é parte essencial da nossa identidade. Promovemos a sustentabilidade ambiental, apoiamos causas sociais significativas e mantemos uma governança transparente e ética."
      bgImage="/img/global/energia-por-assinatura.jpg"
      category="Sobre"
    />

    <About content={content} img="/img/pages/sustentabilidade.webp">
      <div className="mt-10 flex flex-col gap-14">
        {features.map((feature, i) => (
          <FeatureV2 key={i} {...feature} />
        ))}
      </div>
    </About>

    <Section className="px-6 pb-0 pt-0">
      <div className="grid gap-8 text-center lg:grid-cols-3">
        <div>
          <h2 className="mb-2 text-2xl uppercase text-teal-900">Energia Sustentável e Renovável</h2>
          <p className="text-justify">
            Nossas usinas fotovoltaicas geram energia 100% renovável, contribuindo para a redução
            das emissões de carbono e para a preservação dos recursos naturais. Por meio da geração
            e comercialização de energia solar , ajudamos nossos clientes a consumir energia
            sustentável, promovendo um consumo consciente e responsável.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-2xl uppercase text-teal-900">Compromisso com o Meio Ambiente</h2>
          <p className="text-justify">
            No Grupo BC Energia, nosso compromisso com a sustentabilidade vai além da geração de
            energia. Atuamos em conformidade com as melhores práticas ambientais, engajados em ações
            que fazem a diferença. Investimos no replantio de plantas nativas e na conservação de
            áreas verdes, promovendo a recuperação do ecossistema e contribuindo para a
            biodiversidade local.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-2xl uppercase text-teal-900">
            Atuação Responsável e Sustentável
          </h2>
          <p className="text-justify">
            Ao escolher o Grupo BC Energia, você se torna parte de um movimento que coloca a
            sustentabilidade em primeiro lugar. Nossas ações são voltadas para o presente e o
            futuro, com foco em soluções que minimizem os impactos ambientais e maximizem a
            eficiência energética. Acreditamos que a energia sustentável é um direito de todos, e
            conquistamos para torná-la acessível, sem comprometer as gerações futuras.
          </p>
        </div>
      </div>
    </Section>

    <Resources {...resources} />

    <Section className="px-6 pt-0">
      <div className="rounded-lg bg-gray-100 p-5 text-teal-900 lg:p-10">
        <h3 className="mb-6 text-center text-3xl uppercase">
          Junte-se a Nós por um Futuro Sustentável
        </h3>
        <p className="text-center">
          A sustentabilidade não é apenas um objetivo, é uma responsabilidade que o Grupo BC Energia
          assume com orgulho. Ao escolher soluções de energia renovável, você também está
          contribuindo para um futuro mais verde, reduzindo sua pegada de carbono e incentivando o
          uso de fontes de energia sustentáveis.
        </p>
        <p className="mt-6 text-center">
          <strong>
            {' '}
            Energia limpa, responsabilidade ambiental e um compromisso com o futuro. Esse é o Grupo
            BC Energia, onde a sustentabilidade está no centro de tudo o que fazemos.
          </strong>
        </p>
      </div>
    </Section>

    <Cta
      light={false}
      className="bg-teal-900"
      title="O Grupo Bc Energia chegou para revolucionar o comércio de energia no Brasil"
    >
      <>
        <p>
          Fique por dentro de todos os avanços no setor energético e saiba como economizar ainda
          mais na sua conta de energia, confira nossos outros serviços que estão revolucionando o
          mercado como{' '}
          <Link className="font-semibold text-amber-400" href="/produtos/gestao-de-energia">
            Consultoria e gestão de energia
          </Link>{' '}
          e{' '}
          <Link className="font-semibold text-amber-400" href="produtos/mercado-livre-de-energia">
            Mercado Livre de Energia
          </Link>
          .
        </p>
        <p>
          Temos Certeza de que encontrará conosco a oportunidade perfeita de economizar em sua conta
          de energia e otimizar os gastos mensais e anuais da sua casa ou empresa.
        </p>
        <p>Vamos juntos rumo ao sucesso no comércio de energia!</p>
      </>
    </Cta>

    <Section className="px-6">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <Heading center>Social</Heading>
          <p className="mb-10 text-center text-lg lg:text-justify">
            Avançamos em colaboração nas questões sociais em parceria com a Associação Bloomy, no
            qual temos a oportunidade de apoiar diversas causas sociais, com destaque para o Projeto
            SER, na Angola, onde apoiamos diretamente para levar educação, alimentação e saúde para
            crianças e adolescentes.
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

    <Section className="bg-gray-100 px-6 lg:gap-8">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <Heading center>Governança</Heading>
          <p className="text-center text-lg lg:text-justify">
            Nossa governança transparente e ética estabelece um padrão de responsabilidade
            corporativa, demonstrando protagonismo no setor elétrico com responsabilidade social e
            ambiental. <br /> <br />
            Há cinco anos temos nossos balanços auditados por uma “Large 5” e contamos com um
            conselho consultivo há quatro anos.
          </p>
        </div>
        <Image
          className="mx-auto rounded-lg"
          src="/img/pages/nossas-usinas.jpg"
          alt="Grupo BC Energia"
          width={600}
          height={533}
        />
      </div>
    </Section>
  </div>
)

export default Esg
