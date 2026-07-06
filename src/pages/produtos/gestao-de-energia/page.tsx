import {
  About,
  BcFormSection,
  ChecklistItem,
  Cta,
  FormularioMercadoLivre,
  Heading,
  Numbers,
  PageHeader
} from '@/components'
import Link from '@/components/Link'

import { content, features, checklistItems, cta } from './data'


const PowerManagement = () => (
  <div>
    <PageHeader
      icon="icon-gestao-de-energia.svg"
      title="Gestão de Energia"
      description=""
      bgImage="/img/global/gestao-de-energia.jpg"
      category="Produtos"
    />

    <About content={content} features={features} img="/img/pages/gestao-de-energia-intro.png">
      <div>
        <Heading center={false} full>
          Vantagens da BC Serviços
        </Heading>
        <p className="mb-14 text-center lg:text-left">
          Além de especialistas no mercado de energia, contamos com um software qualificado para
          gestão de energia que tem tudo para reduzir os seus custos.
          <br />
          Com o Sistema de Gerenciamento de Energia, sua empresa pode alcançar um corte de até 26%
          nas despesas relacionadas à conta e consumo.
        </p>

        <div className="grid lg:grid-cols-1">
          {checklistItems.map((item, index) => (
            <ChecklistItem key={index} title={item} />
          ))}
        </div>
      </div>
    </About>

    <Cta
      className="container mx-auto mb-12 overflow-hidden sm:rounded-lg"
      {...cta}
      overlay
      overlayColor="dark"
    />

    <Numbers
      btnText="Quero Economizar"
      btnLink="#contato"
      context="gestao_energia"
      bgImage="/img/components/numbers/fundo-numeros.jpg"
    >
      Volume negociado (gWH) em faturamento anual (R$)
    </Numbers>

    <Cta title="Consultoria em Gestão de Energia" className="bg-gray-200" light>
      <p>
        Nossa Consultoria em Gestão de Energia é altamente capacitada e assertiva, não perca tempo e
        entre em contato conosco, e lembre-se temos outros serviços fantásticos e inovadores que
        podem diminuir expressivamente seus gastos energéticos como{' '}
        <Link className="font-semibold text-teal-600" href="/produtos/mercado-livre-de-energia">
          Mercado Livre de Energia
        </Link>{' '}
        e{' '}
        <Link className="font-semibold text-teal-600" href="/produtos/consorcio-bc-energia">
          Geração distribuída de energia
        </Link>
        , temos certeza de que encontrará a solução ideal para economizar ainda mais nas suas contas
        e gerar ainda mais receita, venha com o Grupo BC Energia nessa jornada revolucionária!
      </p>
    </Cta>

    <BcFormSection title="Entre em contato">
      <FormularioMercadoLivre solucao="gestao_energia" />
    </BcFormSection>
  </div>
)

export default PowerManagement
