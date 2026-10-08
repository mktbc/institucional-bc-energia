import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { ReactNode } from 'react'
import type SwiperClass from 'swiper'
import { A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { PowerPlant } from '@/data/powerPlants'

import 'swiper/css'

type PlantCarouselProps = { plants: Array<PowerPlant>; children: ReactNode }

export default function PlantCarousel({ plants, children }: PlantCarouselProps) {
  const swiperRef = useRef<SwiperClass | null>(null)
  const [current, setCurrent] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(preference.matches)
    update()
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  const syncSlides = (swiper: SwiperClass) => {
    setCurrent(swiper.realIndex)
    swiper.slides.forEach((slide, index) => {
      const inactive = index !== swiper.activeIndex
      slide.toggleAttribute('inert', inactive)
      slide.setAttribute('aria-hidden', String(inactive))
    })
  }

  const navigateWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      if (event.key === 'ArrowLeft') swiperRef.current?.slidePrev()
      else swiperRef.current?.slideNext()
    }
  }

  if (!plants.length) return null

  return (
    <div className="be-plant-carousel be-operation-layout" role="region" aria-roledescription="carrossel"
      aria-label="Complexos de geração do Grupo BC Energia" tabIndex={0}
      onKeyDown={navigateWithKeyboard}>
      <div className="be-plant-gallery">
      <Swiper modules={[A11y]} slidesPerView="auto" spaceBetween={24}
        loop={plants.length > 1} speed={reducedMotion ? 0 : 400}
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        onAfterInit={syncSlides} onSlideChange={syncSlides}
        onSlideChangeTransitionEnd={syncSlides}
        a11y={{ enabled: true, containerRole: 'group', itemRoleDescriptionMessage: 'slide',
          slideLabelMessage: '', wrapperLiveRegion: false }}>
        {plants.map((plant, index) => {
          const specs = plant.specs
          const count = specs.find(spec => spec.label.startsWith('Usinas'))
          const power = specs.find(spec => spec.label === 'Potência total')
          const structure = specs.find(spec => spec.label === 'Tipo de estrutura')
          const generation = specs.find(spec => spec.label === 'Geração anual média')

          return (
            <SwiperSlide key={plant.id} aria-label={`${plant.title}, ${plant.location}. ${index + 1} de ${plants.length}`}>
              <div className="be-plant-slide-layout">
                <figure className="be-plant-photo">
                  <img src={plant.image} width={1000} height={700} loading="lazy" decoding="async"
                    alt={`Vista da usina ${plant.title}, ${plant.location}`} />
                  <figcaption className="be-plant-label">
                    <div className="be-plant-identity">
                      <span className="be-plant-name">{plant.title}</span>
                      <span className="be-plant-location">{plant.location}</span>
                    </div>
                    <dl className="be-plant-specs">
                      {count && <div className="be-plant-count"><dt>{count.label}</dt><dd>{count.value}</dd></div>}
                      {power && <div className="be-plant-power"><dt>{power.label}</dt><dd>{power.value}</dd></div>}
                      {structure && <div><dt>{structure.label}</dt><dd>{structure.value}</dd></div>}
                      {generation && <div><dt>{generation.label}</dt><dd>{generation.value}</dd></div>}
                    </dl>
                  </figcaption>
                </figure>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      {plants.length > 1 && <div className="be-plant-controls">
        <div className="be-plant-arrows">
          <button type="button" onClick={() => swiperRef.current?.slidePrev()} aria-label="Complexo anterior">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => swiperRef.current?.slideNext()} aria-label="Próximo complexo">
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="be-plant-status" aria-live="polite">Complexo {current + 1} de {plants.length}</div>
      </div>}
      </div>
      {children}
    </div>
  )
}
