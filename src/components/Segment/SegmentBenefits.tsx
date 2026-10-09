import { EditorialIndex, ItemGrid } from '@/components/Editorial'

import SegmentSection, { type SegmentSectionTone } from './SegmentSection'

export type SegmentBenefitItem = {
  title: string
  description?: string
  /** Ícone legado em /public — não é mais exibido (VISUAL 12). */
  icon?: string
}

export type SegmentBenefitsProps = {
  eyebrow?: string
  title: string
  description?: string
  items: Array<SegmentBenefitItem>
  tone?: SegmentSectionTone
  id?: string
}

/**
 * VISUAL 12 — benefícios em superfícies sólidas e discretas.
 *
 * Mesmo conteúdo publicado em `src/data/segments/*.json`. Cards de superfície
 * (sem borda, sombra, ícone ou amarelo) para diferenciar do bloco Desafios,
 * que é só tipográfico. Os ícones do JSON são genéricos e iguais em todos os
 * segmentos, por isso não são exibidos.
 */
const SegmentBenefits = ({
  eyebrow,
  title,
  description,
  items,
  tone = 'surface',
  id
}: SegmentBenefitsProps) => {
  if (!items?.length) return null

  return (
    <SegmentSection tone={tone} id={id} className="bc-segment-benefits">
      <EditorialIndex eyebrow={eyebrow} title={title} description={description}>

        <ItemGrid items={items} />
      </EditorialIndex>
    </SegmentSection>
  )
}

export default SegmentBenefits
