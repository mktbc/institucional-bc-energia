import { useEffect, useState } from 'react'

import { logos } from '@/components/Customers/Customers.data'
import LogoStrip from '@/components/Customers/LogoStrip'
import ProofBand from '@/components/Product/ProofBand'
import { getNumbers } from '@/services'

import type { SectionGraphic } from '@/components/Product/ProductSection'

type NumberItem = { title?: string; subtitle?: string }

export type SegmentProofProps = {
  /** Elemento oficial de apoio da seção — VISUAL SYSTEM 02. */
  graphic?: SectionGraphic
  /** Mesmo `context` consumido pela seção Numbers — dados reais preservados. */
  context?: string
  title: string
  description?: string
  /** Link editorial (o CTA sólido fica no hero e no fechamento). */
  link?: { label: string; href: string; target?: string }
  /** Quantidade de logos exibidos na faixa compacta. */
  logoLimit?: number
  id?: string
}

const selectLogos = (limit: number) => {
  const featured = logos.filter((logo) => logo.featured)
  const rest = logos.filter((logo) => !logo.featured)
  return [...featured, ...rest].slice(0, limit)
}

/**
 * VISUAL 12 — prova antecipada das páginas de segmento.
 *
 * Faixa escura compacta com as MESMAS métricas de `getNumbers` (nenhum dado
 * novo) e, logo abaixo, a faixa de logos reais dos clientes — sem cards.
 * Amarelo apenas sobre fundo escuro.
 */
const SegmentProof = ({
  context = 'segmentos',
  title,
  description,
  link,
  logoLimit = 8,
  id
}: SegmentProofProps) => {
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
    <>
      <ProofBand
        id={id}
        title={title}
        description={description}
        link={link}
        ctaLocation="segment_proof"
        items={data}
      />

      {/* Mesma faixa institucional de clientes do restante do site. */}
      <section className="bc-client-strip bc-level-support bg-surface">
        <div className="bc-container">
          <p className="t-eyebrow text-bc-primary">Empresas que confiam na BC</p>
          <LogoStrip logos={selectLogos(logoLimit)} label="Empresas que confiam na BC" />
        </div>
      </section>
    </>
  )
}


export default SegmentProof
