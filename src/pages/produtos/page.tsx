import {
  ClosingCta,
  Customers,
  FormEmbed,
  PageHeader,
  RelatedLinks,
  SectionHeader
} from '@/components'
import { Container } from '@/components/Container'
import Link from '@/components/Link'
import { PRODUCT_HUB_ITEMS } from '@/config/navigation'
import { PRODUCT_RELATED } from '@/pages/produtos/relatedLinks.data'
import BrandGraphic from '@/components/BrandGraphic/BrandGraphic'

/**
 * VISUAL 11 — hub /produtos.
 *
 * Hero banner, 1 solução protagonista e as demais como lista editorial.
 * O protagonista segue a mesma prioridade comercial da vitrine da Home
 * (Consórcio BC Energia — ver docs/EDITORIAL-ENERGY-PREMIUM.md); a ordem das
 * demais é a da fonte de navegação. Rotas, títulos, descrições e links vêm de
 * `PRODUCT_HUB_ITEMS`, sem conteúdo novo.
 */

/** Imagens reais já publicadas, por destino. */
const PRODUCT_IMAGES: Record<string, string> = {
  '/produtos/mercado-livre-de-energia': '/img/pages/produtos-lampada-energia.webp',
  '/produtos/consorcio-bc-energia': '/img/pages/consorcio-intro.webp',
  // gestao-de-energia-intro.webp tem texto embutido ("até 26%"): não usar.
  '/produtos/gestao-de-energia': '/img/pages/gestao-de-energia-lead.webp',
  '/produtos/certificacao-renovavel-irec': '/img/pages/certificacao-renovavel-intro.webp',
  '/produtos/arrendamento-de-usinas': '/img/pages/arrendamento-de-usinas-intro.webp'
}

/** Mesma prioridade da vitrine da Home (`src/pages/home/editorial/HomeEditorial.tsx`). */
const FEATURED_HREF = '/produtos/consorcio-bc-energia'

const featured =
  PRODUCT_HUB_ITEMS.find((item) => item.href === FEATURED_HREF) ?? PRODUCT_HUB_ITEMS[0]
const others = PRODUCT_HUB_ITEMS.filter((item) => item !== featured)

/**
 * O portfólio visual usa só as soluções que já possuem fotografia própria
 * publicada. As demais (hoje, a Consultoria Jurídica, que é um domínio
 * externo) seguem como linha editorial — nenhuma imagem é reaproveitada de
 * outra solução para preencher a grade.
 */
const othersWithImage = others.filter((item) => PRODUCT_IMAGES[item.href])
const othersWithoutImage = others.filter((item) => !PRODUCT_IMAGES[item.href])

const Page = () => (
  <div className="bc-products-approved">
    <PageHeader
      align="left"
      variant="banner"
      flush
      eyebrowRule={false}
      title="Soluções em energia para cada"
      titleLine2="perfil de consumo"
      description="Conheça as soluções do Grupo BC Energia e encontre a alternativa mais adequada ao perfil de consumo da sua empresa, condomínio ou residência."
      bgImage="/img/global/arrendamento-de-usinas.webp"
      category="Produtos"
      cta={{ label: 'Enviar minha conta para análise', href: '#contato' }}
      secondaryCta={{ label: 'Ver soluções', href: '#solucoes' }}
    />


    <section data-layout="portfolio" id="solucoes" className="relative isolate overflow-hidden bg-surface text-text-primary">
      {/* ELEMENTO 01 (diagonais) — portfólio/energia. Recorte superior direito. */}
      <BrandGraphic variant="diagonal" tone="teal" size="medium" position="top-right" opacity={0.05} />
      <Container className="relative bc-level-mid">
        <SectionHeader
          eyebrow="Portfólio"
          title="Soluções em energia do Grupo BC Energia"
          description="Reduzir custos, otimizar a gestão de energia e avançar em sustentabilidade — a escolha depende do perfil de ligação e do consumo."
        />

        {/* Solução protagonista: fotografia grande ao lado do texto, em vez de
            foto sobre um bloco estreito de parágrafos. */}
        {featured ? (
          <div className="mt-7 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Fotografia decorativa: os dois links de texto ao lado já levam
                à solução, então ela não vira um terceiro alvo redundante. */}
            <div className="bc-fill-media lg:col-span-7">
              <img
                src={PRODUCT_IMAGES[featured.href] ?? '/img/pages/mercado-livre-subestacao.webp'}
                alt=""
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[8px] object-cover"
              />
            </div>

            <article className="lg:col-span-5">
              <p className="t-eyebrow text-bc-primary">Solução em destaque</p>
              <h3 className="t-h2 mt-3 text-text-primary">
                <Link
                  href={featured.href}
                  target={featured.external ? '_blank' : undefined}
                  data-cta-name={`hub_produtos_${featured.title}`}
                  className="transition-colors duration-200 hover:text-bc-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-bc-primary/40"
                >
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-4 t-body-lg text-text-secondary">{featured.description}</p>
              <Link
                href={featured.href}
                target={featured.external ? '_blank' : undefined}
                data-cta-name={`hub_produtos_cta_${featured.title}`}
                className="bc-arrow-action mt-5 w-fit t-action-label focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-bc-primary/40"
              >
                Conhecer solução
              </Link>
            </article>
          </div>
        ) : null}

        {/* Demais soluções: grade visual com a fotografia já publicada de cada
            uma — sem cartões, sem borda e sem sombra. */}
        {othersWithImage.length ? (
          <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {othersWithImage.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  data-cta-name={`hub_produtos_${item.title}`}
                  className="group block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-bc-primary/40"
                >
                  <img
                    src={PRODUCT_IMAGES[item.href]}
                    alt=""
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-[6px] object-cover"
                  />
                  <h3 className="t-h4 mt-4 text-text-primary transition-colors duration-200 group-hover:text-bc-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 t-body-sm text-text-secondary">{item.description}</p>
                  <span className="bc-arrow-action mt-3 w-fit t-action-label">
                    Conhecer solução
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {othersWithoutImage.length ? (
          <ul className="mt-12 border-t border-border-strong">
            {othersWithoutImage.map((item) => (
              <li key={item.href} className="border-b border-border-subtle">
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  data-cta-name={`hub_produtos_${item.title}`}
                  className="bc-arrow-action bc-arrow-action--row group flex min-h-[64px] flex-col justify-center gap-1 py-5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-bc-primary/40 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="t-h4 text-text-primary group-hover:text-bc-primary sm:w-[22ch] sm:shrink-0">
                    {item.title}
                  </span>
                  <span className="t-body-sm text-text-secondary">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>

    <Customers
      variant="grid"
      description="Marcas que já contam com as soluções em energia do Grupo BC Energia."
    />

    <RelatedLinks
      variant="editorial"
      eyebrow="Próximos passos"
      title="Continue explorando"
      items={PRODUCT_RELATED['produtos']}
    />

    <ClosingCta
      graphic={{ variant: 'chevrons', tone: 'light', size: 'small', position: 'top-right', opacity: 0.05 }}
      eyebrow="Grupo BC Energia"
      title="Energia que gera valor"
      titleLine2="para o seu negócio"
      description="Empresas, condomínios e residências com contratos de energia mais eficientes, sem investimento inicial. Fale com um especialista e descubra o modelo ideal para o seu consumo."
      primaryCta={{ label: 'Falar com um especialista', href: '/contato' }}
      secondaryCta={{ label: 'Explorar soluções', href: '#solucoes' }}
      links={[
        {
          label: 'Arrendamento de Usinas',
          href: '/produtos/arrendamento-de-usinas',
          icon: 'usina-solar'
        },
        {
          label: 'Consultoria Jurídica',
          href: 'https://www.bced.com.br/',
          external: true,
          icon: 'contrato-aprovado',
          ariaLabel: 'Consultoria Jurídica BC Energia Direito (abre em nova aba)'
        },
        {
          label: 'Gestão de Energia',
          href: '/produtos/gestao-de-energia',
          icon: 'monitoramento-consumo'
        }
      ]}
    />


    <FormEmbed title="Entre em contato" />
  </div>
)

export default Page
