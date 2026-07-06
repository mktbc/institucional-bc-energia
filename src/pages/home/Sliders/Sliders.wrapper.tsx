import { ButtonLink, Section } from '@/components'

import { WrapperProps } from './Sliders.type'

const SlidersWrapper = ({
  id,
  bgImage,
  title,
  description,
  textLink,
  link,
  target = '_self'
}: WrapperProps) => (
  <Section as="div" id={id} bgImage={bgImage} className="h-[105vh] bg-[center_right_30%]">
    <div className="relative z-20 flex flex-col space-x-0 text-center md:space-x-0 lg:flex-row lg:space-x-12 lg:text-left xl:space-x-32">
      <div className="lg:px-auto flex flex-col justify-between gap-4 px-6 lg:w-4/5 lg:px-0">
        <h1 className="text-3xl uppercase leading-snug text-white sm:px-0 sm:text-3xl md:text-4xl md:leading-[3rem] lg:pr-8 lg:text-5xl lg:leading-[3.7rem] xl:text-5xl xl:leading-[3.3rem]">
          {title}
        </h1>
        <p className="mb-6 mt-2 text-xl text-white">{description}</p>
        <div className="flex justify-center lg:justify-normal">
          <ButtonLink href={link} target={target} variant="secondary" center={false}>
            {textLink}
          </ButtonLink>
        </div>
      </div>
    </div>
    <div className="visible absolute bottom-0 left-0 right-0 top-0 z-10 w-full bg-teal-950 opacity-40" />
  </Section>
)

export default SlidersWrapper
