import { useCallback, useEffect, useState } from 'react'

import Link from '@/components/Link'
import { slidersData } from '../Sliders/Sliders.data'

const SLIDE_DURATION = 6000

const tabletHeroImage = (src: string) => {
  if (src.endsWith('hero-consorcio.webp')) return '/img/hero/hero-consorcio-1024.webp'
  if (src.endsWith('hero-resultados.webp')) return '/img/hero/hero-resultados-1024.webp'
  return src
}

/**
 * Home — hero em carrossel com o corte diagonal do símbolo BC.
 *
 * Os três slides, textos, CTAs e fotos são os de `Sliders.data`. A troca é
 * feita por fusão das fotos (com zoom lento) e entrada em cascata do texto; a
 * navegação fica em abas numeradas com barra de progresso. Todos os slides
 * ficam no DOM (prerender e SEO), mas só o ativo é exposto a leitores de tela
 * e ao teclado. Pausa com mouse ou foco dentro do hero, e não avança sozinho
 * com `prefers-reduced-motion`. O controle de pausa (WCAG 2.2.2) fica fora da
 * composição visual e aparece ao receber foco do teclado.
 */
const Hero = () => {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const total = slidersData.length

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const running = !paused && !hovered && !focused && !reducedMotion

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => setCurrent((index) => (index + 1) % total), SLIDE_DURATION)
    return () => window.clearTimeout(timer)
  }, [current, running, total])

  const go = useCallback((index: number) => setCurrent((index + total) % total), [total])

  return (
    <section
      id="home_slider"
      className="hx-hero"
      aria-roledescription="carrossel"
      aria-label="Destaques do Grupo BC Energia"
      data-running={running || undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
      }}
    >
      <div className="hx-hero-media" aria-hidden="true">
        {slidersData.map((slide, index) => (
          <picture key={slide.id} className={`hx-ph${index === current ? ' is-on' : ''}`}>
            {slide.bgImageMobile && <source media="(max-width: 767px)" srcSet={slide.bgImageMobile} />}
            <source media="(max-width: 1023px)" srcSet={tabletHeroImage(slide.bgImage)} />
            <img
              src={slide.bgImage}
              alt=""
              width={1920}
              height={1080}
              className={`${slide.bgPositionMobile ?? 'object-[68%_top]'} ${slide.bgPosition ?? 'md:object-[62%_center]'}`}
              {...{ fetchpriority: index === 0 ? 'high' : 'low' }}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </picture>
        ))}
      </div>
      <span className="hx-hero-line" aria-hidden="true" />

      <div className="hx-hero-copy">
        <div className="hx-wrap hx-hero-slides">
          {slidersData.map((slide, index) => {
            const Title = slide.primary ? 'h1' : 'h2'
            const active = index === current
            return (
              <div
                key={slide.id}
                id={`${slide.id}-panel`}
                className={`hx-slide${active ? ' is-on' : ''}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} de ${total}: ${slide.eyebrow ?? ''}`}
                aria-hidden={!active}
                {...(active ? {} : { inert: '' })}
              >
                {slide.eyebrow && <p className="hx-eyebrow">{slide.eyebrow}</p>}
                <Title className="hx-hero-title">{slide.title}</Title>
                <p className="hx-hero-lead">{slide.description}</p>
                <div className="hx-hero-actions">
                  <Link
                    href={slide.cta.href}
                    target={slide.cta.target ?? '_self'}
                    rel={slide.cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="hx-btn"
                    data-cta-name={slide.cta.label}
                    data-cta-location="hero"
                  >
                    {slide.cta.label}
                  </Link>
                  {slide.secondaryCta && (
                    <Link
                      href={slide.secondaryCta.href}
                      target={slide.secondaryCta.target ?? '_self'}
                      rel={slide.secondaryCta.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="hx-btn-ghost"
                      data-cta-name={slide.secondaryCta.label}
                      data-cta-location="hero"
                    >
                      {slide.secondaryCta.label}
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="hx-tabs">
        <div className="hx-wrap hx-tabs-row">
          {slidersData.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`hx-tab${index === current ? ' is-on' : ''}`}
              aria-controls={`${slide.id}-panel`}
              aria-current={index === current ? 'true' : undefined}
              onClick={() => go(index)}
            >
              <i aria-hidden="true">{index === current && <span key={`${current}-${running}`} />}</i>
              <b aria-hidden="true">{String(index + 1).padStart(2, '0')}</b>
              {slide.eyebrow}
            </button>
          ))}
          <div className="hx-arrows">
            <button type="button" className="hx-pause" aria-pressed={paused || reducedMotion} disabled={reducedMotion}
              onClick={() => setPaused((value) => !value)}>
              {reducedMotion ? 'Troca automática desativada' : paused ? 'Retomar troca automática' : 'Pausar troca automática'}
            </button>
            <button type="button" onClick={() => go(current - 1)} aria-label="Destaque anterior">
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" onClick={() => go(current + 1)} aria-label="Próximo destaque">
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
