import { About, Cta, Customers, FormEmbed, PageHeader } from '@/components'
import Link from '@/components/Link'

import { contentConsorcio, contentMercadoLivre } from './data'


const Page = () => (
  <div>
    <PageHeader
      title="BC Energia para todos"
      description="Encontre o modelo ideal para o seu perfil de consumo. Todas as nossas soluções são sem investimento"
      bgImage="/img/global/mercado-livre-de-energia.jpg"
      category="Produtos"
    />

    <About
      imgLink="#contato"
      content={contentMercadoLivre}
      img="/img/pages/mercado-livre-de-energia-intro.png"
    />
    <About
      target="_blank"
      imgLink="https://www.appenergia.com.br/Grupo_BC_Energia/"
      className="bg-gray-100 pt-20"
      content={contentConsorcio}
      img="/img/pages/consorcio-intro.png"
      inverter={true}
    />

    <Cta
      title="O Grupo Bc Energia chegou para revolucionar o comércio de energia no Brasil"
      className="bg-teal-900"
    >
      <>
        <p>
          Não deixe de verificar nossos outros serviços como{' '}
          <Link className="font-semibold text-amber-400" href="/produtos/arrendamento-de-usinas">
            Arrendamento de Usinas
          </Link>{' '}
          e{' '}
          <Link className="font-semibold text-amber-400" href="/produtos/gestao-de-energia">
            Consultoria e Gestão de Energia
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

    <Customers />

    <FormEmbed title="Entre em contato" />
  </div>
)

export default Page
