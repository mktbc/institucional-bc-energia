import { CheckList, EditorialIndex } from '@/components/Editorial'

import RegionalSection, { type RegionalSectionTone } from './RegionalSection'

export type RegionalAudienceProps = {
  eyebrow?: string
  title: string
  description?: string
  /** Perfis atendidos — frases já publicadas na página regional. */
  items: Array<string>
  tone?: RegionalSectionTone
  id?: string
}

/**
 * VISUAL 13 — perfis atendidos como lista editorial numerada.
 *
 * Sem card, sem grade pesada e sem ícones decorativos. Os perfis são
 * exatamente os publicados nos dados da rota.
 */
const RegionalAudience = ({
  eyebrow = 'Perfis atendidos',
  title,
  description,
  items,
  tone = 'surface',
  id
}: RegionalAudienceProps) => {
  if (!items?.length) return null

  return (
    <RegionalSection tone={tone} id={id}>
      <EditorialIndex eyebrow={eyebrow} title={title} description={description}>

        <CheckList items={items} grid />
      </EditorialIndex>
    </RegionalSection>
  )
}

export default RegionalAudience
