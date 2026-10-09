import { ReactNode } from 'react'

import Accordion from '@/components/Accordion/Accordion'
import type { AccordionType } from '@/components/Accordion/Accordion.type'
import BCIcon from '@/components/BCIcon/BCIcon'
import type { BCIconName } from '@/config/icons'
import { CheckList, ItemGrid } from '@/components/Editorial'
import ProductSection, { type ProductSectionTone } from '@/components/Product/ProductSection'
import SectionHeader from '@/components/SectionHeader/SectionHeader'

type Item = { title: string; description?: string }

/**
 * Seções editoriais exclusivas de /produtos/consorcio-bc-energia.
 *
 * REVISÃO GLOBAL (brandbook): menos traços e divisórias, tipografia oficial
 * via tokens globais (Barlow Condensed em títulos/numerais, Onest no corpo),
 * elementos de apoio sutis e iconografia institucional em teal.
 * Textos, links, SEO e tracking inalterados.
 */

const SOURCE_ICONS: Array<BCIconName> = [
  'energia-solar',
  'energia-eolica',
  'ciclo-recursos',
  'energia-limpa',
  'ciclo-energia-renovavel'
]



/** Benefícios: título à esquerda, número de impacto e benefício principal à direita; demais numerados. */
export const BenefitsEditorial = ({
  eyebrow,
  title,
  items,
  highlightValue,
  highlightLabel,
  tone = 'surface',
  id
}: {
  eyebrow?: string
  title: ReactNode
  items: Array<Item>
  /** Número de impacto do benefício principal (ex.: "até 25%"). */
  highlightValue?: string
  /** Mensagem curta ao lado do número. */
  highlightLabel?: string
  tone?: ProductSectionTone
  id?: string
}) => {
  const [lead, ...rest] = items

  return (
    <ProductSection tone={tone} className="bc-consortium-benefits" id={id}>
      <div className="bc-split-head">
        <SectionHeader eyebrow={eyebrow} title={title} />
        {lead ? (
          <div className="bc-split-aside">
            {highlightValue ? <p className="bc-split-metric">{highlightValue}</p> : null}
            <h3 className="bc-split-lead">{highlightLabel ?? lead.title}</h3>
            {lead.description ? <p>{lead.description}</p> : null}
          </div>
        ) : null}
      </div>
      {rest.length ? <ItemGrid items={rest} /> : null}
    </ProductSection>
  )
}

/** Contexto: título e introdução lado a lado; fontes de energia em destaque; itens numerados. */
export const ContextEditorial = ({
  eyebrow,
  title,
  description,
  items,
  tone = 'soft',
  id
}: {
  eyebrow?: string
  title: ReactNode
  description?: string
  items: Array<Item>
  tone?: ProductSectionTone
  id?: string
}) => {
  const [lead, ...rest] = items

  return (
    <ProductSection tone={tone} id={id}>
      <div className="bc-split-head">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="bc-split-aside">
          {description ? <p>{description}</p> : null}
          {lead ? (
            <div className="bc-callout">
              <p className="bc-callout-label">{lead.title}</p>
              {lead.description ? <p>{lead.description}</p> : null}
              <div className="mt-4 flex flex-wrap items-center gap-6">
                {SOURCE_ICONS.map((icon) => (
                  <BCIcon key={icon} name={icon} size={30} className="opacity-90" />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {rest.length ? <ItemGrid items={rest} columns={rest.length % 2 === 0 ? 2 : 3} /> : null}
    </ProductSection>
  )
}

/** Perfis: título e critérios lado a lado; perfis atendidos numerados. */
export const ProfilesEditorial = ({
  eyebrow,
  title,
  requirements,
  items,
  tone = 'surface',
  id
}: {
  eyebrow?: string
  title: ReactNode
  requirements: Array<string>
  items: Array<Item>
  tone?: ProductSectionTone
  id?: string
}) => (
  <ProductSection tone={tone} id={id}>
    <div className="bc-split-head">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="bc-split-aside">
        <p className="bc-callout-label">Critérios principais</p>
        <CheckList items={requirements} />
      </div>
    </div>
    <ItemGrid items={items} columns={items.length % 2 === 0 ? 2 : 3} />
  </ProductSection>
)

/** FAQ: mesmo padrão de lista do restante do site (título à esquerda, perguntas à direita). */
export const FaqEditorial = ({
  eyebrow = 'Perguntas frequentes',
  title = 'Dúvidas mais comuns',
  items,
  tone = 'muted',
  id = 'faq'
}: {
  eyebrow?: string
  title?: ReactNode
  items: Array<AccordionType>
  tone?: ProductSectionTone
  id?: string
}) =>
  items.length === 0 ? null : (
    <ProductSection tone={tone} id={id}>
      <div className="bc-faq-composition">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div>
          {items.map((item, index) => (
            <Accordion key={item.title} open={index === 0} title={item.title} content={item.content} />
          ))}
        </div>
      </div>
    </ProductSection>
  )
