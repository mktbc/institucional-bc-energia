import { About, Cta, FormEmbed, Numbers, PageHeader } from '@/components'
import Link from '@/components/Link'

import { content, features } from './data'

const IRECRenewableCertification = () => (
  <div>
    <PageHeader
      icon="icon-certificacao-renovavel.svg"
      title="Certificação renovável - IREC"
      description=""
      bgImage="/img/global/certificacao-renovavel.jpg"
      category="Produtos"
    />

    <About
      content={content}
      features={features}
      img="/img/pages/certificacao-renovavel-intro.jpg"
    />

    <Numbers
      btnText="Quero Economizar"
      btnLink="#contato"
      context="irec"
      bgImage="/img/components/numbers/fundo-numeros.jpg"
    >
      Volume negociado (gWH) em faturamento anual (R$)
    </Numbers>

    <Cta light title="O Grupo Bc Energia chegou para revolucionar o comércio de energia no Brasil">
      <>
        <p>
          Não deixe de verificar nossos outros serviços como{' '}
          <Link className="font-semibold text-amber-400" href="/produtos/consorcio-bc-energia">
            Geração distribuída de energia
          </Link>{' '}
          e{' '}
          <Link className="font-semibold text-amber-400" href="/produtos/gestao-de-energia">
            Consultoria e gestão de energia
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

    <FormEmbed title="Entre em contato" />
  </div>
)

export default IRECRenewableCertification
