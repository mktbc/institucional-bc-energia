import { useId } from 'react'
import Link from '@/components/Link'
import { COMPANY_METRICS } from '@/data/companyMetrics'

const MetricIcon = ({ id }: { id: string }) => {
  if (id === 'economia') {
    return (
      <svg className="bc-metric-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  }
  if (id === 'clientes') {
    return (
      <svg className="bc-metric-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
  return (
    <svg className="bc-metric-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export default function MetricsScale() {
  const id = useId()
  const lead = COMPANY_METRICS.find(metric => metric.id === 'economia')
  const metrics = lead ? [lead, ...COMPANY_METRICS.filter(metric => metric.id !== lead.id)] : COMPANY_METRICS

  return (
    <section className="bc-scale bc-scale--reference bc-scale--interactive" aria-labelledby={`${id}-title`}>
      <img className="bc-scale-photo" src="/img/hero/hero-resultados.webp" alt="" width={1920} height={1080} loading="lazy" decoding="async" aria-hidden="true" />
      <div className="be-wrap bc-scale-grid">
        <div className="bc-results">
          <h2 id={`${id}-title`}>Resultados que movem o mercado.</h2>
          <dl className="bc-results-list">
            {metrics.map((metric, idx) => (
              <div key={metric.id} className={`bc-metric ${metric.id === 'economia' ? 'bc-metric--lead' : ''}`}>
                <div className="bc-metric-header">
                  <MetricIcon id={metric.id} />
                  <dt className="bc-metric-label">{metric.label}</dt>
                </div>
                <dd className="bc-metric-value">{metric.value}</dd>
                {metric.description && <dd className="bc-metric-description">{metric.description}</dd>}
                {idx < metrics.length - 1 && <span className="bc-metric-separator" aria-hidden="true" />}
              </div>
            ))}
          </dl>
          <Link className="bc-text-link" href="/sobre/quem-somos" data-cta-name="home_numeros_quem_somos" data-cta-location="metrics">
            Conheça nossa história
          </Link>
        </div>
      </div>
    </section>
  )
}
