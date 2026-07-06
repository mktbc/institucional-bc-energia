import { FC, useEffect, useState } from 'react'

import { ButtonLink } from '@/components'
import Image from '@/components/Image'
import Link from '@/components/Link'

import { itemsData } from '../Items.data'
import { MenuItem } from './MenuItem'
import {
  navbarStyles,
  navbarContainerStyles,
  navbarItemsStyles,
  navbarBtnItemsStyles,
  navbarBtnMobileStyles
} from './Navbar.style'

const NavBar: FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => setScrollPosition(window.pageYOffset)
  const scroll = scrollPosition > 200 || false
  const [open, setOpen] = useState<boolean>(false)

  // Usado para alterar a cor do menu ao rolar a página
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleCloseMenu = (v: boolean) => {
    if (!v) setOpen(false)
  }

  return (
    <nav className={`${navbarStyles({ scroll })} navbar-mobile`}>
      <div className={navbarContainerStyles({ scroll })}>
        <Link href="/">
          <Image
            className="w-20 lg:w-[7.188rem]"
            src="/Logo-BC-Energia-Vertical-Branco.svg"
            alt="BC Energia"
            width={115}
            height={66}
            priority
          />
        </Link>
        <div onClick={() => setOpen(!open)} className={navbarBtnMobileStyles()}>
          <Image
            className="w-20 lg:w-auto"
            src="/img/icons/icon-menu.svg"
            alt="Menu"
            width={20}
            height={20}
            priority
          />
        </div>
      </div>
      <div className={`${navbarItemsStyles({ open })} submenu-mobile ${open ? 'open' : 'close'}`}>
        <div className="flex flex-col">
          {itemsData.map((item) => (
            <MenuItem key={item.id} {...item} onSubMenuOpen={handleCloseMenu} />
          ))}
        </div>
        <div className={navbarBtnItemsStyles()}>
          <hr className="opacity-30" />
          <ButtonLink
            block
            size="sm"
            href="https://wa.me/556239992050?text=Ol%C3%A1%2C%20vim%20pelo%20site.%20Gostaria%20de%20ser%20atendido.%0A%0AAten%C3%A7%C3%A3o%3A%20Para%20melhor%20direcionamento%20da%20sua%20conversa%2C%20n%C3%A3o%20apague%20essa%20mensagem."
            outline
            variant="light"
            target="_blank"
            rel="noopener noreferrer"
          >
            Já sou cliente
          </ButtonLink>
          <ButtonLink block size="sm" href="/contato" outline variant="light">
            Quero Economizar
          </ButtonLink>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
