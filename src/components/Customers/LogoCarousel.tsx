import { useEffect, useId, useRef, useState } from 'react'
import Image from '@/components/Image'
import type { CustomersLogo } from './Customers.type'
import './logo-carousel.css'

/** As listas oficiais continuam independentes. A segunda cópia é apenas visual. */
const LogoCarousel = ({ logos, label }: { logos: CustomersLogo[]; label: string }) => {
  const id = useId()
  const viewport = useRef<HTMLDivElement>(null)
  const original = useRef<HTMLUListElement>(null)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reduced, setReduced] = useState(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = viewport.current
    if (!node) return
    const measure = () => node.style.setProperty('--logo-viewport-width', `${node.clientWidth}px`)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const node = viewport.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (paused || hovered || focused || reduced || !visible) return
    let frame = 0
    let previous = 0
    let position = viewport.current?.scrollLeft ?? 0
    const advance = (now: number) => {
      const node = viewport.current
      const list = original.current
      if (node && list && previous) {
        const period = list.getBoundingClientRect().width + parseFloat(getComputedStyle(node).gap)
        position += Math.min(now - previous, 50) * 0.024
        if (position >= period) position -= period
        node.scrollLeft = position
      }
      previous = now
      frame = requestAnimationFrame(advance)
    }
    frame = requestAnimationFrame(advance)
    return () => cancelAnimationFrame(frame)
  }, [paused, hovered, focused, reduced, visible])

  const move = (direction: number) => {
    const node = viewport.current
    const list = original.current
    if (!node || !list) return
    setPaused(true)
    const period = list.getBoundingClientRect().width + parseFloat(getComputedStyle(node).gap)
    // Ao voltar no início, a cópia visual mantém a sequência do último logo.
    if (direction < 0 && node.scrollLeft < 1 && !reduced) node.scrollLeft = period
    const item = list.firstElementChild as HTMLElement | null
    const step = item ? item.getBoundingClientRect().width + parseFloat(getComputedStyle(list).gap) : node.clientWidth
    node.scrollBy({ left: direction * step, behavior: reduced ? 'instant' : 'smooth' })
  }

  const renderLogos = (duplicate: boolean) => logos.map(logo => (
    <li key={logo.id} data-logo-id={duplicate ? undefined : logo.id}>
      <Image src={`/img/components/customers/${logo.url}`} alt={duplicate ? '' : logo.name ?? logo.title}
        width={200} height={200} loading="lazy" decoding="async" />
    </li>
  ))

  return (
    <div className="bc-logo-carousel" role="region" aria-roledescription="carrossel" aria-label={label}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
      }}>
      <div className="bc-logo-controls">
        <button type="button" aria-controls={id} aria-label="Logos anteriores" onClick={() => move(-1)}>Anterior</button>
        <button type="button" aria-controls={id} aria-pressed={paused || reduced} disabled={reduced}
          onClick={() => setPaused(value => !value)}>{reduced ? 'Movimento reduzido' : paused ? 'Retomar movimento' : 'Pausar movimento'}</button>
        <button type="button" aria-controls={id} aria-label="Próximos logos" onClick={() => move(1)}>Próximos</button>
      </div>
      <div id={id} ref={viewport} className="bc-logo-viewport" tabIndex={0} aria-label="Faixa de clientes; use as setas para navegar"
        onPointerDown={() => setPaused(true)} onWheel={() => setPaused(true)}
        onKeyDown={event => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault()
            move(event.key === 'ArrowLeft' ? -1 : 1)
          }
        }}>
        <ul className="bc-logo-list" ref={original}>{renderLogos(false)}</ul>
        {!reduced && <ul className="bc-logo-list" aria-hidden="true">{renderLogos(true)}</ul>}
      </div>
    </div>
  )
}
export default LogoCarousel
