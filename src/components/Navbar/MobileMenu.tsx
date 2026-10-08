import { useEffect, useRef, useState } from 'react'

import { ButtonLink } from '@/components/ButtonLink'
import Link from '@/components/Link'
import {
  HEADER_CLIENT_LINK,
  HEADER_CTA,
  MAIN_NAV,
  isNavEntryActive,
  type NavEntry
} from '@/config/navigation'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  pathname: string
  /** Botão que abriu o painel (para devolver o foco ao fechar). */
  returnFocusRef: React.RefObject<HTMLButtonElement>
}

const linkTargetProps = (external?: boolean) =>
  external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

/** Item com filhos: link para o hub + accordion com os destinos. */
const MobileEntry = ({ entry, active, onClose }: { entry: NavEntry; active: boolean; onClose: () => void }) => {
  const [expanded, setExpanded] = useState(active)
  const panelId = `mobile-panel-${entry.id}`

  if (!entry.groups?.length) {
    return (
      <Link
        href={entry.href}
        onClick={onClose}
        aria-current={active ? 'page' : undefined}
        className={`flex min-h-[52px] items-center border-b border-white/10 t-label uppercase tracking-wide transition-colors duration-fast ${
          active
            ? 'border-l-2 border-l-bc-cyan pl-3 text-bc-cyan'
            : 'pl-0 text-white'
        }`}
      >
        {entry.label}
      </Link>
    )
  }

  return (
    <div className="border-b border-white/10">
      <div className="flex items-center justify-between gap-2">
        <Link
          href={entry.href}
          onClick={onClose}
          aria-current={active ? 'page' : undefined}
          className={`flex min-h-[52px] flex-1 items-center t-label uppercase tracking-wide transition-colors duration-fast ${
            active ? 'border-l-2 border-l-bc-cyan pl-3 text-bc-cyan' : 'pl-0 text-white'
          }`}
        >
          {entry.label}
        </Link>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={`${expanded ? 'Fechar' : 'Abrir'} opções de ${entry.label}`}
          onClick={() => setExpanded((value) => !value)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-white/80 transition-colors duration-fast hover:text-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 12 8"
            className={`h-2.5 w-4 transition-transform duration-fast motion-reduce:transition-none ${expanded ? 'rotate-180' : ''}`}
            fill="none"
          >
            <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div id={panelId} hidden={!expanded} className="pb-3">
        {entry.groups.map((group, index) => (
          <div key={group.label ?? index}>
            {group.label ? (
              <p className="pb-1 pt-2 t-caption font-semibold tracking-[0.14em] text-white/50">
                {group.label}
              </p>
            ) : null}
            <ul>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    {...linkTargetProps(link.external)}
                    className={`flex min-h-11 items-center rounded-md pl-1 t-body-sm transition-colors duration-fast hover:text-bc-cyan ${ group.secondary ? 'text-white/70' : 'text-white/90' }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {entry.viewAll ? (
          <Link
            href={entry.viewAll.href}
            onClick={onClose}
            className="bc-arrow-action bc-arrow-action--dark flex min-h-11 items-center t-label"
          >
            {entry.viewAll.label}
          </Link>
        ) : null}
      </div>
    </div>
  )
}

/**
 * Painel de navegação mobile (drawer full-screen abaixo do Header).
 * Escape fecha, foco volta ao botão, scroll do body bloqueado enquanto aberto.
 */
const MobileMenu = ({ open, onClose, pathname, returnFocusRef }: MobileMenuProps) => {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        returnFocusRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose, returnFocusRef])

  return (
    <div
      id="menu-mobile"
      ref={panelRef}
      hidden={!open}
      className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-bc-dark px-6 pb-10 pt-2 lg:hidden"
    >
      <nav aria-label="Navegação principal (mobile)">
        {MAIN_NAV.map((entry) => (
          <MobileEntry key={entry.id} entry={entry} active={isNavEntryActive(entry, pathname)} onClose={onClose} />
        ))}
      </nav>

      <div className="mt-6 flex flex-col gap-3">
        <ButtonLink block size="lg" href={HEADER_CTA.href} variant="primary" onClick={onClose}>
          {HEADER_CTA.labelLong}
        </ButtonLink>
        <a
          href={HEADER_CLIENT_LINK.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center justify-center t-label text-white/80 underline-offset-4 hover:underline"
        >
          {HEADER_CLIENT_LINK.label}
        </a>
      </div>
    </div>
  )
}

export default MobileMenu
