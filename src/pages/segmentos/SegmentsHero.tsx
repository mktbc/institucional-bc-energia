import { Breadcrumbs } from '@/components'
import { accentTitle } from '@/components/Editorial/accentTitle'
import Link from '@/components/Link'
import { Helmet } from 'react-helmet-async'

const SEGMENTOS_HERO_BG = '/img/pages/segmentos/hero-segmentos.webp'

/**
 * Hero de /segmentos, na mesma composição dos demais heros do site:
 * texto à esquerda sobre o campo navy e a fotografia (lâmpada ao pôr do
 * sol) à direita, recortada na diagonal do símbolo BC.
 */
const SegmentsHero = () => (
  <section
    aria-label="Segmentos atendidos"
    className="bc-reference-banner bc-page-hero bc-page-hero--photo relative overflow-hidden"
  >
    <Helmet>
      <link
        rel="preload"
        as="image"
        type="image/webp"
        href={SEGMENTOS_HERO_BG}
      />
    </Helmet>

    {/* Composição do hero da Home: fotografia à direita, recortada na
        diagonal, com o filete turquesa; texto sobre o campo navy. */}
    <div
      aria-hidden="true"
      className="bc-page-hero-media bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${SEGMENTOS_HERO_BG})` }}
    />
    <span aria-hidden="true" className="bc-page-hero-line" />

    <div className="bc-container relative">
      <div className="bc-banner-copy measure-intro pb-14 pt-20 sm:pt-24 lg:pb-20 lg:pt-32">
        <div className="hero-panel hero-panel--wide">
          <Breadcrumbs title="Segmentos atendidos" parent="Segmentos" variant="plain" />

          <h1 className="hero-title mt-5">
            {accentTitle('Soluções de energia para diferentes perfis de negócio')}
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
