import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CarouselProps } from './Carousel.type'

import '@/styles/carousel.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Carousel = ({
  slides,
  slidesPerView = 1,
  arrows = false,
  dots = false,
  space = 0,
  autoplay = true,
  loop = true,
  ...rest
}: CarouselProps) => {
  const modules = []

  if (autoplay) modules.push(Autoplay)

  if (dots) modules.push(Pagination)

  if (arrows) modules.push(Navigation)

  return (
    <Swiper
      {...rest}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false
      }}
      loop={loop}
      slidesPerView={slidesPerView}
      spaceBetween={space}
      pagination={{
        clickable: true
      }}
      navigation={arrows}
      modules={modules}
      className="mySwiper"
    >
      {slides.map((el, index) => (
        <SwiperSlide key={index}>{el}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel
