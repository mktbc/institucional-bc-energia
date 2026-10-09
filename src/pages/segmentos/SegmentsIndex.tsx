import Image from '@/components/Image'
import Link from '@/components/Link'
import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { SEGMENT_HUB_ITEMS } from '@/config/navigation'
import { SEGMENT_IMAGE } from './SegmentsShowcase'

const IMAGE_POSITION_CLASSES: Record<string, string> = {
  '/segmentos/condominio': 'object-[center_60%]',
  '/segmentos/saude': 'object-[center_30%]',
  '/segmentos/lazer': 'object-[center_45%]',
  '/segmentos/residencial': 'object-[center_55%]',
  '/segmentos/varejo': 'object-[center_55%]'
}

/**
 * Índice completo dos segmentos: dois destaques largos e os demais em grade
 * regular de três colunas (2 + 9 = 11, sem vãos). Cada cartão traz o nome,
 * a descrição já publicada no menu e a seta de navegação.
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
      <div className="bc-split-head">
        <SectionHeader eyebrow="Índice de segmentos" title="Energia para diferentes realidades" />
        <div className="bc-split-aside">
          <p>Explore todos os perfis atendidos pela BC Energia.</p>
          <p className="bc-seg-count">{SEGMENT_HUB_ITEMS.length} segmentos atendidos</p>
        </div>
      </div>

      <nav aria-label="Todos os segmentos atendidos">
        <ul data-cta-location="hub_navigation" className="bc-seg-grid">
          {SEGMENT_HUB_ITEMS.map((item, index) => {
            const image = SEGMENT_IMAGE[item.href]

            return (
              <li key={item.href} className={index < 2 ? 'bc-seg-feature' : undefined}>
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  data-cta-name={`hub_segmentos_${item.title}`}
                  className="bc-seg-card grid"
                >
                  {image ? (
                    <Image
                      src={image}
                      alt=""
                      aria-hidden="true"
                      width={800}
                      height={600}
                      loading="lazy"
                      className={`bc-seg-img ${IMAGE_POSITION_CLASSES[item.href] ?? 'object-center'}`}
                    />
                  ) : null}
                  <span className="bc-seg-body">
                    <span className="bc-seg-text">
                      <h3>{item.title}</h3>
                      {item.description ? <p>{item.description}</p> : null}
                    </span>
                    <span className="bc-seg-go" aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  </section>
)

export default SegmentsIndex
