import { useEffect, useRef, useState } from 'react'
import { A11y, Autoplay, Pagination, Navigation, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type SwiperClass from 'swiper'

import { CarouselProps } from './Carousel.type'
import '@/styles/carousel.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Carousel = ({
  slides, slidesPerView = 1, arrows = false, dots = false, space = 0,
  autoplay = true, autoplayDelay = 2500, loop = true, ...rest
}: CarouselProps) => {
  const [reducedMotion, setReducedMotion] = useState(true)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const swiperRef = useRef<SwiperClass | null>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const autoplayEnabled = autoplay && !reducedMotion && !paused && !hovered && !focused
  useEffect(() => {
    const instance = swiperRef.current?.autoplay
    if (!instance) return
    if (autoplayEnabled) instance.start()
    else instance.stop()
  }, [autoplayEnabled])

  // Todos os slides visíveis permanecem navegáveis, inclusive em faixas múltiplas.
  const syncInert = (swiper: SwiperClass) => {
    swiper.slides?.forEach((slide) => {
      const inactive = !slide.classList.contains('swiper-slide-visible')
      slide.toggleAttribute('inert', inactive)
    })
  }

  return (
    <div className="bc-carousel-shell relative"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
      }}>
      <Swiper {...rest}
        onSwiper={swiper => { swiperRef.current = swiper; rest.onSwiper?.(swiper) }}
        onAfterInit={swiper => { syncInert(swiper); rest.onAfterInit?.(swiper) }}
        onSlideChangeTransitionEnd={swiper => { syncInert(swiper); rest.onSlideChangeTransitionEnd?.(swiper) }}
        onFocusCapture={rest.onFocusCapture}
        onBlurCapture={rest.onBlurCapture}
        watchSlidesProgress
        speed={reducedMotion ? 0 : (rest.speed ?? 300)}
        keyboard={{ enabled: true, onlyInViewport: true, pageUpDown: false }}
        a11y={{ enabled: true, prevSlideMessage: 'Slide anterior', nextSlideMessage: 'Próximo slide',
          firstSlideMessage: 'Este é o primeiro slide', lastSlideMessage: 'Este é o último slide',
          paginationBulletMessage: 'Ir para o slide {{index}}', slideLabelMessage: 'Slide {{index}} de {{slidesLength}}',
          containerMessage: 'Carrossel de destaques' }}
        autoplay={autoplay && !reducedMotion ? { delay: autoplayDelay, disableOnInteraction: false, pauseOnMouseEnter: false } : false}
        loop={loop} slidesPerView={slidesPerView} spaceBetween={space}
        pagination={dots ? { clickable: true } : false} navigation={arrows}
        modules={[A11y, Keyboard, Autoplay, ...(dots ? [Pagination] : []), ...(arrows ? [Navigation] : [])]}
        className="mySwiper">
        {slides.map((slide, index) => <SwiperSlide key={index}>{slide}</SwiperSlide>)}
      </Swiper>
      {autoplay && <button type="button" className="bc-carousel-toggle" disabled={reducedMotion}
        aria-pressed={paused || reducedMotion} onClick={() => setPaused(value => !value)}
        aria-label={reducedMotion ? 'Troca automática desativada: movimento reduzido' : paused ? 'Retomar carrossel' : 'Pausar carrossel'}>
        <span aria-hidden="true">{paused || reducedMotion ? '▷' : 'Ⅱ'}</span>
        {reducedMotion ? 'Movimento reduzido' : paused ? 'Retomar' : 'Pausar'}
      </button>}
    </div>
  )
}

export default Carousel
