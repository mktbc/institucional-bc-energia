import { useEffect, useState } from 'react'

import { ButtonLink, Heading, Section } from '@/components'
import { getNumbers } from '@/services'
import Image from '@/components/Image'

import { NumbersProps } from './Numbers.type'

type NumberItem = { title?: string; subtitle?: string }

const Numbers = ({
  children,
  btnText,
  btnLink,
  context,
  subTitle,
  bgImage,
  target
}: NumbersProps) => {
  // Antes: Server Component async (const data = await getNumbers(context)).
  // Agora: client component com estado (dados vêm de mock — ver services/salesForce).
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
      <Section bgImage={bgImage || ''} id="home_numeros" className="bg-teal-600" arrowMask>
        <div className="m-auto mb-12 flex w-full flex-col gap-12 text-center lg:w-3/4">
          <Image
            className="mx-auto"
            src={`/img/global/grupo-bc-logo-solo-branca.svg`}
            alt="Grupo BC Energia"
            width={64}
            height={46}
          />
          <Heading className="mb-0 text-white">{children}</Heading>
        </div>

        <div className="mb-20 text-center">
          {subTitle && (
            <h4 className="mb-10 mt-16 text-3xl uppercase text-white lg:mb-16 lg:mt-20 lg:text-4xl">
              {subTitle}
            </h4>
          )}
          <div className="flex flex-col justify-center gap-20 text-white lg:flex-row">
            {!!data.length &&
              data.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h5 className="text-4xl text-amber-400 lg:text-5xl">{item.title}</h5>
                  <p className="text-lg lg:text-xl">{item.subtitle}</p>
                </div>
              ))}
          </div>
        </div>
        <ButtonLink href={btnLink} target={target || '_self'} variant="secondary">
          {btnText}
        </ButtonLink>
      </Section>
    </>
  )
}

export default Numbers
