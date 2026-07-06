import { Carousel, Heading, Section, TestimonyCard } from '@/components'
import { TestimonyCardProps } from '@/components/TestimonyCard/TestimonyCard.type'

type Props = {
  testimonials: Array<TestimonyCardProps>
  title: string
  description: string
}

const TestimonyCarousel = ({ title, description, testimonials }: Props) => (
  <Section className="px-6 pb-0 pt-12 lg:pt-20">
    {title && (
      <Heading subtitle={title} className="pb-8">
        {description}
      </Heading>
    )}
    <Carousel
      id="testimony_slider"
      space={15}
      arrows={false}
      slidesPerView={1}
      dots
      slides={testimonials.map((testimony: TestimonyCardProps, index: number) => (
        <TestimonyCard key={index} {...testimony} />
      ))}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }}
    />
  </Section>
)

export default TestimonyCarousel
