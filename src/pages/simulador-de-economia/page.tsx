import { useEffect, useState } from 'react'

import { isPreviewEnvironment } from '@/config/site'

import { MobileStickyCta } from '@pageconv/components/MobileStickyCta'
import { Hero } from '@pageconv/components/sections/Hero'
import { TrustBar } from '@pageconv/components/sections/TrustBar'
import { Qualification } from '@pageconv/components/sections/Qualification'
import { Steps } from '@pageconv/components/sections/Steps'
import { VideoExplainer } from '@pageconv/components/sections/VideoExplainer'
import { CustomerJourney } from '@pageconv/components/sections/CustomerJourney'
import { SameDistributor } from '@pageconv/components/sections/SameDistributor'
import { SavingsComparison } from '@pageconv/components/sections/SavingsComparison'
import { Simulator } from '@pageconv/components/sections/Simulator'
import { SavingsByState } from '@pageconv/components/sections/SavingsByState'
import SocialProofCarousel from '@pageconv/components/SocialProofCarousel'
import { Eligibility } from '@pageconv/components/sections/Eligibility'
import { WhoWeAre } from '@pageconv/components/sections/WhoWeAre'
import { Faq } from '@pageconv/components/sections/Faq'
import { FinalCta } from '@pageconv/components/sections/FinalCta'
import { PortalContainerContext } from '@pageconv/lib/portal-container'

import './pageconv/pageconv.css'

/**
 * /simulador-de-economia — landing page PageConv (mktbc/bc-energia-lp-googleads,
 * src/routes/index.tsx) renderizada nativamente no site institucional.
 *
 * - Cabeçalho, rodapé e widget SimuleAgora são os do site (RootLayout). Do
 *   index.tsx da PageConv saem só Header, Footer e WhatsAppButton (botão
 *   flutuante global que duplicava o widget institucional no mesmo canto).
 * - O CSS da PageConv (Tailwind 4) é pré-compilado e escopado em `.pageconv-root`
 *   (ver scripts/build-pageconv-css.mjs), sem afetar as demais páginas.
 * - GTM já é carregado pelo site (mesmo container GTM-KWRL7CWP). As tags
 *   exclusivas da PageConv (Google Ads, Clarity, LinkedIn) são carregadas
 *   apenas nesta rota, uma vez, e nunca em preview.
 */

const GOOGLE_ADS_ID = 'AW-18374949482'
const CLARITY_ID = 'yf994ly5kn'
const LINKEDIN_PARTNER_ID = '11123873'

let pageconvTagsLoaded = false

const loadPageconvTags = () => {
  if (pageconvTagsLoaded || typeof window === 'undefined' || isPreviewEnvironment()) return
  pageconvTagsLoaded = true
  const w = window as unknown as Record<string, any>

  // Google Ads (gtag) — mesmo snippet de GoogleAdsTag.tsx da PageConv.
  const gtagScript = document.createElement('script')
  gtagScript.async = true
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
  document.head.appendChild(gtagScript)
  w.dataLayer = w.dataLayer || []
  w.gtag =
    w.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments)
    }
  w.gtag('js', new Date())
  w.gtag('config', GOOGLE_ADS_ID)

  // Microsoft Clarity — snippet de __root.tsx da PageConv.
  w.clarity =
    w.clarity ||
    function clarity(...args: unknown[]) {
      ;(w.clarity.q = w.clarity.q || []).push(args)
    }
  const clarityScript = document.createElement('script')
  clarityScript.async = true
  clarityScript.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
  document.head.appendChild(clarityScript)

  // LinkedIn Insight Tag — snippet de __root.tsx da PageConv.
  w._linkedin_partner_id = LINKEDIN_PARTNER_ID
  w._linkedin_data_partner_ids = w._linkedin_data_partner_ids || []
  w._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID)
  if (!w.lintrk) {
    w.lintrk = function lintrk(a: unknown, b: unknown) {
      w.lintrk.q.push([a, b])
    }
    w.lintrk.q = []
  }
  const linkedinScript = document.createElement('script')
  linkedinScript.async = true
  linkedinScript.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
  document.head.appendChild(linkedinScript)
}

const SimuladorDeEconomia = () => {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    loadPageconvTags()
  }, [])

  return (
    <div className="pageconv-root">
      <PortalContainerContext.Provider value={portalContainer}>
        <div className="flex flex-col bg-background">
          {/* Na PageConv era <main> com pt-16/sm:pt-20 para o header dela; aqui o
              <main> é o do RootLayout e o recuo cobre o header fixo do site. */}
          <div className="lp-editorial pageconv-offset flex-1">
            <Hero />
            <TrustBar />
            <Qualification />
            <Steps />
            <VideoExplainer />
            <CustomerJourney />
            <SameDistributor />
            <SavingsComparison />
            <Simulator />
            <SavingsByState />
            <SocialProofCarousel
              scrollToForm={() =>
                document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
              }
            />
            <Eligibility />
            <WhoWeAre />
            <Faq />
            <FinalCta />
          </div>
          <MobileStickyCta />
        </div>
      </PortalContainerContext.Provider>
      <div ref={setPortalContainer} className="pageconv-portal" />
    </div>
  )
}

export default SimuladorDeEconomia
