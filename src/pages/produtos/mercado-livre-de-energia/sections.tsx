import { ReactNode } from 'react'

import { CheckList, ItemGrid } from '@/components/Editorial'
import ProductSection, { type ProductSectionTone } from '@/components/Product/ProductSection'

type Item = { title: string; description?: string }

const SectionHead = ({
  eyebrow,
  title,
  className = '',
  titleWidth = 'max-w-[18ch]'
}: {
  eyebrow?: string
  title: ReactNode
  className?: string
  titleWidth?: string
}) => (
  <div className={className}>
    {eyebrow ? <p className="t-eyebrow text-bc-primary">{eyebrow}</p> : null}
    <h2 className={`${titleWidth} t-h2 text-text-primary`}>{title}</h2>
  </div>
)

/**
 * Benefícios do Mercado Livre — cabeçalho dividido (título à esquerda, a
 * conclusão principal à direita) e os demais benefícios numerados.
 */
export const BenefitsEditorial = ({
  eyebrow,
  title,
  items,
  tone = 'surface'
}: {
  eyebrow?: string
  title: ReactNode
  items: Array<Item>
  tone?: ProductSectionTone
}) => {
  const [lead, ...rest] = items

  return (
    <ProductSection tone={tone}>
      <div className="bc-split-head">
        <SectionHead eyebrow={eyebrow} title={title} />
        {lead ? (
          <div className="bc-split-aside">
            <h3 className="bc-split-lead">{lead.title}</h3>
            {lead.description ? <p>{lead.description}</p> : null}
          </div>
        ) : null}
      </div>
      {rest.length ? <ItemGrid items={rest} /> : null}
    </ProductSection>
  )
}

/**
 * Contexto do mercado — título e introdução lado a lado, "Participantes" em
 * destaque na coluna da introdução e os aspectos numerados em grade.
 */
export const MarketContext = ({
  eyebrow,
  title,
  description,
  participants,
  items,
  image,
  tone = 'soft'
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  participants?: Item
  /** Foto de apoio sob o título, na coluna que ficava vazia ao lado do texto longo. */
  image?: { src: string; alt: string }
  items: Array<Item>
  tone?: ProductSectionTone
}) => (
  <ProductSection tone={tone}>
    {/* Com foto: foto à esquerda acompanhando a altura do texto (topo e base
        alinhados); sem foto: título à esquerda e introdução à direita. */}
    <div className={image ? 'bc-media-split' : 'bc-split-head'}>
      {image ? (
        <div className="bc-fill-media">
          <img src={image.src} alt={image.alt} width={1600} height={1066} loading="lazy" decoding="async" />
        </div>
      ) : null}
      {image ? (
        <div>
          <SectionHead eyebrow={eyebrow} title={title} titleWidth="max-w-[20ch]" />
          <div className="bc-split-aside mt-6">
            {description ? <p>{description}</p> : null}
            {participants ? (
              <div className="bc-callout">
                <p className="bc-callout-label">{participants.title}</p>
                <p>{participants.description}</p>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          <SectionHead eyebrow={eyebrow} title={title} titleWidth="max-w-[16ch]" />
          <div className="bc-split-aside">
            {description ? <p>{description}</p> : null}
            {participants ? (
              <div className="bc-callout">
                <p className="bc-callout-label">{participants.title}</p>
                <p>{participants.description}</p>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
    <ItemGrid items={items} />
  </ProductSection>
)

/**
 * "Para quem é" — título e critérios lado a lado; perfis numerados abaixo.
 */
export const ProfilesEditorial = ({
  eyebrow,
  title,
  requirements,
  items,
  tone = 'surface'
}: {
  eyebrow?: string
  title: ReactNode
  requirements?: Array<string>
  items: Array<Item>
  tone?: ProductSectionTone
}) => (
  <ProductSection tone={tone}>
    <div className="bc-split-head">
      <SectionHead eyebrow={eyebrow} title={title} />
      {requirements?.length ? (
        <div className="bc-split-aside">
          <p className="bc-callout-label">Critérios principais</p>
          <CheckList items={requirements} />
        </div>
      ) : null}
    </div>
    <ItemGrid items={items} />
  </ProductSection>
)

/**
 * Portfólio — título e descrição lado a lado; modalidades em lista de duas
 * colunas com filetes.
 */
export const PortfolioEditorial = ({
  eyebrow,
  title,
  description,
  items,
  tone = 'soft'
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  items: Array<string>
  tone?: ProductSectionTone
}) => (
  <ProductSection tone={tone}>
    <div className="bc-split-head">
      <SectionHead eyebrow={eyebrow} title={title} />
      {description ? (
        <div className="bc-split-aside">
          <p>{description}</p>
        </div>
      ) : null}
    </div>
    <CheckList items={items} grid />
  </ProductSection>
)
