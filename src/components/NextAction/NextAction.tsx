import Link from '@/components/Link'
import Container from '@/components/Container/Container'
import { trackNextAction } from '@/lib/analytics'

export type NextActionProps = {
  /** Frase curta de apoio (opcional). Ex.: "Ainda está avaliando?" */
  prompt?: string
  /** Âncora sempre descritiva — nunca "saiba mais". */
  label: string
  href: string
  /** Mantido por compatibilidade com os call sites; a ação usa o estilo secundário. */
  intent?: 'baixa' | 'media' | 'alta'
  /** Identificador do clique no data layer. */
  tracking: string
  /** Envolve em Container quando usado como faixa entre seções. */
  standalone?: boolean
  className?: string
}

/**
 * Próxima ação natural ao fim de uma seção.
 *
 * Link secundário com apresentação de botão em contorno; o CTA principal da
 * página continua reservado ao componente de conversão.
 */
const NextAction = ({
  prompt,
  label,
  href,
  tracking,
  standalone = false,
  className = ''
}: NextActionProps) => {
  const content = (
    <div className={standalone ? '' : className}>
      {prompt ? <p className="font-sans t-body-sm text-text-secondary">{prompt}</p> : null}
      <Link
        href={href}
        data-cta-name={tracking}
        onClick={() => trackNextAction({ action_name: tracking, destination: href })}
        className="bc-arrow-action mt-2 t-action-label focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        {label}
      </Link>
    </div>
  )

  if (!standalone) return content

  return (
    <div className={`bg-surface-subtle py-7 lg:py-8 ${className}`}>
      <Container>{content}</Container>
    </div>
  )
}

export default NextAction
