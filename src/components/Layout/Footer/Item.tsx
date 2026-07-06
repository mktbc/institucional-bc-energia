import { NavbarItems } from '@/components/Navbar/Navbar.type'
import Link from '@/components/Link'
import { usePathname } from '@/helpers/navigation'

import { menuItemFooterStyle } from './Footer.style'

type Props = {
  data: NavbarItems
}

const Item = ({ data }: Props) => {
  const pathname = usePathname()
  const isItemActive = pathname === data.target

  return (
    <Link
      key={data.id}
      href={data.url}
      target={data.target || '_self'}
      className={menuItemFooterStyle({ active: isItemActive })}
    >
      <li>{data.title}</li>
    </Link>
  )
}

export default Item
