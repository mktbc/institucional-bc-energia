import { PageHeader, RelatedLinks } from '@/components'
import { ContentEmptyState, ContentSection } from '@/components/Content'
import Link from '@/components/Link'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import { CLUSTERS } from '@/data/content/clusters'
import { getEpisodeLabel, getEpisodes } from '@/data/content/episodes'

/**
 * Hub do BC Cast — /conteudo/bc-cast (VISUAL 15)
 *
 * Contexto do projeto em cabeçalho dividido, episódio mais recente em cartão
 * navy (vídeo + ficha, facade sem iframe no load), episódios anteriores em
 * cards com miniatura e temas no padrão de lista das demais páginas.
 *
 * Fonte: src/data/content/episodes.ts. Indexação: noindex,follow.
 */
const videoId = (url: string) => url.match(/\/embed\/([^?&/]+)/)?.[1] ?? ''

const shortLabel = (number?: number) =>
  number ? `BC Cast #${String(number).padStart(2, '0')}` : 'BC Cast'

const BcCast = () => {
  const episodes = getEpisodes()
  const [featured, ...rest] = episodes

  const guestsOf = (guests?: Array<{ name: string; role?: string }>) =>
    guests?.length
      ? `Com ${guests.map((guest) => (guest.role ? `${guest.name}, ${guest.role}` : guest.name)).join(' e ')}`
      : undefined

  return (
    <>
      <PageHeader
        title="BC Cast"
        eyebrow="Conteúdo"
        description="Conversas do Grupo BC Energia com lideranças sobre energia, mercado e desenvolvimento econômico."
        category="Conteúdo"
        align="left"
        bgImage="/img/pages/contact.webp"
      />

      {episodes.length === 0 ? (
        <ContentSection>
          <ContentEmptyState
            title="Os episódios estarão disponíveis aqui"
            description="Enquanto isso, conheça as soluções de energia do Grupo BC Energia."
            links={[
              { label: 'Mercado Livre de Energia', href: CLUSTERS['mercado-livre'].moneyPath },
              {
                label: 'Gestão de energia para empresas',
                href: CLUSTERS['gestao-de-energia'].moneyPath
              }
            ]}
          />
        </ContentSection>
      ) : (
        <>
          <ContentSection id="sobre-o-bc-cast">
            <div className="bc-split-head">
              <SectionHeader eyebrow="Sobre o projeto" title="O que é o BC Cast" />
              <div className="bc-split-aside">
                <p>
                  Série de conversas do Grupo BC Energia com lideranças do setor produtivo e do setor
                  elétrico. Energia tratada como fator de custo e de competitividade, sem jargão e sem
                  promessa comercial.
                </p>
              </div>
            </div>

            {/* Episódio em destaque: vídeo (facade, sem iframe no load) e ficha
                no mesmo cartão navy da Home, com topo e base alinhados. */}
            <article className="bc-cast-feature">
              <div className="bc-cast-feature-media">
                <YouTubeEmbed height="auto" url={featured.embedUrl} title={getEpisodeLabel(featured)} />
              </div>
              <div className="bc-cast-feature-copy">
                <p className="bc-cast-kicker">{shortLabel(featured.number)}</p>
                <h3>{featured.title}</h3>
                {guestsOf(featured.guests) ? <p className="bc-cast-meta">{guestsOf(featured.guests)}</p> : null}
                <Link
                  href={`/conteudo/bc-cast/${featured.slug}`}
                  className="bc-cast-cta"
                  data-cta-name={`bc_cast_destaque_${featured.slug}`}
                  data-cta-location="content_section"
                >
                  Ver episódio
                </Link>
              </div>
            </article>

            {rest.length > 0 ? (
              <div className="bc-cast-list">
                <p className="t-eyebrow text-bc-primary">Episódios anteriores</p>
                <ul>
                  {rest.map((episode) => (
                    <li key={episode.slug}>
                      <Link
                        href={`/conteudo/bc-cast/${episode.slug}`}
                        className="bc-cast-card grid"
                        data-cta-name={`bc_cast_lista_${episode.slug}`}
                        data-cta-location="content_section"
                      >
                        <span className="bc-cast-thumb">
                          <img
                            src={`https://i.ytimg.com/vi/${videoId(episode.embedUrl)}/hqdefault.jpg`}
                            alt=""
                            width={480}
                            height={360}
                            loading="lazy"
                            decoding="async"
                          />
                          <span aria-hidden="true" className="bc-cast-play" />
                        </span>
                        <span className="bc-cast-card-copy">
                          <span className="bc-cast-kicker">{shortLabel(episode.number)}</span>
                          <span className="bc-cast-card-title">{episode.title}</span>
                          {guestsOf(episode.guests) ? (
                            <span className="bc-cast-meta">{guestsOf(episode.guests)}</span>
                          ) : null}
                          <span className="bc-cast-more">Ver episódio</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </ContentSection>
        </>
      )}

      <RelatedLinks
        variant="editorial"
        eyebrow="Temas"
        title="Temas tratados no BC Cast"
        description="Aprofunde nos assuntos dos episódios pelas páginas de solução."
        items={[
          {
            label: CLUSTERS['mercado-livre'].cta.label,
            href: CLUSTERS['mercado-livre'].cta.href,
            description: CLUSTERS['mercado-livre'].description
          },
          {
            label: CLUSTERS['gestao-de-energia'].cta.label,
            href: CLUSTERS['gestao-de-energia'].cta.href,
            description: CLUSTERS['gestao-de-energia'].description
          },
          {
            label: 'Soluções de energia para o agronegócio',
            href: '/segmentos/agronegocio',
            description: 'Irrigação, sazonalidade e custo de energia na operação rural.'
          }
        ]}
      />
    </>
  )
}

export default BcCast
