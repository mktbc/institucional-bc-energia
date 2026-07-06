import Image from '@/components/Image'
import Link from '@/components/Link'

import { NavbarItems } from '../../Navbar.type'
import { subItemsContainer, subItemStyles, subItemsWrap } from './SubMenu.style'

const SubMenu = ({ column, subItems, size, isMenuOpen }: NavbarItems) => (
  <div className={subItemsContainer({ isMenuOpen })}>
    <div className={subItemsWrap({ column })}>
      {subItems?.map((sub) => (
        <div key={sub.id} className={subItemStyles({ border: sub.border !== false, size })}>
          <Link
            key={sub.id}
            href={sub.url}
            onClick={() => (sub?.target ? window.open(sub.url, '_blank') : null)}
            target={sub.target || '_self'}
            className="text-white hover:text-gray-200"
          >
            <span className="flex h-full items-center gap-3 px-6 py-6 transition-colors duration-75 hover:bg-teal-500/60">
              {sub.icon?.url && (
                <Image
                  src={`/img/icons/${sub.icon.url}`}
                  alt="Icone"
                  width={sub.icon.size[0]}
                  height={sub.icon.size[1]}
                  priority
                />
              )}
              <span>{sub.title}</span>
            </span>
          </Link>
        </div>
      ))}
    </div>
  </div>
)

export default SubMenu
