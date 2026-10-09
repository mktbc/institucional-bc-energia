import { ReactNode } from 'react'

import { EditorialIndex, ItemGrid } from '@/components/Editorial'

import ProductSection, { type ProductSectionTone } from './ProductSection'

export type ProductPoint = {
  title: string
  description?: string
}

export type ProductPointsProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  items: Array<ProductPoint>
  tone?: ProductSectionTone
  id?: string
  /** Colunas da lista secundária no desktop. */
  columns?: 1 | 2
}

/**
 * VISUAL 11 — benefícios/detalhes como lista editorial.
 *
 * Um ponto protagonista (tipografia maior) + demais em linhas com hairline.
 * Sem cards, sem sombra, sem ícone — o peso está no texto.
 */
const ProductPoints = ({
  eyebrow,
  title,
  description,
  items,
  tone = 'surface',
  id
}: ProductPointsProps) => {
  return (
    <ProductSection tone={tone} id={id}>
      <EditorialIndex eyebrow={eyebrow} title={title} description={description}>
        <ItemGrid items={items} columns={items.length === 2 || items.length === 4 ? 2 : 3} />
      </EditorialIndex>
    </ProductSection>
  )
}

export default ProductPoints
