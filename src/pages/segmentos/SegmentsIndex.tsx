import Image from '@/components/Image'
import Link from '@/components/Link'
import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'
import { SEGMENT_HUB_ITEMS } from '@/config/navigation'
import { SEGMENT_IMAGE } from './SegmentsShowcase'

const EDITORIAL_SPAN_CLASSES = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-5',
  'lg:col-span-3',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4'
]

/**
 * Mosaico: a variação vem da largura (spans acima), não da altura. Alturas
 * diferentes dentro da mesma linha deixavam vãos de até ~100px sob as fotos
 * menores. No desktop cada linha tem altura única; abaixo disso, 4:3.
 */
const imageFrameClass = (index: number) =>
  index < 2 ? 'aspect-[4/3] lg:aspect-auto lg:h-[clamp(340px,30vw,440px)]' : 'aspect-[4/3] lg:aspect-auto lg:h-[clamp(240px,21vw,300px)]'

const IMAGE_POSITION_CLASSES: Record<string, string> = {
  '/segmentos/condominio': 'object-[center_60%]',
  '/segmentos/saude': 'object-[center_30%]',
  '/segmentos/lazer': 'object-[center_45%]',
  '/segmentos/residencial': 'object-[center_55%]',
  '/segmentos/varejo': 'object-[center_55%]'
}

/**
 * Índice completo dos segmentos em uma composição editorial com fotos.
 */
const SegmentsIndex = () => (
  <section
    id="todos-os-segmentos"
    className="bc-segment-index bc-level-mid relative isolate scroll-mt-24 overflow-hidden bg-surface-soft"
  >
    {/* PRANCHETA 11 (chevrons) — navegação/direção. Microapoio lateral. */}
    <BrandGraphic
      variant="chevrons"
      tone="teal"
      size="small"
      position="bottom-left"
      opacity={0.05}
    />
    <div className="bc-container relative">
      <div>
        {/* VISUAL SYSTEM 06 — cabeçalho no topo, índice logo abaixo. */}
        <header className="max-w-[46rem]">
          <span className="t-caption mb-3 block font-semibold text-bc-primary">
            Índice de segmentos
          </span>
          <h2 className="t-h2 text-text-primary">Energia para diferentes realidades</h2>
          <p className="t-body-lg mt-3.5 max-w-[46rem] text-text-secondary">
            Explore todos os perfis atendidos pela BC Energia.
          </p>
        </header>

        <nav aria-label="Todos os segmentos atendidos" className="mt-8 lg:mt-10">
          <ul
            data-cta-location="hub_navigation"
            className="grid grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10"
          >
            {SEGMENT_HUB_ITEMS.map((item, index) => {
              const isFeature = index < 2
              const image = SEGMENT_IMAGE[item.href]

              return (
                <li key={item.href} className={EDITORIAL_SPAN_CLASSES[index] ?? 'lg:col-span-4'}>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    data-cta-name={`hub_segmentos_${item.title}`}
                    className="group block min-h-[44px] text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 motion-reduce:transition-none"
                  >
                    {image && (
                      <span
                        className={[
                          'relative block w-full overflow-hidden rounded-card border border-border-subtle bg-surface-muted transition-colors group-hover:border-bc-primary group-focus-visible:border-bc-primary',
                          imageFrameClass(index)
                        ].join(' ')}
                      >
                        <Image
                          src={image}
                          alt=""
                          aria-hidden="true"
                          fill
                          loading="lazy"
                          className={[
                            'h-full w-full object-cover transition-transform duration-300 ease-bc group-hover:scale-[1.02] group-focus-visible:scale-[1.02] motion-reduce:transition-none',
                            IMAGE_POSITION_CLASSES[item.href] ?? 'object-center'
                          ].join(' ')}
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-bc-dark/85 via-bc-dark/15 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                        />
                        <span className="absolute inset-x-0 bottom-0 flex min-h-[88px] items-end justify-between gap-3 p-4 text-white sm:min-h-[104px] sm:p-5 lg:p-6">
                          <span
                            className={[
                              'max-w-[20ch] font-sans font-semibold leading-tight text-white',
                              isFeature
                                ? 'text-[clamp(1.375rem,2.2vw,2rem)]'
                                : 'text-[clamp(1.125rem,1.6vw,1.5rem)]'
                            ].join(' ')}
                          >
                            {item.title}
                          </span>
                          <span
                            aria-hidden="true"
                            className="mb-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-white/45 text-xl leading-none text-white transition-colors group-hover:border-bc-cyan group-hover:bg-bc-cyan/15 group-focus-visible:border-bc-cyan group-focus-visible:bg-bc-cyan/15 motion-reduce:transition-none"
                          >
                            ↗
                          </span>
                        </span>
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  </section>
)

export default SegmentsIndex
