import { useEffect, useState } from 'react'

import ProofBand from '@/components/Product/ProofBand'
import type { SectionGraphic } from '@/components/Product/ProductSection'
import { getNumbers } from '@/services'

type NumberItem = { title?: string; subtitle?: string }

export type ProofInstitucionalProps = {
  graphic?: SectionGraphic
  context: string
  title: string
  description?: string
  link?: { label: string; href: string; target?: string }
  id?: string
}

/**
 * Redesign pontual da faixa institucional de prova (somente esta página).
 * Conteúdo, dados, rotas e tracking preservados — apenas arquitetura visual.
 */
const ProofInstitucional = ({
  context,
  title,
  description,
  link,
  id
}: ProofInstitucionalProps) => {
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

export default ProofInstitucional
