import { Suspense } from 'react'
import '@/styles/editorial-pages.css'
import '@/styles/brand-alignment.css'
import '@/styles/site-design.css'
import { Outlet, useLocation } from 'react-router-dom'

import { Header } from '@/components/Layout/Header'
import { Footer } from '@/components/Layout/Footer'
import SimuleAgora from '@/components/SimuleAgora/SimuleAgora'
import RouteFocus from '@/components/Layout/RouteFocus'
import ScrollToTop from '@/components/Layout/ScrollToTop'
import Seo from '@/components/Seo'
import {
  breadcrumbSchema,
  organizationSchema,
  webPageSchema,
  serviceSchema,
  websiteSchema
} from '@/components/Seo/structuredDataBuilders'
import type { JsonLd } from '@/components/Seo/structuredDataBuilders'
import { resolveRouteMeta } from '@/config/meta-content'
import { useClickTracking, useRouteTracking } from '@/lib/analytics'
import { OG_DEFAULT, OG_IMAGES } from '@/config/ogImages'

/** Páginas, além da Home, que emitem o Organization completo. */
const ORGANIZATION_PAGES = ['/contato', '/sobre', '/sobre/quem-somos']

/**
 * Layout raiz da aplicação (equivalente ao antigo `app/layout.tsx` do Next).
 * Renderiza Header, conteúdo da rota (via <Outlet/>), Footer e o widget SimuleAgora.
 *
 * NOTA: os scripts de Google Tag Manager (GTM) e RD Station que ficavam no
 * <head>/<body> do layout Next NÃO foram portados (dependiam de IDs/segredos).
 * TODO: TI reconectar GTM e RD Station (ver src/config/integrations.ts).
 */
const RootLayout = () => {
  const { pathname } = useLocation()
  const meta = resolveRouteMeta(pathname)

  // Tracking (GTM Data Layer): page view virtual em SPA + cliques relevantes.
  useRouteTracking()
  useClickTracking()


  const isHome = pathname === '/'
  const isDesignSystem = pathname === '/design-system'
  const editorialClass = !isHome && !isDesignSystem ? 'bc-inner-editorial' : ''
  const jsonLd: Array<JsonLd | null> = []

  // ETAPA SEO 07: nenhuma página noindex (sistema, conteúdo provisório, 404 ou
  // redirect) emite BreadcrumbList/Service — schema só em URL indexável.
  const indexable = !meta.noindex && !meta.noCanonical

  if (isHome && indexable) {
    jsonLd.push(organizationSchema(meta.description), websiteSchema())
  } else if (indexable && ORGANIZATION_PAGES.includes(pathname)) {
    // Páginas institucionais e de contato também descrevem a empresa.
    jsonLd.push(organizationSchema())
  }

  if (indexable) {
    jsonLd.push(
      webPageSchema({
        path: meta.canonicalPath ?? pathname,
        name: meta.title,
        description: meta.description
      })
    )
  }

  if (indexable && meta.breadcrumb?.length) {
    jsonLd.push(breadcrumbSchema([{ name: 'Home', path: '/' }, ...meta.breadcrumb]))
  }

  if (indexable && meta.schemaType === 'Service') {
    jsonLd.push(
      serviceSchema({
        name: meta.schemaName ?? meta.title,
        description: meta.description,
        path: meta.canonicalPath ?? pathname
      })
    )
  }

  return (
    <>
      <ScrollToTop />
      <RouteFocus />

      <Seo
        title={meta.title}
        description={meta.description}
        canonicalPath={meta.noCanonical ? undefined : (meta.canonicalPath ?? pathname)}
        noindex={meta.noindex}
        nofollow={meta.nofollow}
        ogTitle={meta.ogTitle}
        ogDescription={meta.ogDescription}
        ogImage={OG_IMAGES[meta.canonicalPath ?? pathname] ?? meta.ogImage ?? OG_DEFAULT}
        ogType={meta.ogType}
        twitterCard={meta.twitterCard}
        jsonLd={jsonLd}
      />


      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-bc-dark"
      >
        Ir para o conteúdo principal
      </a>

      <div className={`bc-site-shell flex min-h-dvh flex-col ${isHome ? '' : 'bc-site-shell--internal'}`}>
        <Header />
        <main id="conteudo" tabIndex={-1} className={`bc-site-page focus:outline-none ${editorialClass}`}>
          {/* A Suspense fica DENTRO do layout: header, footer e <main> não
              desmontam durante o carregamento do chunk da rota, o que preserva
              o foco de teclado e evita piscar a navegação. */}
          <Suspense fallback={<div className="bc-route-loading min-h-screen" aria-busy="true" aria-label="Carregando página" />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>

      <SimuleAgora />
    </>
  )
}

export default RootLayout
