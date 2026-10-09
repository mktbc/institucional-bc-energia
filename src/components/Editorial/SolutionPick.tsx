import Link from '@/components/Link'

export type SolutionPickItem = {
  href: string
  title: string
  description?: string
  target?: string
  ariaLabel?: string
  /** Atributos de tracking já usados por cada página (data-cta-*, data-tracking-label). */
  tracking: Record<string, string>
}

/**
 * Solução indicada em cartão de destaque + soluções complementares como
 * linhas clicáveis (título, descrição e seta), no mesmo padrão da lista de
 * soluções da Home. Usada pelas páginas de segmento e pelas regionais.
 */
const SolutionPick = ({ lead, rest, dark = false }: { lead: SolutionPickItem; rest: Array<SolutionPickItem>; dark?: boolean }) => {
  const external = (item: SolutionPickItem) =>
    item.target === '_blank' ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <div className={`bc-sol${dark ? ' bc-sol--dark' : ''}`}>
      <div className="bc-sol-lead">
        <p className="bc-sol-tag">Solução indicada</p>
        <h3>{lead.title}</h3>
        {lead.description ? <p className="bc-sol-text">{lead.description}</p> : null}
        <Link href={lead.href} {...external(lead)} aria-label={lead.ariaLabel} className="bc-sol-cta" {...lead.tracking}>
          Ver a solução
        </Link>
      </div>

      {rest.length ? (
        <ul className="bc-sol-list">
          {rest.map((item) => (
            <li key={item.href}>
              <Link href={item.href} {...external(item)} aria-label={item.ariaLabel} className="bc-sol-item grid" {...item.tracking}>
                <span>
                  <h3>{item.title}</h3>
                  {item.description ? <p>{item.description}</p> : null}
                </span>
                <span className="bc-sol-go" aria-hidden="true">{item.target === '_blank' ? '↗' : '→'}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default SolutionPick
