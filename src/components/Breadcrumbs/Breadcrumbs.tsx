import { Fragment } from 'react'

import Link from '@/components/Link'
import { usePathname } from '@/helpers/navigation'

import { BreadcrumbsProps } from './Breadcrumbs.type'
import { Item } from './Item'

const Breadcrumbs = ({ title, parent }: BreadcrumbsProps) => {
  const path = usePathname()
  const pathSections = path.slice(1).split('/')
  const isLastItem = (index: number) => pathSections.length != index + 2

  return (
    <div className="mt-4 flex gap-2 rounded bg-black/10 px-4 py-2 text-white/80">
      <Link href="/">Home</Link>
      <span>/</span>
      {pathSections.map((_, index) => (
        <Fragment key={index}>
          {isLastItem(index) ? (
            <Item title={title} />
          ) : (
            <Item index={index} pathSections={pathSections} title={parent} />
          )}
          {!isLastItem(index) && <span> /</span>}
        </Fragment>
      ))}
    </div>
  )
}

export default Breadcrumbs
