import { testimonials } from '@/pages/home/Home.data'
import { Customers } from '@/components'
import { Numbers } from '@/components'
import { TestimonyCarousel } from '@/components'

import { Slider, Solutions, Content } from './Sections'


const Page = () => (
  <div>
    <Slider />

    {/*<section className="relative" style={{ backgroundColor: '#123b34' }}>
      <Image
        className="mx-auto w-full"
        src={`/img/ads/banner_black_friday_2024.jpg`}
        alt="Black fr eeday"
        width={1700}
        height={1024}
      />
      <ButtonLink
        style={{
          position: 'absolute',
          top: '60%',
          left: '16%',
          fontSize: 'clamp(0.4rem, 1.5vw, 1rem)'
        }}
        href="https://descontonaenergia.grupobcenergia.com.br/black-friday-2024"
        target="_blank"
      >
        Quero Economizar na Black
      </ButtonLink>
    </section>*/}
    <Solutions />

    <Numbers
      btnText="Quero Economizar"
      btnLink="/produtos"
      context="home"
      subTitle=""
      bgImage="/img/components/numbers/fundo-numeros.jpg"
    >
      Somos a maior <span className="text-amber-400">comercializadora de energia</span> do
      Centro-Oeste e uma das principais independentes do país.
    </Numbers>

    <TestimonyCarousel
      title="Depoimentos"
      description="Veja o que nossos clientes dizem sobre nós"
      testimonials={testimonials}
    />

    <Customers />

    <Content />
  </div>
)

export default Page
