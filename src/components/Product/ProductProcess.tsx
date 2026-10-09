import { ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader/SectionHeader'

import ProductSection, { type ProductSectionTone } from './ProductSection'
import type { ProductStep } from './ProductSteps'
import type { SectionGraphic } from './ProductSection'

export type ProductProcessProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  steps: Array<ProductStep>
  image?: {
    src: string
    alt: string
    srcSet?: string
    sizes?: string
  }
  note?: string
  tone?: ProductSectionTone
  id?: string
}

/**
 * VISUAL 11 — "como funciona" como sequência tipográfica.
 *
 * Mantém a lógica de processo (mesmos passos, mesma ordem), mas troca as
 * caixas por uma lista numerada. O numeral é um marcador discreto (18px),
 * para não competir com métricas (relatório S1).
 */
const ProductProcess = ({
  graphic = { variant: 'chevrons', tone: 'teal', size: 'small', position: 'top-right', opacity: 0.05 },
  eyebrow,
  title,
  description,
  steps,
  image,
  note,
  tone = 'muted',
  id
}: ProductProcessProps) => (
  <ProductSection graphic={graphic} tone={tone} id={id}>
    {/* Cabeçalho dividido no topo; abaixo, foto e passos lado a lado com
        topo e base alinhados (a foto acompanha a altura da lista). */}
    <div className="bc-split-head">
      <SectionHeader eyebrow={eyebrow} title={title} level="mid" />
      {description ? (
        <div className="bc-split-aside">
          <p>{description}</p>
        </div>
      ) : null}
    </div>

    <div className={`grid grid-cols-1 gap-8 lg:gap-14 ${image ? 'lg:grid-cols-12' : ''}`}>
      {image ? (
        <div className="bc-fill-media hidden lg:col-span-5 lg:block">
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.sizes ?? '(max-width: 1024px) 100vw, 40vw'}
            alt={image.alt}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="w-full object-cover object-center"
          />
        </div>
      ) : null}

      <ol className={`bc-process-steps flex flex-col gap-8 ${image ? 'lg:col-span-7' : ''}`}>
        {steps.map((step, index) => (
          <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-border-subtle pt-6">
            <span
              aria-hidden="true"
              className="font-display text-[1.5rem] font-bold leading-[1.1] tabular-nums text-bc-primary"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="t-h4 text-text-primary">{step.title}</h3>
              <p className="mt-2 max-w-[62ch] t-body-sm text-text-secondary">
                {step.description}
              </p>
            </div>
          </li>
        ))}

        {note ? (
          <li className="rounded-[16px] bg-bc-primary/[0.06] px-6 py-5 t-body-sm text-text-secondary">
            {note}
          </li>
        ) : null}
      </ol>
    </div>
  </ProductSection>
)

export default ProductProcess
