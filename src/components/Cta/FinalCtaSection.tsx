import Link from '@/components/Link'
import Reveal from '@/components/Reveal/Reveal'

import type { SectionGraphic } from '@/components/Product/ProductSection'

export type FinalCtaAction = {
  label: string
  href: string
  target?: string
  rel?: string
  ariaLabel?: string
}

export type FinalCtaSectionProps = {
  eyebrow?: string
  title: string
  /** Segunda linha do H2 (quebra editorial controlada). */
  titleLine2?: string
  description?: string
  /** Texto curto do bloco de ação (coluna direita). */
  actionText?: string
  primaryCta: FinalCtaAction
  secondaryCta?: FinalCtaAction
  /**
   * @deprecated Aceito para compatibilidade das chamadas existentes, mas não
   * é mais renderizado: o fechamento passou a ser fotografia-zero e
   * grafismo-zero (ver comentário do componente). Nenhuma rota precisou mudar.
   */
  graphic?: SectionGraphic
  /** Valor de `data-cta-location` preservado por rota (tracking). */
  location?: string
  /** Conteúdo complementar abaixo do grid (ex.: faixa "Conheça também"). */
  footerSlot?: React.ReactNode
  id?: string
  className?: string
}

/**
 * Fechamento comercial de página — padrão único do site.
 *
 * Composição: painel navy sólido, contido na largura do conteúdo e assentado
 * sobre a superfície clara da página. Três razões:
 *
 * 1. A faixa clara acima e abaixo separa o CTA do rodapé (também navy), que
 *    antes se fundia com ele em um único bloco escuro.
 * 2. Navy sólido no lugar do gradiente diagonal + overlay radial + grafismo:
 *    a hierarquia passa a vir de tipografia e espaço, não de camadas.
 * 3. Turquesa só no eyebrow e no hover do link; amarelo só no CTA.
 *
 * Textos, rotas, `data-cta-name` e `data-cta-location` chegam por props — o
 * componente muda apenas composição e tipografia.
 */
const FinalCtaSection = ({
  eyebrow,
  title,
  titleLine2,
  description,
  actionText,
  primaryCta,
  secondaryCta,
  location = 'page_closing',
  footerSlot,
  id,
  className = ''
}: FinalCtaSectionProps) => (
  <section
    id={id}
    data-cta-location={location}
    className={`flow-final-cta bg-surface bc-level-mid ${className}`}
  >
    <div className="bc-container">
      <Reveal className="rounded-card bg-surface-dark px-6 py-12 text-text-inverse sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:gap-14">
          <div>
            {eyebrow ? <p className="t-eyebrow text-bc-cyan">{eyebrow}</p> : null}

            <h2 className="t-h2-lead mt-3 max-w-[26ch] text-balance text-text-inverse">
              {title}
              {titleLine2 ? <span className="block">{titleLine2}</span> : null}
            </h2>

            {description ? (
              <p className="mt-5 max-w-[52ch] t-body-lg text-text-inverse/80">
                {description}
              </p>
            ) : null}
          </div>

          <div className="w-full border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            {actionText ? (
              <p className="t-body-sm text-text-inverse/80">{actionText}</p>
            ) : null}

            <Link
              href={primaryCta.href}
              target={primaryCta.target}
              rel={primaryCta.rel}
              aria-label={primaryCta.ariaLabel}
              data-cta-name={primaryCta.label}
              className={`${actionText ? 'mt-5' : ''} flex min-h-[52px] w-full items-center justify-center gap-2 rounded-md bg-bc-accent px-6 text-center t-label font-bold uppercase tracking-[0.04em] text-surface-dark transition-colors duration-fast ease-bc hover:brightness-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60`}
            >
              {primaryCta.label}
            </Link>

            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                target={secondaryCta.target}
                rel={secondaryCta.rel}
                aria-label={secondaryCta.ariaLabel}
                data-cta-name={secondaryCta.label}
                className="bc-arrow-action bc-arrow-action--dark mt-4"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>

        {footerSlot ? (
          <div className="mt-10 border-t border-white/15 pt-8">{footerSlot}</div>
        ) : null}
      </Reveal>
    </div>
  </section>
)

export default FinalCtaSection
