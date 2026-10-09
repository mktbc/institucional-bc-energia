import { ReactNode } from 'react'

import { accentTitle } from '@/components/Editorial/accentTitle'
import Link from '@/components/Link'

import CountUp from './CountUp'
import ProductSection from './ProductSection'

export type ProofItem = { title?: string; label?: string; subtitle?: string }

export type ProofBandProps = {
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  link?: { label: string; href: string; target?: string }
  /** Valor de `data-cta-location` do link (rastreamento preservado por origem). */
  ctaLocation?: string
  items: Array<ProofItem>
  id?: string
}

/**
 * Faixa de números — padrão único do site, na composição de "Resultados" da
 * Home: título à esquerda, texto de apoio e link à direita e, abaixo, as
 * métricas em três colunas separadas por filetes, com os números em amarelo
 * sobre o verde profundo da marca. Os dados vêm de `getNumbers` em cada
 * componente de origem; aqui só a apresentação.
 */
const ProofBand = ({
  eyebrow,
  title,
  description,
  link,
  ctaLocation = 'proof',
  items,
  id
}: ProofBandProps) => (
  <ProductSection
    graphic={{ variant: 'none' }}
    tone="dark"
    id={id}
    className="bc-proof-composition bc-proof-band"
  >
    {title ? (
      <div className="bc-split-head bc-split-head--dark">
        <div>
          {eyebrow ? <p className="t-eyebrow">{eyebrow}</p> : null}
          <h2 className="t-h2 text-white">{accentTitle(title)}</h2>
        </div>
        {description || link ? (
          <div className="bc-split-aside">
            {description ? <p>{description}</p> : null}
            {link ? (
              <Link
                href={link.href}
                target={link.target}
                data-cta-name={link.label}
                data-cta-location={ctaLocation}
                className="bc-arrow-action bc-arrow-action--dark t-action-label"
              >
                {link.label}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    ) : null}
    {items.length ? (
      <dl className="bc-proof-metrics">
        {items.map((item, index) => (
          <div key={`${item.title}-${index}`}>
            <dt className="t-metric-md">
              <CountUp value={item.title} />
            </dt>
            <dd>
              {item.label ? <span className="bc-proof-label">{item.label}</span> : null}
              {item.subtitle}
            </dd>
          </div>
        ))}
      </dl>
    ) : null}
  </ProductSection>
)

export default ProofBand
