import { PageHeader, Section } from '@/components'

const Blog = () => (
  <>
    <PageHeader
      title="Blog"
      description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate dignissimos earum, esse eum illum impedit"
      bgImage="/img/pages/contact.jpeg"
    />
    <Section className="bg-white">
      <h2 className="mb-4 text-center text-4xl">Seção 2</h2>
      <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate dignissimos
        earum, esse eum illum, impedit, modi nobis nulla odit quam quibusdam velit veritatis.
        Accusamus eaque nam necessitatibus numquam quidem.
      </p>
    </Section>
  </>
)

export default Blog
