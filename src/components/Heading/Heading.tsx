import { ReactNode } from 'react'

import { headingStyles } from './Heading.style'
import { HeadingType } from './Heading.type'

const Heading = ({
  children,
  subtitle,
  className,
  center = true,
  full,
  margin = true
}: HeadingType) => (
  <div className={`${className} ${headingStyles({ center, full, margin })}`}>
    {subtitle && <h2 className="mb-3 text-xl font-light lg:text-2xl">{subtitle}</h2>}
    <h3 className="text-2xl leading-tight lg:text-4xl">{children as ReactNode}</h3>
  </div>
)

export default Heading
