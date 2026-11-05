import { logos } from '@/components/Customers/Customers.data'
import LogoStrip from '@/components/Customers/LogoStrip'

/** Seleção representativa (fonte de dados preservada integralmente). */
const displayedLogos = logos.filter((logo) => logo.featured).slice(0, 12)

/**
 * Momento 4a — Prova social compacta: faixa horizontal de logos reais,
 * sem caixa individual, sem grid espaçado.
 */
const SegmentsProof = () => (
  <section className="bc-client-strip bc-level-support bg-surface">
    <div className="bc-container">
      <p className="t-eyebrow">Empresas que já confiam na BC</p>

      <LogoStrip logos={displayedLogos} label="Empresas que já confiam na BC" />
    </div>
  </section>
)

export default SegmentsProof
