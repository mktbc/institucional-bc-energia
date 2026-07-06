import { useEffect, useState } from 'react'

import Link from '@/components/Link'
import { usePathname } from '@/helpers/navigation'

import { NavbarItems } from '../../Navbar.type'
import { SubMenu } from '../SubMenu'
import { menuItemStyle } from './MenuItem.style'

const MenuItem = ({ ...item }: NavbarItems) => {
  const pathname = usePathname()
  const [isMenuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMenuOpen(false), [pathname])

  const isActiveSubItem = item.subItems?.find(
    (subItem) => pathname.startsWith(subItem.url) || pathname === subItem.url
  )

  const isItemActive = isActiveSubItem || pathname === item.url
  return (
    <div
      className="relative inline"
      key={item.id}
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <Link
        href={item.url}
        target={item.target || '_self'}
        className={menuItemStyle({ active: !!isItemActive })}
      >
        {item.title}
      </Link>
      {item.subItems?.length ? <SubMenu key={item.id} isMenuOpen={isMenuOpen} {...item} /> : null}
    </div>
  )
}

export default MenuItem
