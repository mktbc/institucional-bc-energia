import { useEffect, useRef, useState } from 'react'

import { FORM_WIDGET_THEME } from '@/config/formWidgetTheme'
import { buildSimulatorUrl } from '@/helpers/utm'
import Image from '@/components/Image'

type WidgetState = 'closed' | 'widget' | 'modal'

const ORIGIN = 'https://simulador.bcenergiacomdesconto.com.br'

const theme = FORM_WIDGET_THEME

const SimuleAgora = () => {
  const [state, setState] = useState<WidgetState>('closed')
  const [iframeHeight, setIframeHeight] = useState(500)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Trava scroll do body quando o modal estiver aberto
  useEffect(() => {
    document.body.style.overflow = state === 'modal' ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [state])

  // Reseta a altura ao abrir o modal
  useEffect(() => {
    if (state === 'modal') setIframeHeight(500)
  }, [state])

  // Integração postMessage com o simulador no modal
  useEffect(() => {
    if (state !== 'modal') return
    const iframe = iframeRef.current
    if (!iframe) return

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
        if (msg.height) setIframeHeight(Math.ceil(msg.height))
        sendTheme()
      }
    }

    const handleLoad = () => {
      requestResize()
      sendTheme()
    }

    window.addEventListener('message', handleMessage)
    iframe.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('message', handleMessage)
      iframe.removeEventListener('load', handleLoad)
    }
  }, [state])

  const handleClose = () => setState('closed')

  return (
    <>
      {/* Botão flutuante + widget card */}
      {state !== 'modal' && (
        <div
          data-cta-location="floating"
          className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-50 flex flex-col items-end sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-6"
        >
          {/* Widget card */}
          {state === 'widget' && (
            <div className="relative mb-3 w-[min(16rem,calc(100vw-2rem))] rounded-card border border-bc-primary/25 bg-surface-card p-5 shadow-md">
              <button
                onClick={handleClose}
                className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center text-text-muted transition-colors duration-fast hover:text-text-primary"
                aria-label="Fechar"
              >
                ✕
              </button>
              <p className="mb-3 pr-4 t-body-sm leading-snug text-text-primary">
                Quer saber quanto você pode{' '}
                <span className="font-semibold text-bc-primary">economizar na conta de energia</span>{' '}
                todos os meses?
              </p>
              <button
                onClick={() => setState('modal')}
                data-cta-name="Simule agora (widget)"
                className="w-full rounded-full bg-bc-primary py-2 t-label font-bold text-white transition-colors duration-fast hover:bg-bc-primary-hover active:translate-y-px motion-reduce:active:translate-y-0"
              >
                Simule agora!
              </button>
            </div>
          )}

          {/* Botão com logo */}
          <button
            onClick={() => setState(state === 'closed' ? 'widget' : 'closed')}
            className="relative flex h-16 w-16 items-center justify-center rounded-full border border-bc-primary/30 bg-surface-card p-2 shadow-sm transition-colors duration-200 hover:border-bc-primary/50 hover:bg-surface-highlight motion-reduce:transition-none lg:h-[72px] lg:w-[72px] lg:p-2.5"
            aria-label="Simule agora"
          >
            <Image
              src="/img/global/grupo-bc-logo-vertical-color-256.webp"
              alt="Grupo BC Energia"
              width={96}
              height={80}
              className="object-contain"
            />
          </button>
        </div>
      )}

      {/* Modal overlay com iframe */}
      {state === 'modal' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bc-dark/70 p-4"
          onClick={handleClose}
        >
          <div
            className="relative w-full measure-intro overflow-hidden rounded-card bg-surface-card shadow-lg"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-text-secondary transition-colors duration-fast hover:bg-bc-gray"
              aria-label="Fechar simulador"
            >
              ✕
            </button>
            <iframe
              ref={iframeRef}
              src={buildSimulatorUrl('Widget Site')}
              style={{
                width: '100%',
                height: `${iframeHeight}px`,
                border: '0',
                display: 'block',
                overflow: 'hidden'
              }}
              title="Simulador de Economia"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default SimuleAgora
