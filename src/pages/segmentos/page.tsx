import React from 'react'

import { Heading, PageHeader, Section, ButtonLink } from '@/components'
import { segmentos } from '@/components/Navbar/Items.data'
import Image from '@/components/Image'

const Page = () => (
  <div className="min-h-screen">
    <PageHeader
      title="Segmentos"
      bgImage="/img/global/arrendamento-de-usinas.jpg"
      category="Segmentos"
    />
    <Section className="px-6 pt-0 lg:pt-4">
      <Heading subtitle="Segmentos">
        Conheça aqui algumas das soluções que oferecemos para redução na conta de energia para o seu
        segmento
      </Heading>

      <div className="mt-14 grid grid-cols-1 content-center items-center gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {segmentos.map((item) => (
          <div className="flex flex-col gap-4 rounded-lg bg-gray-200 p-8 text-center" key={item.id}>
            <Image
              className="mx-auto rounded bg-teal-600 p-4"
              src={`/img/icons/${item.icon?.url}`}
              alt="Icone"
              width={80}
              height={80}
            />
            <h3 className="text-2xl font-bold text-teal-900">{item.title}</h3>
            <p className="mb-4">{item.description}</p>
            <ButtonLink variant="green" size="md" href={item.url} target={item.target || '_self'}>
              Conheça
            </ButtonLink>
          </div>
        ))}
      </div>
    </Section>
  </div>
)

export default Page
