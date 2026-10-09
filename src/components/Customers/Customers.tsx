import { Container } from '@/components/Container'
import Image from '@/components/Image'
import LogoCarousel from './LogoCarousel'
import { SectionHeader } from '@/components/SectionHeader'

import { logos } from './Customers.data'
import { CustomersProps } from './Customers.type'

const largerLogoIds = new Set(['1', '5', '7', '9', '12', '13', '15', '17', '18', '19'])

/** Seleção priorizando marcas destacadas, sem remover nada da fonte de dados. */
const selectLogos = (limit?: number) => {
  if (!limit) return logos
  const featured = logos.filter((logo) => logo.featured)
  const rest = logos.filter((logo) => !logo.featured)
  return [...featured, ...rest].slice(0, limit)
}

/** Grade por padrão; faixa acessível quando a página pede movimento. */
const Customers = ({
  eyebrow = 'PARCERIA E CONFIANÇA',
  title = 'Nossos Clientes',
  description,
  limit,
  variant = 'grid',
  className = ''
}: CustomersProps = {}) => (
  <section className={`bc-client-strip bc-section-md bg-surface-muted ${className}`}>
    <Container>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />

      {/* Faixa de confiança: menos colunas e logos maiores, para a seção ler
          como prova institucional e não como uma grade de miniaturas. */}
      {variant === 'carousel' ? <LogoCarousel logos={selectLogos(limit)} label={title} /> : (
      <ul className="mt-8 grid grid-cols-3 items-center gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-10 lg:gap-y-10 xl:grid-cols-6">
        {selectLogos(limit).map((logo) => (
          <li key={logo.id} data-optical-size={largerLogoIds.has(logo.id) ? 'raised' : undefined} className="flex min-h-[64px] items-center justify-center lg:min-h-[80px]">
            <Image
              src={`/img/components/customers/${logo.url}`}
              alt={logo.name ?? logo.title}
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="h-auto max-h-12 w-auto max-w-full object-contain sm:max-h-14 lg:max-h-16"
            />
          </li>
        ))}
      </ul>
      )}
    </Container>
  </section>
)

export default Customers
