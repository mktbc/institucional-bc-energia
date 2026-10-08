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

      {variant === 'carousel' ? <LogoCarousel logos={selectLogos(limit)} label={title} /> : (
      <ul className="mt-6 grid grid-cols-3 items-center gap-x-5 gap-y-5 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-6 lg:gap-x-8 lg:gap-y-6 xl:grid-cols-7">
        {selectLogos(limit).map((logo) => (
          <li key={logo.id} data-optical-size={largerLogoIds.has(logo.id) ? 'raised' : undefined} className="flex min-h-[56px] items-center justify-center lg:min-h-[64px]">
            <Image
              src={`/img/components/customers/${logo.url}`}
              alt={logo.name ?? logo.title}
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="h-auto max-h-10 w-auto max-w-full object-contain sm:max-h-12 lg:max-h-14"
            />
          </li>
        ))}
      </ul>
      )}
    </Container>
  </section>
)

export default Customers
