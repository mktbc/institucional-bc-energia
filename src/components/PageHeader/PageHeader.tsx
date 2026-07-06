import React from 'react'

import { ArrowMask, Breadcrumbs, Section } from '@/components'
import Image from '@/components/Image'

import { PageHeaderProps } from './PageHeader.type'

const PageHeader = ({ icon, title, description, category, bgImage }: PageHeaderProps) => (
  <>
    {' '}
    <Section
      first
      bgImage={bgImage}
      className="relative from-teal-600 to-teal-600/70 before:absolute before:top-0 before:z-0 before:h-full before:w-full before:bg-gradient-to-t"
    >
      <div className="relative mx-auto flex w-full flex-col items-center justify-center gap-4 px-6 pb-20 pt-14 sm:px-0 sm:pt-0 lg:w-3/4">
        {icon && <Image src={`/img/icons/${icon}`} alt="Icone" width={100} height={100} />}
        <h1 className="mb-4 text-center text-3xl uppercase text-white lg:text-5xl">{title}</h1>
        {description && <p className="text-center text-lg text-white">{description}</p>}
        <Breadcrumbs title={title} parent={category} />
      </div>
    </Section>
    <ArrowMask small />
  </>
)

export default PageHeader
