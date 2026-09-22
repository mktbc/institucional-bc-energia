import { useEffect, useMemo, useRef } from 'react'

import { Section } from '@/components'
import { buildSimulatorUrl } from '@/helpers/utm'

const ORIGIN = 'https://simulador.bcenergiacomdesconto.com.br'

const theme = {
  primary: '#1f7a6b',
  buttonBg: '#1f7a6b',
  buttonText: '#FFFFFF',
  cardBg: '#FFFFFF',
  text: '#1f2937',
  inputBg: '#FFFFFF',
  inputBorder: '#1f7a6b',
  primaryText: '#FFFFFF',
  accent: '#27bdb1'
}

const FormEmbed = ({ title, description }: { title?: string; description?: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    let themeIntervalId: ReturnType<typeof setInterval> | null = null

    // Repassa query params da página pai para o iframe
    try {
      const incoming = String(window.location.search || '').replace(/^\?/, '')
      if (incoming) {
        const base = iframe.getAttribute('src') || ''
        try {
          const u = new URL(base)
          const merged = new URLSearchParams(u.search)
          new URLSearchParams(incoming).forEach((v, k) => merged.set(k, v))
          u.search = merged.toString()
          const finalUrl = u.toString()
          if (finalUrl !== base) iframe.setAttribute('src', finalUrl)
        } catch {
          iframe.setAttribute('src', base + window.location.search)
        }
      }
    } catch {
      /* ignore */
    }

    const setHeight = (h: number) => {
      if (h) iframe.style.height = Math.max(400, Math.ceil(h)) + 'px'
    }

    const sendTheme = () => {
      try {
        iframe.contentWindow?.postMessage({ type: 'host:theme', theme }, ORIGIN)
      } catch {
        /* ignore */
      }
    }

    const requestResize = () => {
      try {
        iframe.contentWindow?.postMessage({ type: 'host:request-resize' }, ORIGIN)
      } catch {
        /* ignore */
      }
    }

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN) return
      const msg = (e.data || {}) as { type: string; height?: number }
      if (msg.type === 'simulator:ready') {
        setHeight(msg.height ?? 0)
        sendTheme()
      }
    }

    const handleLoad = () => {
      requestResize()
      sendTheme()
      let tries = 0
      themeIntervalId = setInterval(() => {
        sendTheme()
        if (++tries >= 6) {
          if (themeIntervalId) clearInterval(themeIntervalId)
          themeIntervalId = null
        }
      }, 500)
    }

    window.addEventListener('message', handleMessage)
    window.addEventListener('resize', requestResize)
    iframe.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('message', handleMessage)
      window.removeEventListener('resize', requestResize)
      iframe.removeEventListener('load', handleLoad)
      if (themeIntervalId) clearInterval(themeIntervalId)
    }
  }, [])

  return (
    <Section id="contato" className="bg-teal-600 pb-10 pt-10">
      {title && <h2 className="px-6 py-6 text-center text-3xl uppercase text-white">{title}</h2>}
      {description && (
        <p className="mx-auto mb-6 w-2/3 text-center text-xl text-white">{description}</p>
      )}
      <div
        style={{
          width: '100%',
          maxWidth: '650px',
          margin: '0 auto',
          overflow: 'hidden',
          borderRadius: '10px'
        }}
      >
        <iframe
          ref={iframeRef}
          src={SIMULATOR_FORM_URL}
          style={{
            width: '100%',
            border: '0',
            background: 'transparent',
            display: 'block',
            overflow: 'hidden'
          }}
          loading="lazy"
          title="Simulador de Economia"
        />
      </div>
    </Section>
  )
}

export default FormEmbed
