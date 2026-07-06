import { Customers, PageHeader, ProductCard, Section } from '@/components'

import { powerPlants } from './data'

const OurPlants = () => (
  <div>
    <PageHeader
      title="Nossas usinas"
      description="A empresa BC Renováveis atua na área de geração de energia elétrica através de fontes renováveis. Contamos com uma estrutura própria de usinas distribuídas em locais estratégicos, o que garante a capacidade necessária para geração e distribuição de energia."
      bgImage="/img/global/arrendamento-de-usinas.jpg"
      category="Sobre"
    />
    <Section className="bg-white px-6 pb-2 pt-2">
      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {powerPlants.map((plant) => (
          <ProductCard key={plant.id} {...plant} />
        ))}
      </div>
    </Section>

    <Customers />
  </div>
)

export default OurPlants
