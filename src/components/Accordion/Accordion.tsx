import React, { useState, useRef, useEffect } from 'react'

import { AccordionType } from '@/components/Accordion/Accordion.type'

const Accordion: React.FC<AccordionType> = ({ title, content, open }) => {
  const [isOpen, setIsOpen] = useState(open)
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<string | number>('0px')

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight)
    } else {
      setMaxHeight('0px')
    }
  }, [isOpen])

  const toggleAccordion = () => setIsOpen(!isOpen)

  return (
    <div className="w-full p-4">
      <div
        onClick={toggleAccordion}
        className="flex cursor-pointer items-center justify-between rounded-md bg-gray-100 p-4"
      >
        <h2 className="text-lg font-semibold text-teal-900">{title}</h2>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      <div
        ref={contentRef}
        className="transition-max-height overflow-hidden duration-500 ease-in-out"
        style={{ maxHeight }}
      >
        <p className="mt-2 bg-white p-4 text-lg text-teal-800">{content}</p>
      </div>
    </div>
  )
}

export default Accordion
