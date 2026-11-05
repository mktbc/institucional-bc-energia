import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { ButtonLink } from '@/components/ButtonLink'
import Container from '@/components/Container/Container'
import Link from '@/components/Link'
import {
  HEADER_CLIENT_LINK,
  HEADER_CTA,
  MAIN_NAV,
  isNavEntryActive
} from '@/config/navigation'

import MobileMenu from './MobileMenu'
import NavDropdown from './NavDropdown'
import { useScrolled } from './useScrolled'

/**
 * Navegação principal do site (desktop + mobile), derivada de
 * `src/config/navigation.ts` — nenhuma lista de links duplicada.
 */
const Navbar = () => {
  const scrolled = useScrolled(24)
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [pathname])

  return (
    <div
      data-solid={scrolled || open ? '' : undefined}
      className={`bc-navbar relative isolate border-b transition-[background-color,border-color,box-shadow] duration-normal ease-bc ${
        scrolled || open || pathname === '/'
          ? 'border-bc-cyan/20 bg-bc-dark shadow-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      {/* Véu de leitura sobre o Hero: a navegação é branca e pode cair sobre
          fotografia clara. Efeito funcional — sai assim que a barra fica sólida. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[140%] bg-gradient-to-b from-bc-dark/70 via-bc-dark/30 to-transparent transition-opacity duration-normal ease-bc ${
          scrolled || open || pathname === '/' ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <Container className="flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Página inicial do Grupo BC Energia"
          className="bc-logo-clearspace flex h-16 shrink-0 items-center transition-all duration-normal ease-bc"
        >
          <img
            src="/logo-bc-energia.svg"
            alt="Grupo BC Energia"
            width={211}
            height={37}
            className="h-[26px] w-auto lg:h-[30px]"
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden flex-1 items-center justify-center lg:flex xl:gap-1"
        >
          {MAIN_NAV.map((entry) => {
            const active = isNavEntryActive(entry, pathname)

            return entry.groups?.length ? (
              <NavDropdown key={entry.id} entry={entry} active={active} />
            ) : (
              <Link
                key={entry.id}
                href={entry.href}
                aria-label={entry.label}
                aria-current={active ? 'page' : undefined}
                className={`relative flex min-h-11 items-center whitespace-nowrap rounded-md px-2 t-action-label transition-colors duration-fast xl:px-2.5 ${
                  active
                    ? 'text-bc-cyan after:absolute after:inset-x-2 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-bc-cyan xl:after:inset-x-2.5'
                    : 'text-white/90 hover:text-bc-cyan'
                }`}
              >
                {entry.labelShort ? (
                  <>
                    <span className="xl:hidden">{entry.labelShort}</span>
                    <span className="hidden xl:inline">{entry.label}</span>
                  </>
                ) : (
                  entry.label
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <a
            href={HEADER_CLIENT_LINK.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center whitespace-nowrap t-action-label text-white/75 underline-offset-4 transition-colors duration-fast hover:text-white hover:underline lg:inline-flex"
          >
            {HEADER_CLIENT_LINK.label}
          </a>
          <ButtonLink href={HEADER_CTA.href} variant="primary" size="md" className="whitespace-nowrap px-3 xl:px-4">
            {HEADER_CTA.label}
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-white lg:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            {open ? (
              <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        pathname={pathname}
        returnFocusRef={toggleRef}
      />
    </div>
  )
}

export default Navbar
