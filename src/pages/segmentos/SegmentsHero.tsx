import { Breadcrumbs } from '@/components'
import Link from '@/components/Link'
import { Helmet } from 'react-helmet-async'

const SEGMENTOS_HERO_BG = '/img/pages/segmentos/hero-segmentos.webp'

/**
 * Hero full-width de /segmentos.
 * Imagem de fundo em largura total (lâmpada ao pôr do sol), texto à
 * esquerda com overlay direcional suave — mais denso atrás do conteúdo,
 * mais leve no restante, para preservar o impacto do laranja e da luz.
 */
const SegmentsHero = () => (
  <section
    aria-label="Segmentos atendidos"
    className="bc-reference-banner relative overflow-hidden bg-bc-dark bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${SEGMENTOS_HERO_BG})` }}
  >
    <Helmet>
      <link
        rel="preload"
        as="image"
        type="image/webp"
        href={SEGMENTOS_HERO_BG}
      />
    </Helmet>

    {/* Overlay direcional: leitura confortável à esquerda, lâmpada visível à direita */}
    <div
      aria-hidden="true"
      className="bc-ovl bc-ovl-readable-left"
    />
    <div
      aria-hidden="true"
      className="bc-ovl bc-ovl-dark"
    />

    <div className="bc-container relative">
      <div className="bc-banner-copy measure-intro pb-14 pt-20 sm:pt-24 lg:pb-20 lg:pt-32">
        <div className="hero-panel hero-panel--wide">
          <Breadcrumbs title="Segmentos atendidos" parent="Segmentos" variant="plain" />

          <h1 className="hero-title mt-5">
            Soluções de energia para diferentes perfis de negócio
          </h1>

          <p className="hero-description max-w-[48ch] !text-white/85">
            Encontre o segmento que mais se aproxima da sua operação.
          </p>

          <div data-cta-location="page_header" className="hero-actions">
            <Link
              href="#todos-os-segmentos"
              data-cta-name="Ver todos os segmentos"
              className="bc-arrow-action bc-arrow-action--dark whitespace-normal"
            >
              Ver todos os segmentos
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default SegmentsHero
