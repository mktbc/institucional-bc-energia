import { createElement } from 'react'

import { ArrowMask } from '@/components'
import { sectionStyles } from '@/components/Layout/Section/Section.style'

import { SectionProps } from './Section.type'

const Section = ({
  children,
  id,
  className,
  bgImage,
  hScree,
  first = false,
  as = 'section',
  arrowMask
}: SectionProps) =>
  createElement(
    as,
    {
      id,
      style: bgImage ? { backgroundImage: `url(${bgImage})` } : {},
      className: `${className} ${sectionStyles({ hScree, first, arrowMask })}`
    },
    <>
      {arrowMask && <ArrowMask inverted />}
      <div className="container mx-auto p-0">{children}</div>
      {arrowMask && <ArrowMask inverted up />}
    </>
  )

export default Section
