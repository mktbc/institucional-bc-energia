import { Heading, ProductCard, Section } from '@/components'
import { productCardData } from '@/components/ProductCard/ProductCard.data'

const Solutions = ({
  titleSection = true,
  segmentsPage,
  className
}: {
  titleSection?: boolean
  className?: string
  segmentsPage?: boolean
}) => {
  const products = segmentsPage ? productCardData.slice(0, 3) : productCardData
  return (
    <Section id="home_solucoes" className={`${className} gap-4 bg-white px-6 pt-10 lg:px-[auto]`}>
      {titleSection && (
        <Heading subtitle="Produtos" className="mb-14">
          Conheça aqui algumas das soluções que oferecemos para redução na conta de energia
        </Heading>
      )}
      <div className={`${!titleSection || 'lg:mt-16'} grid gap-8 lg:grid-cols-2 xl:grid-cols-3`}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </Section>
  )
}

export default Solutions
