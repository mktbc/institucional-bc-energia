import { Container } from '@/components/Container'
import LogoStrip from './LogoStrip'
import { SectionHeader } from '@/components/SectionHeader'

import { logos } from './Customers.data'
import { CustomersProps } from './Customers.type'

/** Seleção priorizando marcas destacadas, sem remover nada da fonte de dados. */
const selectLogos = (limit?: number) => {
  if (!limit) return logos
  const featured = logos.filter((logo) => logo.featured)
  const rest = logos.filter((logo) => !logo.featured)
  return [...featured, ...rest].slice(0, limit)
}

/**
 * Faixa institucional de confiança — a mesma apresentação horizontal em todas
 * as páginas. `variant` segue aceito pelas chamadas existentes, mas grade e
 * carrossel convergiram para a faixa estática (ver LogoStrip).
 */
const Customers = ({
  eyebrow = 'PARCERIA E CONFIANÇA',
  title = 'Nossos Clientes',
  description,
  limit,
  className = ''
}: CustomersProps = {}) => (
  <section className={`bc-client-strip bc-section-md bg-surface-muted ${className}`}>
    <Container>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <LogoStrip logos={selectLogos(limit)} label={title} />
    </Container>
  </section>
)

export default Customers
