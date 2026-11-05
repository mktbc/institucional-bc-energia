import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Image from '@/components/Image'
import type { CustomersLogo } from './Customers.type'
import './logo-strip.css'

/**
 * Faixa institucional de clientes: estática, sem movimento automático e sem
 * botões. Quando os logos não cabem na largura, a própria faixa rola na
 * horizontal (toque, trackpad, barra de rolagem ou setas do teclado com foco
 * na faixa). Sem movimento contínuo, não há controle de pausa a oferecer.
 */
const LogoStrip = ({ logos, label }: { logos: CustomersLogo[]; label: string }) => {
  const viewport = useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = useState({ scrollable: false, start: true, end: true })

  useEffect(() => {
    const node = viewport.current
    if (!node) return
    const measure = () => {
      const max = node.scrollWidth - node.clientWidth
      setOverflow({ scrollable: max > 1, start: node.scrollLeft <= 1, end: node.scrollLeft >= max - 1 })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    node.addEventListener('scroll', measure, { passive: true })
    return () => {
      observer.disconnect()
      node.removeEventListener('scroll', measure)
    }
  }, [])

  // A rolagem nativa por seta anda ~40px; aqui cada seta avança um logo e
  // Home/End vão às pontas da faixa.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const node = viewport.current
    const item = node?.querySelector('li')
    if (!node || !item) return
    const step = item.getBoundingClientRect().width + parseFloat(getComputedStyle(item.parentElement!).columnGap || '0')
    const targets: Record<string, number> = {
      ArrowRight: node.scrollLeft + step,
      ArrowLeft: node.scrollLeft - step,
      Home: 0,
      End: node.scrollWidth
    }
    if (!(event.key in targets)) return
    event.preventDefault()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    node.scrollTo({ left: targets[event.key], behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div
      ref={viewport}
      onKeyDown={overflow.scrollable ? onKeyDown : undefined}
      className="bc-logo-strip"
      role="region"
      aria-label={overflow.scrollable ? `${label} — role na horizontal para ver todos` : label}
      tabIndex={overflow.scrollable ? 0 : undefined}
      data-fade-start={overflow.scrollable && !overflow.start ? '' : undefined}
      data-fade-end={overflow.scrollable && !overflow.end ? '' : undefined}
    >
      <ul className="bc-logo-strip__list">
        {logos.map((logo) => (
          <li key={logo.id}>
            <Image
              src={`/img/components/customers/${logo.url}`}
              alt={logo.name ?? logo.title}
              width={268}
              height={166}
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LogoStrip
