import Link from '@/components/Link'
import { SEGMENT_HUB_ITEMS } from '@/config/navigation'
import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'

/**
 * Momento 3 — Índice completo dos 11 segmentos.
 *
 * Índice editorial, não uma grade de cards: cada segmento é uma linha com
 * filete superior, numeral de dois dígitos (mesma linguagem dos passos de
 * produto) e o nome. Antes eram 11 cartões brancos com borda, sombra, ícone e
 * seta — quatro invólucros para um link. A linha inteira continua clicável,
 * com a mesma altura de toque, o mesmo destino e o mesmo `data-cta-name`.
 */
const SegmentsIndex = () => (
  <section
    id="todos-os-segmentos"
    className="bc-segment-index relative isolate scroll-mt-24 overflow-hidden bg-surface-soft bc-level-mid"
  >
    {/* PRANCHETA 11 (chevrons) — navegação/direção. Microapoio lateral. */}
    <BrandGraphic variant="chevrons" tone="teal" size="small" position="bottom-left" opacity={0.05} />
    <div className="relative mx-auto w-full max-w-[1280px] px-6 lg:px-10">
      <div>
        {/* VISUAL SYSTEM 06 — cabeçalho no topo, índice logo abaixo. */}
        <header className="max-w-[46rem]">
          <span className="t-caption mb-3 block font-semibold text-bc-primary">
            Índice de segmentos
          </span>
          <h2 className="t-h2 text-text-primary">
            Todos os segmentos
          </h2>
          <p className="mt-3.5 max-w-[46rem] t-body-lg text-text-secondary">
            Explore todos os perfis atendidos pela BC Energia.
          </p>
        </header>

        {/* Índice — largura útil, imediatamente abaixo do cabeçalho */}
        <nav aria-label="Todos os segmentos atendidos" className="mt-7 lg:mt-8">
          <ul
            data-cta-location="hub_navigation"
            className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3"
          >
            {SEGMENT_HUB_ITEMS.map((item, index) => (
              <li key={item.href} className="border-t border-border-subtle">
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  data-cta-name={`hub_segmentos_${item.title}`}
                  className="bc-arrow-action bc-arrow-action--row group flex min-h-[64px] items-baseline gap-4 py-4 text-text-primary transition-colors duration-200 ease-bc hover:text-bc-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-display text-[0.9375rem] font-bold tabular-nums text-bc-primary"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1 t-h4-display">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  </section>
)

export default SegmentsIndex
