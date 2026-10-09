import { useEffect, useRef, useState } from 'react'

const DURATION = 1400

/**
 * Número que conta a partir de zero quando entra na tela (ex.: "+ de 5 mil").
 * O texto final vem no HTML pré-renderizado e é o que leitores de tela leem;
 * a contagem só acontece para quem ainda não viu o número, e não acontece com
 * `prefers-reduced-motion` ou quando o valor não tem um inteiro simples.
 */
const CountUp = ({ value = '' }: { value?: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    setDisplay(value)
    const match = value.match(/\d+/)
    const el = ref.current
    if (!match || !el || /\d[.,]\d/.test(value)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    const target = Number(match[0])
    const render = (n: number) => value.replace(match[0], String(n))
    setDisplay(render(0))

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(render(Math.round(target * eased)))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </>
  )
}

export default CountUp
