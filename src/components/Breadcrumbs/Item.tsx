import Link from '@/components/Link'

import { ItemProps } from './Breadcrumbs.type'

export const Item = ({ index, pathSections, title }: ItemProps) => {
  if (!pathSections) return <span className="font-semibold">{title}</span>

  const getPathTo = (index: number | undefined) =>
    '/' + pathSections.slice(0, (index || 0) + 1).join('/')
  return (
    <Link key={index} href={getPathTo(index)}>
      {title}
    </Link>
  )
}
