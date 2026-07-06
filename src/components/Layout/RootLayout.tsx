import { Outlet, useLocation } from 'react-router-dom'

import { Header, Footer, SimuleAgora } from '@/components'
import Seo from '@/components/Seo'
import { getRouteMeta } from '@/config/meta'

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
  const meta = getRouteMeta(pathname)

  return (
    <>
      <Seo title={meta.title} description={meta.description} />

      <div className="flex min-h-screen flex-col">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>

      <SimuleAgora />
    </>
  )
}

export default RootLayout
