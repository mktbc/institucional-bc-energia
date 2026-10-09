import Link from '@/components/Link'
import BCIcon from '@/components/BCIcon/BCIcon'
import Reveal from '@/components/Reveal/Reveal'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import LogoStrip from '@/components/Customers/LogoStrip'
import { logos } from '@/components/Customers/Customers.data'
import { PRODUCT_HUB_ITEMS, SEGMENT_HUB_ITEMS, HEADER_CLIENT_LINK } from '@/config/navigation'
import { POWER_PLANTS } from '@/data/powerPlants'
import { COVERAGE_TEXT } from '@/data/coverage'
import { COMPANY_METRICS } from '@/data/companyMetrics'
import { getArticles } from '@/data/content/articles'
import { getEpisodes, getEpisodeLabel } from '@/data/content/episodes'
import HomeFaq from '../Sections/HomeFaq'
import { PILLARS } from '../Sections/positioning.data'
import Hero from '../Sections/Hero'
import CountUp from '@/components/Product/CountUp'
import PlantPanorama from './PlantPanorama'
import './home-design.css'

const CONSORTIUM = '/produtos/consorcio-bc-energia'
const ADHESION_URL = 'https://www.appenergia.com.br/Grupo_BC_Energia/'

/** Fotografias já publicadas de cada solução (miniatura que surge no hover). */
const SOLUTION_THUMBS: Record<string, string> = {
  '/produtos/mercado-livre-de-energia': '/img/global/mercado-livre-de-energia.webp',
  '/produtos/gestao-de-energia': '/img/global/gestao-de-energia.jpg',
  '/produtos/certificacao-renovavel-irec': '/img/pages/certificacao-renovavel-intro.webp',
  '/produtos/arrendamento-de-usinas': '/img/global/arrendamento-de-usinas.webp'
}

const SOLUTION_ORDER = [
  CONSORTIUM,
  '/produtos/mercado-livre-de-energia',
  '/produtos/gestao-de-energia',
  '/produtos/certificacao-renovavel-irec',
  '/produtos/arrendamento-de-usinas'
]

const SEGMENT_PORTRAITS: Array<[string, string]> = [
  ['/segmentos/agronegocio', '/img/reference-home/agronegocio.webp'],
  ['/segmentos/varejo', '/img/reference-home/varejo.webp'],
  ['/segmentos/residencial', '/img/pages/segmentos/residencial.webp'],
  ['/segmentos/condominio', '/img/pages/segmentos/condominio-v2.webp']
]

/** Marcas priorizadas na faixa da Home (lista completa permanece na fonte). */
const HOME_LOGOS = [...logos.filter((logo) => logo.featured), ...logos.filter((logo) => !logo.featured)]

const external = (isExternal?: boolean) => (isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})

const HomeEditorial = () => {
  const order = (href: string) => {
    const index = SOLUTION_ORDER.indexOf(href)
    return index < 0 ? SOLUTION_ORDER.length : index
  }
  const solutions = [...PRODUCT_HUB_ITEMS].sort((a, b) => order(a.href) - order(b.href))
  const consortium = solutions.find((item) => item.href === CONSORTIUM)
  const others = solutions.filter((item) => item.href !== CONSORTIUM)

  const portraits = SEGMENT_PORTRAITS.map(([href, image]) => ({ item: SEGMENT_HUB_ITEMS.find((entry) => entry.href === href), image }))
    .filter((entry): entry is { item: (typeof SEGMENT_HUB_ITEMS)[number]; image: string } => Boolean(entry.item))
  const otherSegments = SEGMENT_HUB_ITEMS.filter((item) => !SEGMENT_PORTRAITS.some(([href]) => href === item.href))

  const lead = COMPANY_METRICS.find((metric) => metric.id === 'economia')
  const metrics = lead ? [lead, ...COMPANY_METRICS.filter((metric) => metric.id !== lead.id)] : COMPANY_METRICS

  const episodes = getEpisodes()
  const articles = getArticles()
  const featured = episodes[0]

  return (
    <div className="hx-home">
      <Hero />

      {/* Prova de confiança logo depois do hero. */}
      <section className="hx-clients" aria-label="Empresas que confiam na BC Energia">
        <div className="hx-wrap hx-clients-row">
          <p>Empresas que confiam na BC Energia</p>
          <LogoStrip logos={HOME_LOGOS} label="Empresas que confiam na BC Energia" />
        </div>
      </section>

      {/* Soluções: Consórcio em destaque + índice numerado. */}
      <section className="hx-section" aria-labelledby="be-solutions-title">
        <div className="hx-wrap">
          <Reveal className="hx-split-head">
            <div>
              <p className="hx-eyebrow">Soluções para cada perfil</p>
              <h2 id="be-solutions-title" className="hx-h2">Inteligência para cada <em>perfil de consumo</em></h2>
            </div>
            <p className="hx-lead">Empresas, condomínios e residências: escolha o modelo mais adequado ao seu consumo e à sua conexão.</p>
          </Reveal>

          {consortium && (
            <Reveal as="article" className="hx-feature">
              <div className="hx-ph">
                <img src="/img/global/energia-por-assinatura.webp" alt="" width={1380} height={920} loading="lazy" decoding="async" />
              </div>
              <div className="hx-feature-copy">
                <p className="hx-eyebrow">Geração distribuída</p>
                <h3>{consortium.title}</h3>
                <p className="hx-claim">Até 25%</p>
                <p className="hx-claim-label">de economia</p>
                <p className="hx-feature-text">{consortium.description}</p>
                <div className="hx-feature-actions">
                  <Link className="hx-btn" href={ADHESION_URL} target="_blank" rel="noopener noreferrer" data-cta-name="home_solucoes_adesao" data-cta-location="solutions">
                    Fazer adesão gratuita
                  </Link>
                  <Link className="hx-link hx-link--light" href={consortium.href} data-cta-name={`home_solucoes_${consortium.title}`} data-cta-location="solutions">
                    Conhecer solução
                  </Link>
                </div>
              </div>
            </Reveal>
          )}

          <Reveal as="ol" className="hx-index">
            {others.map((item, index) => (
              <li key={item.href}>
                <Link href={item.href} {...external(item.external)} data-cta-name={`home_solucoes_${item.title}`} data-cta-location="solutions">
                  <span className="hx-index-n" aria-hidden="true">{String(index + 2).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {SOLUTION_THUMBS[item.href] ? (
                    <span className="hx-index-thumb hx-ph" aria-hidden="true">
                      <img src={SOLUTION_THUMBS[item.href]} alt="" width={400} height={250} loading="lazy" decoding="async" />
                    </span>
                  ) : <span aria-hidden="true" />}
                  <span className="hx-index-go" aria-hidden="true">{item.external ? '↗' : '→'}</span>
                </Link>
              </li>
            ))}
          </Reveal>

          <Link className="hx-link hx-index-all" href="/produtos" data-cta-name="home_solucoes_todas" data-cta-location="solutions">
            Ver todas as soluções
          </Link>
        </div>
      </section>

      {/* Resultados no verde institucional (gradiente oficial do manual). */}
      <section className="hx-section hx-results" aria-labelledby="home-results-title">
        <div className="hx-wrap">
          <Reveal className="hx-row-head">
            <div>
              <p className="hx-eyebrow">Resultados</p>
              <h2 id="home-results-title" className="hx-h2">Resultados que <em>movem o mercado.</em></h2>
            </div>
            <Link className="hx-link hx-link--light" href="/sobre/quem-somos" data-cta-name="home_numeros_quem_somos" data-cta-location="metrics">
              Conheça nossa história
            </Link>
          </Reveal>
          <dl className="hx-metrics">
            {metrics.map((metric, index) => (
              <Reveal key={metric.id} delay={index * 0.12}>
                <dt>{metric.label}</dt>
                <dd className="hx-metric-value"><CountUp value={metric.value} /></dd>
                {metric.description && <dd className="hx-metric-text">{metric.description}</dd>}
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Institucional: fotografia da equipe + pilares com a iconografia oficial. */}
      <section aria-labelledby="be-about-title">
        <div className="hx-cinema">
          <div className="hx-ph">
            <img src="/img/pages/FOTO_SOBRE_NOS_01.webp" alt="Equipe do Grupo BC Energia em evento institucional" width={1920} height={1280} loading="lazy" decoding="async" />
          </div>
          <Reveal className="hx-wrap hx-cinema-copy">
            <p className="hx-eyebrow">O Grupo BC Energia</p>
            <h2 id="be-about-title" className="hx-h2">Energia para gerar valor, <em>eficiência e crescimento.</em></h2>
          </Reveal>
        </div>
        <div className="hx-wrap hx-about-body">
          <Reveal className="hx-about">
            <p>O Grupo BC Energia desenvolve soluções em geração, gestão e comercialização de energia para empresas e consumidores que buscam economia, eficiência e sustentabilidade.</p>
            <div>
              <p>Atuamos em {COVERAGE_TEXT}, com escritórios em Goiânia e São Paulo.</p>
              <div className="hx-actions">
                <Link className="hx-btn hx-btn--navy" href="/sobre" data-cta-name="home_institucional_sobre">Conheça o Grupo BC Energia</Link>
                <Link className="hx-link" href="/sobre/quem-somos" data-cta-name="home_institucional_quem_somos">Quem somos</Link>
              </div>
            </div>
          </Reveal>
          <Reveal className="hx-split-head hx-pillars-head">
            <h2 className="hx-h2">Energia que transforma <em>consumo em resultado.</em></h2>
            <p className="hx-lead">Integramos tecnologia, pessoas e conhecimento para entregar soluções personalizadas, sustentáveis e alinhadas às necessidades de cada cliente.</p>
          </Reveal>
          <dl className="hx-pillars">
            {PILLARS.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.1}>
                <dt>
                  <BCIcon name={pillar.icon} size={44} />
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  {pillar.title}
                </dt>
                <dd>{pillar.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Segmentos: retratos + demais segmentos em linha. */}
      <section className="hx-section hx-soft" aria-labelledby="be-segments-title">
        <div className="hx-wrap">
          <Reveal className="hx-row-head">
            <div>
              <p className="hx-eyebrow">Segmentos</p>
              <h2 id="be-segments-title" className="hx-h2">A energia de <em>cada negócio.</em></h2>
            </div>
            <Link className="hx-link" href="/segmentos" data-cta-name="home_segmentos_todos">Conheça os segmentos atendidos</Link>
          </Reveal>
          <Reveal className="hx-portraits">
            {portraits.map(({ item, image }) => (
              <Link key={item.href} className="hx-portrait" href={item.href} data-cta-name={`home_segmentos_${item.title}`}>
                <span className="hx-ph"><img src={image} alt="" width={1000} height={1000} loading="lazy" decoding="async" /></span>
                <span className="hx-portrait-label">{item.title}</span>
              </Link>
            ))}
          </Reveal>
          <nav className="hx-chips" aria-label="Outros segmentos atendidos">
            {otherSegments.map((item) => (
              <Link key={item.href} href={item.href} data-cta-name={`home_segmentos_${item.title}`}>{item.title}</Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Estrutura própria: fotos reais dos complexos + ficha técnica. */}
      <PlantPanorama plants={POWER_PLANTS} />

      {/* Conhecimento. */}
      {(featured || articles.length > 0) && (
        <section className="hx-section" aria-labelledby="be-content-title">
          <div className="hx-wrap">
            <Reveal className="hx-row-head">
              <div>
                <p className="hx-eyebrow">Conhecimento</p>
                <h2 id="be-content-title" className="hx-h2">Conversas e análises <em>sobre energia.</em></h2>
              </div>
              <Link href="/conteudo" className="hx-link" data-cta-name="home_conteudo_explorar">Explorar conteúdos</Link>
            </Reveal>
            <div className="hx-content">
              {featured && (
                <Reveal as="article" className="hx-video">
                  <YouTubeEmbed height="auto" url={featured.embedUrl} title={getEpisodeLabel(featured)} className="hx-video-frame" />
                  <p className="hx-kicker">BC Cast #{String(featured.number).padStart(2, '0')}</p>
                  <h3>
                    <Link href={`/conteudo/bc-cast/${featured.slug}`} data-cta-name={`home_conteudo_destaque_${featured.slug}`}>{featured.title}</Link>
                  </h3>
                  <Link className="hx-link" href={`/conteudo/bc-cast/${featured.slug}`} data-cta-name="home_conteudo_ver_episodio" data-cta-location="knowledge">Ver episódio</Link>
                </Reveal>
              )}
              <Reveal className="hx-reading" delay={0.12}>
                {episodes.slice(1, 2).map((episode) => (
                  <article key={episode.slug}>
                    <p className="hx-kicker">BC Cast</p>
                    <h3><Link href={`/conteudo/bc-cast/${episode.slug}`} data-cta-name={`home_conteudo_episodio_${episode.slug}`}>{episode.title}</Link></h3>
                  </article>
                ))}
                {articles.slice(0, 2).map((article) => (
                  <article key={article.slug}>
                    <p className="hx-kicker">Blog</p>
                    <h3><Link href={`/conteudo/blog/${article.slug}`} data-cta-name={`home_conteudo_artigo_${article.slug}`}>{article.title}</Link></h3>
                    <p>{article.excerpt}</p>
                  </article>
                ))}
              </Reveal>
            </div>
          </div>
        </section>
      )}

      <HomeFaq />

      {/* Fechamento. */}
      <section className="hx-closing" aria-labelledby="be-conversion-title">
        <div className="hx-ph">
          <img src="/img/pages/produtos-lampada-energia.webp" alt="" width={1920} height={1280} loading="lazy" decoding="async" />
        </div>
        <Reveal className="hx-wrap hx-closing-copy">
          <p className="hx-eyebrow">Próximo passo</p>
          <h2 id="be-conversion-title" className="hx-h2">Descubra quanto a sua empresa pode <em>economizar em energia.</em></h2>
          <p className="hx-lead">Simulação gratuita e sem compromisso.</p>
          <div className="hx-actions">
            <Link href="/simulador-de-economia" className="hx-btn" data-cta-name="Simular minha economia" data-cta-location="page_closing">Simular minha economia</Link>
            <Link className="hx-btn-ghost" href={HEADER_CLIENT_LINK.href} target="_blank" rel="noopener noreferrer" data-cta-name="Falar com um consultor" data-cta-location="page_closing">Falar com um consultor</Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

export default HomeEditorial
