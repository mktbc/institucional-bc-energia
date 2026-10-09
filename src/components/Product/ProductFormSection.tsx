import { ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader/SectionHeader'

import ProductSection from './ProductSection'

export type ProductFormSectionProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  /** Apoio de contato separado dos campos, quando solicitado pela página. */
  support?: ReactNode
  id?: string
  /** Largura máxima do card do formulário. */
  maxWidth?: string
}

/**
 * Contêiner visual único dos formulários de produto.
 *
 * O formulário em si (campos, validação, integração e tracking) permanece
 * intocado — apenas ganha superfície, borda e raio do Design System.
 */
const ProductFormSection = ({
  eyebrow = 'Próximo passo',
  title,
  description,
  children,
  support,
  id = 'contato',
  maxWidth = 'measure-intro'
}: ProductFormSectionProps) => (
  <ProductSection tone="muted" id={id}>
    <SectionHeader eyebrow={eyebrow} title={title} description={description} align="center" />

    {support}

    <div
      className={`bc-form-surface mx-auto mt-7 w-full ${maxWidth} overflow-hidden rounded-card border border-border-subtle bg-surface p-6 shadow-sm sm:p-8`}
    >
      {children}
    </div>
  </ProductSection>
)

export default ProductFormSection
