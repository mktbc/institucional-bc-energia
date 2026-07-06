import { useEffect, useRef, useState } from 'react'

import { SIMULATOR_WIDGET_URL } from '@/helpers'
import Image from '@/components/Image'

type WidgetState = 'closed' | 'widget' | 'modal'

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
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {/* Widget card */}
          {state === 'widget' && (
            <div className="relative mb-3 w-64 rounded-2xl border-2 border-teal-600 bg-white p-5 shadow-xl">
              <button
                onClick={handleClose}
                className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center text-gray-400 transition hover:text-gray-600"
                aria-label="Fechar"
              >
                ✕
              </button>
              <p className="mb-3 pr-4 text-sm leading-snug text-gray-800">
                Quer saber quanto você pode{' '}
                <span className="font-semibold text-teal-500">economizar na conta de energia</span>{' '}
                todos os meses?
              </p>
              <button
                onClick={() => setState('modal')}
                className="w-full rounded-full bg-teal-400 py-2 text-sm font-bold text-white transition hover:bg-teal-500 active:scale-95"
              >
                Simule agora!
              </button>
            </div>
          )}

          {/* Botão com logo e animação de pulso */}
          <button
            onClick={() => setState(state === 'closed' ? 'widget' : 'closed')}
            className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-teal-600 bg-white p-3 shadow-lg transition hover:scale-105 hover:bg-teal-50 active:scale-95"
            aria-label="Simule agora"
          >
            <Image
              src="/img/global/grupo-bc-logo-vertical-color.webp"
              alt="Grupo BC Energia"
              width={96}
              height={80}
              className="object-contain"
            />
            {/* Pulsing green dot — indicador online */}
            <span className="absolute right-0.5 top-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-500" />
            </span>
          </button>
        </div>
      )}

      {/* Modal overlay com iframe */}
      {state === 'modal' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-[650px] overflow-hidden rounded-2xl bg-white shadow-2xl"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
              aria-label="Fechar simulador"
            >
              ✕
            </button>
            <iframe
              ref={iframeRef}
              src={SIMULATOR_WIDGET_URL}
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
