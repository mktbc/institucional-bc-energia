import { BCIcon } from '@/components/BCIcon'
import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'
import Link from '@/components/Link'
import type { HubCardItem } from '@/config/navigation'

type Group = {
  title: string
  description?: string
  items: Array<HubCardItem>
}

type AboutTopicsProps = {
  id?: string
  eyebrow: string
  title: string
  description: string
  groups: Array<Group>
  legal: {
    title: string
    description: string
    items: Array<HubCardItem>
  }
}

/**
 * Card editorial do índice institucional: ícone em container suave,
 * título e descrição em cartão de navegação integralmente clicável.
 */
const TopicItem = ({ item, ctaName }: { item: HubCardItem; ctaName: string }) => (
  <Link
    href={item.href}
    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    data-cta-name={ctaName}
    /* Linha editorial, não cartão: nove cartões idênticos lado a lado faziam
       a navegação institucional ler como painel administrativo. */
    className={[
      'bc-arrow-action bc-arrow-action--row group flex min-h-[72px] items-start gap-4 border-t border-border-subtle py-5',
      'transition-colors duration-200 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
      'motion-reduce:transition-none'
    ].join(' ')}
  >
    {item.icon || item.iconSrc ? (
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center text-bc-primary"
      >
        {item.icon ? (
          <BCIcon name={item.icon} size={22} />
        ) : (
          <img src={item.iconSrc} alt="" aria-hidden="true" width={22} height={22} />
        )}
      </span>
    ) : null}

    <span className="min-w-0 flex-1">
      <span className="block t-h4-display text-text-primary transition-colors duration-200 group-hover:text-bc-primary">
        {item.title}
      </span>
      {item.description ? (
        <span className="mt-1 block max-w-[46ch] t-body-sm leading-[1.55] text-text-secondary">
          {item.description}
        </span>
      ) : null}
    </span>
  </Link>
)

const GroupBlock = ({
  title,
  description,
  items,
  ctaPrefix
}: {
  title: string
  description?: string
  items: Array<HubCardItem>
  ctaPrefix: string
}) => (
  <div data-cta-location="hub_navigation">
    <span aria-hidden="true" className="bc-accent-rule mb-4" />
    <h3 className="t-h4-display tracking-[0.02em] text-text-primary">
      {title}
    </h3>
    {description ? (
      <p className="mt-2 max-w-[62ch] t-body-sm leading-[1.65] text-text-secondary">{description}</p>
    ) : null}

    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
      {items.map((item) => (
        <TopicItem key={item.href} item={item} ctaName={`${ctaPrefix}${item.title}`} />
      ))}
    </div>
  </div>
)

/**
 * Seção "Onde aprofundar" (/sobre) — central de navegação institucional
 * em blocos editoriais. Mesmos destinos, textos e tracking.
 */
const AboutTopics = ({ id, eyebrow, title, description, groups, legal }: AboutTopicsProps) => (
  <section id={id} className="bc-topic-composition relative overflow-hidden bg-surface-soft">
    {/* PRANCHETA 11 (chevrons) — único grafismo da seção, bem discreto. */}
    <BrandGraphic
      variant="chevrons"
      tone="teal"
      className="-top-16 right-[-14%] hidden h-[520px] w-[860px] opacity-[0.04] md:block lg:right-[-10%] lg:opacity-[0.06]"
    />

    <div className="bc-container relative bc-level-mid">
      <div className="w-full">
        <header className="max-w-[58ch]">
          <p className="t-eyebrow mb-2 text-bc-primary">{eyebrow}</p>
          <h2 className="t-h2 text-text-primary">{title}</h2>
          <p className="mt-3 max-w-[560px] t-body text-text-secondary">
            {description}
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-12 lg:mt-14 lg:gap-14">
          {groups.map((group) => (
            <GroupBlock
              key={group.title}
              title={group.title}
              description={group.description}
              items={group.items}
              ctaPrefix="hub_sobre_"
            />
          ))}

          <GroupBlock
            title={legal.title}
            description={legal.description}
            items={legal.items}
            ctaPrefix="hub_sobre_legal_"
          />
        </div>
      </div>
    </div>
  </section>
)

export default AboutTopics
