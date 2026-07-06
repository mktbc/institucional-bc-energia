import { Heading, Section } from '@/components'
import { Carousel } from '@/components/Carousel'
import Image from '@/components/Image'

import { logos } from './Customers.data'

const sliders = logos.map((logo) => (
  <Image
    key={logo.id}
    src={`/img/components/customers/${logo.url}`}
    alt={logo.title}
    width={200}
    height={200}
  />
))

const Customers = () => (
  <Section className="pb-20 text-center text-teal-900">
    <div className="mb-1 text-xl font-light">PARCERIA E CONFIANÇA</div>
    <Heading>Nossos Clientes</Heading>
    <div className="mt-16 px-6 lg:px-0">
      <Carousel
        space={15}
        arrows={false}
        dots={false}
        slidesPerView={1}
        slides={sliders}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 40
          }
        }}
      />
    </div>
  </Section>
)
export default Customers
