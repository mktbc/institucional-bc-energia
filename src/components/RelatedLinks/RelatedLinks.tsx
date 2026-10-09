import { HubCard, HubCardGrid } from '@/components/HubCard'
import Link from '@/components/Link'

import { RelatedLinksProps } from './RelatedLinks.type'

/**
 * Bloco de linking interno com âncoras descritivas.
 * Usado por soluções, segmentos e páginas regionais para conectar os clusters
 * (solução ↔ segmento ↔ região ↔ conversão) sem "saiba mais" genérico.
 *
 * `variant="cards"` reutiliza o HubCard (mesmo sistema de card dos hubs),
 * preservando os mesmos destinos e as âncoras descritivas em `aria-label`.
 */
const RelatedLinks = ({
  title,
  description,
  eyebrow,
  items,
  headingLevel = 'h2',
  className = '',
  variant = 'list',
  columns = 3
}: RelatedLinksProps) => {
  if (!items?.length) return null
  const Heading = headingLevel

  if (variant === 'cards') {
    return (
      <section
        aria-label={title}
        className={`bg-surface-muted/50 bc-level-mid ${className}`}
        data-testid="related-links"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {eyebrow ? (
              <span className="block t-eyebrow tracking-[0.16em] text-bc-primary">
                {eyebrow}
              </span>
            ) : null}
            <Heading className="mt-2 t-h2-support text-bc-dark">
              {title}
            </Heading>
            {description ? (
              <p className="mt-5 t-body-lg text-text-secondary">{description}</p>
            ) : null}
          </div>

          <HubCardGrid className="mt-7" columns={columns}>
            {items.map((item) => (
              <HubCard
                key={item.href}
                title={item.shortLabel ?? item.label}
                description={item.description}
                href={item.href}
                icon={item.icon}
                eyebrow={item.eyebrow}
                ariaLabel={item.shortLabel ? item.label : undefined}
                external={item.target === '_blank'}
                accent={item.accent}
                ctaLabel={item.ctaLabel ?? 'Explorar'}
                trackingLabel={`related_${item.href}`}
              />
            ))}
          </HubCardGrid>
        </div>
      </section>
    )
  }

  if (variant === 'index-cards') {
    return (
      <section
        aria-label={title}
        className={`bg-surface-muted/60 py-[72px] ${className}`.trim()}
        data-testid="related-links"
      >
        <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-8">
          <div className="measure-intro">
            {eyebrow ? <p className="t-eyebrow">{eyebrow}</p> : null}
            <span aria-hidden="true" className="bc-accent-rule" />
            <Heading className="mt-4 t-h2-support text-bc-dark">
              {title}
            </Heading>
            {description ? (
              <p className="mt-3 text-body-sm leading-[1.6] text-text-secondary">{description}</p>
            ) : null}
          </div>

          <ul className="mt-7 grid gap-x-6 gap-y-5 md:grid-cols-2">
            {items.map((item) => (
              <li key={item.href} className="h-full">
                <Link
                  href={item.href}
                  target={item.target}
                  aria-label={item.shortLabel ? item.label : undefined}
                  data-cta-name={`related_${item.href}`}
                  className="bc-arrow-action bc-arrow-action--row bc-focus-ring group flex h-full min-h-[118px] flex-col justify-between rounded-[10px] border border-border-subtle bg-surface-card p-[22px] shadow-sm transition-[transform,colors,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-bc-primary/25 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="t-body-sm font-semibold uppercase tracking-[0.01em] text-bc-dark transition-colors duration-200 group-hover:text-bc-primary">
                      {item.shortLabel ?? item.label}
                    </span>
                  </span>
                  {item.description ? (
                    <span className="mt-2.5 block max-w-[46ch] t-body-sm leading-[1.6] text-text-secondary">
                      {item.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  if (variant === 'index') {
    return (
      <section
        aria-label={title}
        className={`bc-level-support bg-surface ${className}`.trim()}
        data-testid="related-links"
      >
        <div className="bc-container">
          <div className="max-w-2xl">
            {eyebrow ? <p className="t-eyebrow">{eyebrow}</p> : null}
            <Heading className="t-h3 mt-2 text-text-primary">{title}</Heading>
            {description ? (
              <p className="t-body-sm mt-3 text-text-secondary">{description}</p>
            ) : null}
          </div>

          <ul className="mt-8 grid gap-x-8 md:grid-cols-2">
            {items.map((item) => (
              <li key={item.href} className="border-t border-border-subtle">
                <Link
                  href={item.href}
                  target={item.target}
                  aria-label={item.shortLabel ? item.label : undefined}
                  data-cta-name={`related_${item.href}`}
                  className="bc-arrow-action bc-arrow-action--row bc-focus-ring group flex min-h-[44px] items-start justify-between gap-6 py-5 text-text-primary transition-colors duration-200 hover:text-bc-primary motion-reduce:transition-none"
                >
                  <span>
                    <span className="block t-h4-display">
                      {item.shortLabel ?? item.label}
                    </span>
                    {item.description ? (
                      <span className="mt-1.5 block max-w-[46ch] text-body-sm leading-relaxed text-text-secondary">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  if (variant === 'editorial') {
    /**
     * "Para quem esta solução faz sentido" e afins.
     *
     * O título era renderizado como eyebrow de 13px em cinza e os destinos em
     * 15px, então a seção lia como uma lista de links auxiliares. Agora o
     * título é um título de seção de verdade, os destinos ganham escala e a
     * linha de cada um é a área de toque — continua índice editorial, sem card.
     * O `eyebrow` recebido pelas páginas era descartado e passou a aparecer.
     */
    return (
      <nav
        aria-label={title}
        className={`bc-level-mid bg-surface ${className}`.trim()}
        data-testid="related-links"
      >
        {/* Título à esquerda e destinos à direita: antes o título ocupava uma
            faixa inteira e deixava metade da largura vazia ao lado. */}
        <div className="bc-container grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {eyebrow ? <p className="t-eyebrow">{eyebrow}</p> : null}
            <Heading className="mt-2 t-h2-support text-text-primary">{title}</Heading>
            {description ? (
              <p className="mt-3 max-w-[42ch] t-body text-text-secondary">{description}</p>
            ) : null}
          </div>

          <ul
            className={`grid gap-x-10 self-center lg:col-span-8 ${items.length > 1 ? 'sm:grid-cols-2' : ''}`}
          >
            {items.map((item) => (
              <li key={item.href} className="border-t border-border-subtle">
                <Link
                  href={item.href}
                  target={item.target}
                  className="bc-arrow-action bc-arrow-action--row bc-focus-ring group flex min-h-[56px] items-start justify-between gap-5 py-4 text-text-primary transition-colors duration-200 hover:text-bc-primary motion-reduce:transition-none"
                >
                  <span className="min-w-0">
                    <span className="block t-h4-display">{item.label}</span>
                    {/* Contexto do destino: o link explica para onde leva. */}
                    {item.description ? (
                      <span className="mt-1 block max-w-[42ch] t-body-sm text-text-secondary">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    )
  }

  /**
   * Variante padrao ("Proximos passos"), usada em 7 rotas.
   *
   * Era uma grade de 3 colunas de blocos cinza com raio — CARD + CARD + CARD
   * para o que e um indice de destinos. Passa a ser lista editorial em 2
   * colunas, com filete e a linha inteira como area de toque. Mesmos destinos,
   * mesmos textos, mesmo `target`.
   */
  return (
    <nav
      aria-label={title}
      className={`container mx-auto px-6 bc-level-mid ${className}`}
      data-testid="related-links"
    >
      <div className="max-w-[46rem]">
        <Heading className="t-h3-editorial text-bc-dark">{title}</Heading>
        {description && (
          <p className="mt-3 max-w-[58ch] t-body-lg text-text-secondary">{description}</p>
        )}
      </div>

      <ul className={`mt-8 grid gap-x-12 ${items.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {items.map((item) => (
          <li key={item.href} className="border-t border-border-subtle">
            <Link
              href={item.href}
              target={item.target}
              className="bc-arrow-action bc-arrow-action--row bc-focus-ring group flex min-h-[60px] items-start justify-between gap-6 py-4 text-text-primary transition-colors duration-200 hover:text-bc-primary motion-reduce:transition-none"
            >
              <span className="min-w-0">
                <span className="block t-h4-display">{item.label}</span>
                {item.description && (
                  <span className="mt-1.5 block max-w-[46ch] t-body-sm text-text-secondary">
                    {item.description}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default RelatedLinks
