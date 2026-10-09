import SolutionPick from '@/components/Editorial/SolutionPick'
import { EditorialIndex } from '@/components/Editorial'
import { PRODUCT_HUB_ITEMS } from '@/config/navigation'

import RegionalSection, { type RegionalSectionTone } from './RegionalSection'

export type RegionalSolutionItem = {
  href: string
  /** Âncora descritiva já publicada na página regional. */
  label: string
  /** Por que a solução faz sentido para o perfil da região. */
  description: string
  target?: string
}

export type RegionalSolutionsProps = {
  eyebrow?: string
  title: string
  description?: string
  items: Array<RegionalSolutionItem>
  /** Slug da região — usado apenas no rótulo de tracking. */
  regionSlug?: string
  tone?: RegionalSectionTone
  id?: string
}

/**
 * VISUAL 13 — soluções como resposta ao contexto local.
 *
 * Uma solução protagonista + demais em lista editorial (sem grid de cards).
 * Nome e URL vêm de `PRODUCT_HUB_ITEMS`; a justificativa é a já publicada na
 * própria região. Se houver apenas uma solução, nada é inventado.
 */
const RegionalSolutions = ({
  eyebrow = 'Portfólio',
  title,
  description,
  items,
  regionSlug,
  tone = 'soft',
  id = 'solucoes'
}: RegionalSolutionsProps) => {
  const entries = items
    .map((item) => ({ item, hub: PRODUCT_HUB_ITEMS.find((hub) => hub.href === item.href) }))
    .filter(({ hub }) => Boolean(hub))

  if (!entries.length) return null
  const [lead, ...rest] = entries
  const trackingSlug = regionSlug ?? 'geral'
  const toPick = ({ item, hub }: (typeof entries)[number]) => ({
    href: item.href,
    title: hub?.title ?? item.label,
    description: item.description,
    target: item.target,
    ariaLabel: item.label,
    tracking: {
      'data-cta-name': `regional_${trackingSlug}_${hub?.title ?? item.href}`,
      'data-cta-location': 'regional_solutions'
    }
  })

  return (
    <RegionalSection tone={tone} id={id} className="bc-solutions-composition">
      <EditorialIndex eyebrow={eyebrow} title={title} description={description}>
        <SolutionPick
          dark={tone === 'dark' || tone === 'brand'}
          lead={toPick(lead)}
          rest={rest.map(toPick)}
        />
      </EditorialIndex>
    </RegionalSection>
  )
}

export default RegionalSolutions
