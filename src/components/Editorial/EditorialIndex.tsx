import { ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader/SectionHeader'

export type EditorialIndexProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  /** Conteúdo do cluster (lista, índice, grid de benefícios...). */
  children: ReactNode
  className?: string
}

/**
 * Cabeçalho dividido, como as seções da Home: eyebrow e título à esquerda,
 * descrição à direita; o conteúdo do cluster (itens, listas) vem abaixo.
 */
const EditorialIndex = ({
  eyebrow,
  title,
  description,
  as,
  children,
  className = ''
}: EditorialIndexProps) => (
  <div className={className}>
    <div className="bc-split-head">
      <SectionHeader eyebrow={eyebrow} title={title} as={as} />
      {description ? (
        <div className="bc-split-aside">
          <p>{description}</p>
        </div>
      ) : null}
    </div>
    {children}
  </div>
)

export default EditorialIndex
