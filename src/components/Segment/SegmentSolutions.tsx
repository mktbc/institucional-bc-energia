import SolutionPick from '@/components/Editorial/SolutionPick'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { PRODUCT_HUB_ITEMS } from '@/config/navigation'


import SegmentSection, { type SegmentSectionTone } from './SegmentSection'

export type SegmentSolutionsProps = {
  eyebrow?: string
  title: string
  description?: string
  /** Parágrafos da ponte desafio → solução (conteúdo já publicado). */
  paragraphs?: Array<string>
  /** Hrefs do portfólio — nome, descrição e ícone vêm de PRODUCT_HUB_ITEMS. */
  hrefs: Array<string>
  /** Slug do segmento, usado apenas no rótulo de tracking. */
  segmentSlug?: string
  tone?: SegmentSectionTone
  id?: string
}

/**
 * Composição única: contexto ("Como ajudamos", 5/12) + solução principal em
 * cartão de destaque (7/12) e soluções complementares em linhas clicáveis.
 * Fonte única: `PRODUCT_HUB_ITEMS`.
 */
const SegmentSolutions = ({
  eyebrow,
  title,
  description,
  paragraphs,
  hrefs,
  segmentSlug,
  tone = 'surface',
  id
}: SegmentSolutionsProps) => {
  const items = hrefs
    .map((href) => PRODUCT_HUB_ITEMS.find((item) => item.href === href))
    .filter((item): item is (typeof PRODUCT_HUB_ITEMS)[number] => Boolean(item))

  if (!items.length) return null
  const [lead, ...rest] = items
  const toPick = (item: (typeof items)[number]) => ({
    href: item.href,
    title: item.title,
    description: item.description,
    target: item.external ? '_blank' : undefined,
    tracking: {
      'data-cta-name': item.title,
      'data-cta-location': 'segment_solution',
      'data-tracking-label': `segmento_${segmentSlug ?? 'geral'}_${item.title}`
    }
  })

  return (
    <SegmentSection tone={tone} id={id} className="bc-solutions-composition">
      <div className="grid grid-cols-1 items-start gap-y-8 lg:grid-cols-12 lg:gap-x-11">
        <div className="lg:col-span-5">
          <SectionHeader eyebrow={eyebrow} title={title} variant="compact" level="mid" />
          {description ? (
            <p className="mt-3 t-body text-text-secondary">
              {description}
            </p>
          ) : null}
          {paragraphs?.length ? (
            <div className="mt-3 flex flex-col gap-3">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="t-body text-text-secondary"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <SolutionPick
            dark={tone === 'dark' || tone === 'brand'}
            lead={toPick(lead)}
            rest={rest.map(toPick)}
          />
        </div>
      </div>
    </SegmentSection>
  )
}


export default SegmentSolutions
