import { ReactNode } from 'react'

import { CheckList, EditorialIndex, ItemGrid } from '@/components/Editorial'

import ProductSection, { type ProductSectionTone } from './ProductSection'
import type { ProductAudienceItem } from './ProductAudience'

export type ProductProfilesProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  items: Array<ProductAudienceItem>
  requirements?: Array<string>
  tone?: ProductSectionTone
  id?: string
}

/**
 * VISUAL 11 — "para quem é" em colunas tipográficas.
 *
 * Mesmos perfis e requisitos já publicados, sem grid de cards e sem ícones.
 */
const ProductProfiles = ({
  eyebrow,
  title,
  description,
  items,
  requirements,
  tone = 'surface',
  id
}: ProductProfilesProps) => (
  <ProductSection tone={tone} id={id}>
    <EditorialIndex
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      {requirements?.length ? (
        <div className="mb-12">
          <CheckList items={requirements} />
        </div>
      ) : null}
      <ItemGrid items={items} />
    </EditorialIndex>
  </ProductSection>
)

export default ProductProfiles
