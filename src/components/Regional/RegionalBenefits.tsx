import { EditorialIndex, ItemGrid } from '@/components/Editorial'

import RegionalSection, { type RegionalSectionTone } from './RegionalSection'

export type RegionalBenefitItem = {
  title: string
  description?: string
}

export type RegionalBenefitsProps = {
  eyebrow?: string
  title: string
  description?: string
  items: Array<RegionalBenefitItem>
  tone?: RegionalSectionTone
  id?: string
}

/**
 * VISUAL 13 — diferenciais como composição tipográfica em duas colunas.
 *
 * Mesmo conteúdo publicado em `src/data/regions`, sem cards, sem ícones e sem
 * amarelo sobre fundo claro.
 */
const RegionalBenefits = ({
  eyebrow,
  title,
  description,
  items,
  tone = 'surface',
  id
}: RegionalBenefitsProps) => {
  if (!items?.length) return null

  return (
    <RegionalSection tone={tone} id={id}>
      <EditorialIndex eyebrow={eyebrow} title={title} description={description}>

        <ItemGrid items={items} />
      </EditorialIndex>
    </RegionalSection>
  )
}

export default RegionalBenefits
