import { useEffect, useState } from 'react'

import { getNumbers } from '@/services'

import ProofBand from './ProofBand'
import type { SectionGraphic } from './ProductSection'

type NumberItem = { title?: string; subtitle?: string }

export type ProductProofProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  /** Mesmo `context` consumido pela seção Numbers — dados reais preservados. */
  context: string
  title: string
  description?: string
  /** Link editorial (não é botão sólido — o sólido fica no hero e no fechamento). */
  link?: { label: string; href: string; target?: string }
  id?: string
}

/**
 * VISUAL 11 — prova antecipada da página de produto.
 *
 * Faixa escura compacta, logo depois da proposta, com as MESMAS métricas do
 * serviço `getNumbers` (nenhum dado novo). Amarelo apenas sobre fundo escuro.
 */
const ProductProof = ({
  context,
  title,
  description,
  link,
  id
}: ProductProofProps) => {
  const [data, setData] = useState<NumberItem[]>([])

  useEffect(() => {
    let active = true
    getNumbers(context).then((res) => {
      if (active) setData(res)
    })
    return () => {
      active = false
    }
  }, [context])

  return (
    <ProofBand
      id={id}
      title={title}
      description={description}
      link={link}
      ctaLocation="product_proof"
      items={data}
    />
  )
}

export default ProductProof
