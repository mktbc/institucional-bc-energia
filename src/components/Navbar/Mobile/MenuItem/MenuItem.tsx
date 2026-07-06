import { useEffect, useState } from 'react'

import Link from '@/components/Link'
import { usePathname } from '@/helpers/navigation'

import { NavbarItems } from '../../Navbar.type'
import { SubMenu } from '../SubMenu'
import { menuItemStyle } from './MenuItem.style'

const MenuItem = ({ onSubMenuOpen, ...item }: NavbarItems) => {
  const pathname = usePathname()
  const [isSubMenuOpen, setSubMenuOpen] = useState(false)

  useEffect(() => {
    setSubMenuOpen(false)
    if (onSubMenuOpen) {
      onSubMenuOpen(isSubMenuOpen)
    }
  }, [pathname])

  const isActiveSubItem = item.subItems?.find(
    (subItem) => pathname.startsWith(subItem.url) || pathname === subItem.url
  )

  const isItemActive = isActiveSubItem || pathname === item.url
  return (
    <div
      className="relative inline"
      key={item.id}
      onMouseEnter={() => setSubMenuOpen(true)}
      onMouseLeave={() => setSubMenuOpen(false)}
    >
      <Link
        href={item.url}
        target={item.target || '_self'}
        onClick={() => setSubMenuOpen(!isSubMenuOpen)}
        className={menuItemStyle({ active: !!isItemActive })}
      >
        {item.title}
      </Link>
      {item.subItems?.length ? (
        <SubMenu key={item.id} isMenuOpen={isSubMenuOpen} {...item} />
      ) : null}
    </div>
  )
}

export default MenuItem
