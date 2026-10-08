import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'
import Link from '@/components/Link'
import type { Cluster } from '@/data/content/clusters'
import type { Article } from '@/data/content/types'

type BlogEditorialHubProps = {
  /** Artigo protagonista (o mais recente). */
  featured: Article
  /** Rótulo do cluster do artigo em destaque. */
  featuredKind: string
  /** Título do bloco de destaque (varia com o volume publicado). */
  featureTitle: string
  /** Demais artigos reais — lista editorial abaixo do destaque. */
  rest: Array<Article>
  /** Temas editoriais (clusters reais). */
  clusters: Array<Cluster>
}

/** Texto público exclusivo do hub; taxonomia e metadados permanecem intactos. */
const publicDescriptions: Partial<Record<Cluster['id'], string>> = {
  'geracao-distribuida': 'Geração compartilhada, consórcio, créditos de energia e adesão sem instalação de placas no imóvel. Entenda as diferenças entre esses modelos de contratação.',
  'sustentabilidade-irec': 'Origem renovável da energia, certificação I-REC e uso da energia na agenda ambiental da empresa. Saiba o que a certificação comprova e quais são seus limites.',
  'economia-conta-de-energia': 'Leitura da fatura, componentes do custo e caminhos de redução conforme o perfil de consumo. Uma análise da conta ajuda a identificar as alternativas adequadas.',
  'usinas-arrendamento': 'Operação das usinas do grupo e arrendamento de áreas/usinas. Conheça a operação e as condições do serviço de arrendamento.'
}

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    : undefined

/**
 * Hub editorial do Blog (/conteudo/blog).
 *
 * Reúne o artigo protagonista e os temas editoriais em uma única composição:
 * card institucional de destaque (texto à esquerda, painel visual à direita)
 * e, na sequência imediata, a grade de temas. Conteúdo, links e tracking
 * preservados — a mudança é de arquitetura visual.
 */
const BlogEditorialHub = ({
  featured,
  featuredKind,
  featureTitle,
  rest,
  clusters
}: BlogEditorialHubProps) => {
  const meta = formatDate(featured.publishedAt)

  return (
    <section className="bc-blog-composition bc-blog-approved relative isolate overflow-hidden bg-surface-soft">
      {/* Uma unica composicao grafica por secao: o `radial` (sol) no canto
          inferior esquerdo saiu — a secao tambem carrega a foto do destaque. */}
      <BrandGraphic
        variant="loops"
        tone="teal"
        size="medium"
        position="top-right"
        opacity={0.05}
      />

      <div className="bc-container relative bc-level-mid">
        <div className="mx-auto max-w-[1180px]">
          {/* Destaque editorial — sem card: imagem + texto sobre a página. */}
          <article className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-9">
            <div className="flex min-w-0 flex-col justify-center">
              <p className="t-eyebrow text-bc-primary">Leitura recomendada</p>
              <h2 className="mt-2 t-h2 text-text-primary">
                {featureTitle}
              </h2>

              <p className="mt-5 t-caption font-semibold tracking-[0.14em] text-bc-primary/80">
                {featuredKind}
              </p>
              <h3 className="mt-3 max-w-[20ch] t-h2-support text-text-primary">
                {featured.title}
              </h3>

              <p className="mt-[18px] max-w-[560px] t-body-lg text-text-secondary">
                {featured.excerpt}
              </p>
              {meta ? (
                <p className="mt-2 t-body-sm text-text-secondary/80">{meta}</p>
              ) : null}

              <Link
                href={`/conteudo/blog/${featured.slug}`}
                data-cta-name={`blog_destaque_${featured.slug}`}
                className="bc-arrow-action mt-6 self-start t-action-label font-semibold tracking-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none"
              >
                Ler artigo
              </Link>
            </div>

            {/* Imagem protagonista — primeiro no mobile, à direita no desktop. */}
            <div className="relative order-first min-h-[240px] overflow-hidden rounded-[8px] bg-bc-dark lg:order-last lg:min-h-full">
              <img
                src={featured.image?.src ?? '/img/components/blog/blog-energia-solar-assinatura.webp'}
                alt={
                  featured.image?.alt ??
                  'Duas profissionais analisam um painel solar sobre a mesa enquanto uma delas segura uma lâmpada acesa'
                }
                width={featured.image?.width ?? 1200}
                height={featured.image?.height ?? 1200}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center"
              />
              <span
                aria-hidden="true"
                className="bc-ovl bc-ovl-institutional"
              />
            </div>

          </article>

          {/* Demais artigos reais */}
          {rest.length > 0 ? (
            <div className="mt-10">
              <h3 className="t-eyebrow border-b border-border-subtle pb-4 text-bc-primary">
                Outros artigos
              </h3>
              <ul className="flex flex-col">
                {rest.map((article) => (
                  <li key={article.slug} className="border-b border-border-subtle">
                    <Link
                      href={`/conteudo/blog/${article.slug}`}
                      data-cta-name={`blog_lista_${article.slug}`}
                      className="bc-arrow-action bc-arrow-action--row group flex items-start justify-between gap-6 py-5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-soft"
                    >
                      <span className="min-w-0">
                        <span className="block t-h4-display text-text-primary transition-colors duration-200 group-hover:text-bc-primary">
                          {article.title}
                        </span>
                        <span className="mt-2 block line-clamp-2 t-body-sm leading-[1.55] text-text-secondary">
                          {article.excerpt}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Temas editoriais */}
          <div className="mt-14 pt-2 lg:mt-20">
            <h2 className="t-h3 text-text-primary">
              Explore por tema
            </h2>
            <p className="mt-2.5 max-w-[560px] t-body-sm text-text-secondary">
              Explore os temas e as soluções de energia relacionados a cada assunto.
            </p>

            {/* Editorias como links textuais — sem caixas. */}
            <ul className="mt-6 divide-y divide-border-subtle border-t border-border-subtle">
              {clusters.map((cluster) => (
                <li key={cluster.cta.href + cluster.id}>
                  <Link
                    href={cluster.cta.href}
                    data-cta-name={`related_${cluster.cta.href}`}
                    className="bc-arrow-action bc-arrow-action--row group flex min-h-[44px] items-start justify-between gap-6 py-5 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none"
                  >
                    <span className="min-w-0">
                      <span className="t-h4-display text-text-primary transition-colors duration-200 group-hover:text-bc-primary">
                        {cluster.cta.label}
                      </span>
                      <span className="mt-1.5 block max-w-[56ch] t-body-sm leading-[1.55] text-text-secondary">
                        {publicDescriptions[cluster.id] ?? cluster.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogEditorialHub
