import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import App from './App'
import '@/styles/globals.css'
import '@/styles/energy-flow.css'
import { loadAppConfig } from '@/config/integrations'
import { ensureDefaultUtms } from '@/helpers/utm'
import { initUtmSession, initWebVitals } from '@/lib/analytics'
import { initThirdPartyScripts } from '@/lib/integrations'

// Aplica UTMs padrão de trackeamento quando o visitante chega sem nenhum utm_*
// (regra do projeto publicado). Antes da captura de sessão abaixo.
ensureDefaultUtms()

// Carrega config pública (WhatsApp, RD Station, vagas) do Supabase antes/junto do render.
loadAppConfig()

// Captura/persistência de UTMs da sessão (sessionStorage, sem dados pessoais).
// Roda ANTES de qualquer script de terceiro: a atribuição não depende do GTM.
initUtmSession()

// Terceiros (GTM) — idle, produção apenas, inicialização única.
initThirdPartyScripts()

// RUM: Core Web Vitals de campo (amostragem 20%, sem PII), via dataLayer.
initWebVitals()

const container = document.getElementById('root')
if (!container) throw new Error('Elemento #root não encontrado no index.html')

const app = (
  <StrictMode>
    <HelmetProvider>
      {/* QA FRONT-END 17: future flags do React Router v7 já adotadas — remove
          os avisos de console e alinha o comportamento ao da próxima major. */}
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

// Um fallback SPA pode receber o HTML da Home em outra URL. Só hidratar
// quando o marcador SSG identifica a própria rota, evitando markup divergente.
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
if (container.hasChildNodes() && container.dataset.prerenderPath === currentPath) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
