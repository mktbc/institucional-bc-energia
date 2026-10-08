import Link from '@/components/Link'

/**
 * Estado vazio honesto e COMPACTO dos hubs de conteúdo (VISUAL 15).
 *
 * Enquanto não houver conteúdo real publicado, o hub NÃO exibe cards fictícios
 * nem "lorem ipsum": diz o que é a seção e oferece caminhos reais já existentes
 * no site. Ocupa poucas linhas — nunca uma seção inteira.
 */
type Props = {
  title: string
  description: string
  links: Array<{ label: string; href: string }>
}

const ContentEmptyState = ({ title, description, links }: Props) => (
  <div className="measure-body">
    <h2 className="t-h4 text-text-primary">{title}</h2>
    <p className="mt-3 t-body-sm text-text-secondary">{description}</p>

    {links.length > 0 && (
      <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="bc-arrow-action t-body-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default ContentEmptyState
