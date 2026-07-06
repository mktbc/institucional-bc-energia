import { ArrowMask, Carousel } from '@/components'

import { Sliders } from '../Sliders'

const Slider = () => (
  <section id="home_slider">
    <Carousel arrows dots slides={Sliders} />
    <ArrowMask />
  </section>
)

export default Slider
