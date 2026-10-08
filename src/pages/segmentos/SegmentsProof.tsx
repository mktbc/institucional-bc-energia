import { logos } from '@/components/Customers/Customers.data'
import LogoCarousel from '@/components/Customers/LogoCarousel'

/** Seleção representativa (fonte de dados preservada integralmente). */
const displayedLogos = logos.filter((logo) => logo.featured).slice(0, 12)

/**
 * Momento 4a — Prova social compacta: faixa horizontal de logos reais,
 * sem caixa individual, sem grid espaçado.
 */
const SegmentsProof = () => (
  <section className="bg-surface pb-12 pt-14 lg:pb-14 lg:pt-20">
    <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10">
      <p className="t-eyebrow">Empresas que já confiam na BC</p>

      <LogoCarousel logos={displayedLogos} label="Empresas que já confiam na BC" />
    </div>
  </section>
)

export default SegmentsProof
