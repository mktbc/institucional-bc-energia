import { BCIcon } from '@/components/BCIcon'
import type { BCIconName } from '@/config/icons'
import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'
import Link from '@/components/Link'

const solutions: Array<{
  label: string
  href: string
  description: string
  icon: BCIconName
}> = [
  {
    label: 'Mercado Livre de Energia',
    href: '/produtos/mercado-livre-de-energia',
    description: 'Negociação e gestão para consumidores elegíveis.',
    icon: 'mercado-crescimento'
  },
  {
    label: 'Consórcio BC Energia',
    href: '/produtos/consorcio-bc-energia',
    description: 'Economia sem obra e sem instalação de placas.',
    icon: 'geracao-distribuida'
  },
  {
    label: 'Gestão de Energia',
    href: '/produtos/gestao-de-energia',
    description: 'Acompanhamento técnico e operacional.',
    icon: 'monitoramento-consumo'
  }
]

/**
 * Momento 4b — Soluções em faixa escura, logo após a prova social.
 * Área editorial de navegação: hierarquia só por tipografia, hairlines
 * sutis e um único elemento oficial (ELEMENTO 04 / radial) contido no
 * canto direito, sem atravessar a lista.
 */
const SegmentsSolutions = () => (
  <section className="bc-segment-solutions-approved relative isolate overflow-hidden bg-surface-muted text-text-primary bc-level-mid">
    <BrandGraphic
      variant="radial"
      tone="teal"
      className="-right-[12%] top-1/2 hidden h-[38rem] w-[38rem] -translate-y-1/2 bg-right opacity-[0.05] lg:block"
    />

    <div className="bc-container">
      <div className="max-w-[58rem]">
        <p className="t-eyebrow">Portfólio</p>
        <h2 className="t-h2-mid mt-2 text-text-primary">
          Soluções disponíveis para qualquer segmento
        </h2>
      </div>

      <ul
        data-cta-location="hub_navigation"
        className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-9"
      >
        {solutions.map((item) => (
          <li key={item.href} className="h-full">
            <Link
              href={item.href}
              data-cta-name={`related_${item.href}`}
              className="bc-card bc-card-interactive group flex h-full flex-col border-l-2 border-l-bc-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <BCIcon
                name={item.icon}
                size={28}
                className="shrink-0 opacity-75 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
              />

              <span className="t-h4-display mt-4 text-text-primary transition-colors duration-300 group-hover:text-bc-primary motion-reduce:transition-none">
                {item.label}
              </span>

              <span className="mt-2 max-w-[42ch] t-body-sm text-text-secondary">
                {item.description}
              </span>

              <span className="bc-arrow-action mt-5 w-fit t-action-label">
                Conhecer solução
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default SegmentsSolutions
