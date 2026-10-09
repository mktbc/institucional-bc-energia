import { ReactNode } from 'react'

import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'
import type { SectionGraphic } from '@/components/Product/ProductSection'
import { Container } from '@/components/Container'

export type RegionalSectionTone = 'surface' | 'soft' | 'muted' | 'dark' | 'brand'

export type RegionalSectionProps = {
  children: ReactNode
  tone?: RegionalSectionTone
  /** Nível de hierarquia vertical — mesmo padrão do `ProductSection`. */
  level?: 'lead' | 'mid' | 'support'
  id?: string
  className?: string
  /** Elemento de apoio da marca (opcional, `none` por padrão). */
  graphic?: SectionGraphic
}

const levels: Record<'lead' | 'mid' | 'support', string> = {
  lead: 'bc-level-lead',
  mid: 'bc-level-mid',
  support: 'bc-level-support'
}

const tones: Record<RegionalSectionTone, string> = {
  surface: 'bg-surface text-text-primary',
  soft: 'bg-surface-soft text-text-primary',
  muted: 'bg-surface-muted text-text-primary',
  dark: 'bg-bc-dark text-text-inverse',
  brand: 'bg-surface-brand text-text-inverse'
}

/**
 * Invólucro único das seções das páginas regionais (VISUAL 13).
 *
 * Mesmo container e mesmo ritmo vertical das páginas de produto e segmento.
 * As superfícies existem para formar macroblocos — não para alternar cor a
 * cada seção. Hospeda também o elemento oficial de apoio da seção.
 *
 * O ritmo vem das escalas do Design System (`bc-level-*`), como no
 * `ProductSection`. Antes era `py-12 lg:py-20` fixo nas 6 seções de cada
 * página regional: 160px entre blocos, sempre iguais.
 */
const RegionalSection = ({
  children,
  tone = 'surface',
  level = 'mid',
  id,
  className = '',
  graphic
}: RegionalSectionProps) => {
  const hasGraphic = Boolean(graphic && graphic.variant !== 'none')

  return (
    <section
      id={id}
      className={`bc-page-section bc-page-section--${tone} ${tones[tone]} ${hasGraphic ? 'relative isolate overflow-hidden' : ''} ${className}`.trim()}
    >
      {hasGraphic && graphic ? <BrandGraphic {...graphic} /> : null}
      <Container className={`${levels[level]} ${hasGraphic ? 'relative' : ''}`.trim()}>{children}</Container>
    </section>
  )
}

export default RegionalSection
