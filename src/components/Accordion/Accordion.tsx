import React, { useState, useRef, useEffect, useId } from 'react'

import { AccordionType } from '@/components/Accordion/Accordion.type'

const Accordion: React.FC<AccordionType> = ({ title, content, open, variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(open)
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<string | number>('0px')

  useEffect(() => {
    const node = contentRef.current
    if (!isOpen || !node) {
      setMaxHeight('0px')
      return
    }
    const measure = () => setMaxHeight(node.scrollHeight)
    measure()
    const observer = new ResizeObserver(measure)
    if (node.firstElementChild) observer.observe(node.firstElementChild)
    return () => observer.disconnect()
  }, [isOpen])

  const toggleAccordion = () => setIsOpen(!isOpen)
  const reactId = useId()
  const panelId = `accordion-panel-${reactId}`
  const buttonId = `accordion-button-${reactId}`

  return (
    <div className={`w-full border-b border-border-subtle transition-colors duration-200 ${variant === 'faq' ? 'border-border-subtle/80' : ''}`}>
      {/* ETAPA SEO 08: pergunta como H3 (subordinada ao H2 da seção de FAQ)
          envolvendo o controle real <button>. Visual padronizado no DS. */}
      <h3 className="t-h4 text-text-primary">
        <button
          type="button"
          id={buttonId}
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={`bc-focus-ring group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-normal transition-colors duration-fast ease-bc hover:text-text-accent ${isOpen ? 'text-text-accent' : ''}`}
        >
          <span>{title}</span>
          <span
            aria-hidden="true"
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-subtle text-lg font-light leading-none text-bc-primary transition-[transform,border-color] duration-normal ease-bc group-hover:border-bc-primary ${isOpen ? 'rotate-45 border-bc-primary' : ''}`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-slow ease-bc motion-reduce:transition-none"
        style={{ maxHeight }}
      >
        <div className="max-w-[68ch] pb-6 pr-14 t-body leading-relaxed text-text-secondary">{content}</div>
      </div>
    </div>
  )
}


export default Accordion
