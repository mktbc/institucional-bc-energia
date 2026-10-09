import { EditorialIndex, ItemGrid } from '@/components/Editorial'
import type { SegmentChallenge } from '@/data/segments/segments.content'

import SegmentSection, { type SegmentSectionTone } from './SegmentSection'
import type { SectionGraphic } from '@/components/Product/ProductSection'

export type SegmentChallengesProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  eyebrow?: string
  title: string
  description?: string
  items: Array<SegmentChallenge>
  tone?: SegmentSectionTone
  id?: string
}

/**
 * Desafios do segmento — faixa editorial de 3 colunas com o mesmo peso visual.
 *
 * Lista tipográfica: título + texto, organizada só por grade e espaçamento
 * (sem filete por item). Contrasta com Benefícios, que usa superfície.
 */
const SegmentChallenges = ({
  graphic = { variant: 'chevrons', tone: 'teal', size: 'small', position: 'top-right', opacity: 0.05 },
  eyebrow,
  title,
  description,
  items,
  tone = 'soft',
  id
}: SegmentChallengesProps) => {
  if (!items?.length) return null

  return (
    <SegmentSection graphic={graphic} tone={tone} id={id}>
      <EditorialIndex eyebrow={eyebrow} title={title} description={description}>
        <ItemGrid items={items} />
      </EditorialIndex>
    </SegmentSection>
  )
}


export default SegmentChallenges
