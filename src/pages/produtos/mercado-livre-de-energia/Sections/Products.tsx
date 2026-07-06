import { ChecklistItem, Heading, Section } from '@/components'

import { checklistItems } from '../data'

const Products = () => (
  <Section className="px-6">
    <Heading center full>
      Produtos
    </Heading>
    <p className="mb-14 text-center text-lg">
      Uma das maiores empresas do setor energético do país, o Grupo BC Energia oferece soluções
      personalizadas e eficientes para reduzir os gastos com energia em sua empresa ou residência.
      Tudo isso combinado a um atendimento centrado em transparência, confiança e competência.
    </p>

    <div className="grid lg:grid-cols-2">
      {checklistItems.map((item, index) => (
        <ChecklistItem key={index} title={item} uppercase />
      ))}
    </div>
  </Section>
)

export default Products
