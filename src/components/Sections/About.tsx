import { Heading, Section } from '@/components'
import { Features } from '@/components'
import {
  aboutImageStyles,
  aboutWrapStyles,
  aboutStyles
} from '@/components/Sections/Sections.style'
import Image from '@/components/Image'
import Link from '@/components/Link'

import { AboutProps } from './Sections.type'

const About = ({
  content,
  features,
  img,
  children,
  inverter,
  className,
  imgLink = '',
  target = '_self'
}: AboutProps) => (
  <Section className={`${className} ${aboutStyles()}`}>
    <div className={aboutWrapStyles({ inverter })}>
      <div className="flex flex-col lg:basis-3/4 2xl:basis-2/3">
        {content.map((item) => (
          <>
            <Heading center={false} full>
              {item.title}
            </Heading>
            <p className="whitespace-pre-line text-justify text-lg">{item.description}</p>
          </>
        ))}
        {children}
      </div>
      <div className={aboutImageStyles({ inverter })}>
        <Link href={imgLink} target={target}>
          <Image
            className="ml-auto w-full rounded-lg"
            src={img}
            alt="Grupo BC Energia"
            width={1100}
            height={1500}
          />
        </Link>
      </div>
    </div>

    {features?.length ? (
      <div className="mt-20 grid gap-10 lg:grid-cols-3">
        {features.map((feature) => (
          <Features key={feature.id} {...feature} />
        ))}
      </div>
    ) : null}
  </Section>
)

export default About
