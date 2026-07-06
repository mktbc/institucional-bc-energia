import { Helmet } from 'react-helmet-async'

/**
 * Define título e meta description da página (substitui o `metadata` /
 * `generateMetadata` do App Router do Next). Usa react-helmet-async.
 */
export type SeoProps = {
  title?: string
  description?: string
}

const Seo = ({ title, description }: SeoProps) => (
  <Helmet>
    {title ? <title>{title}</title> : null}
    {description ? <meta name="description" content={description} /> : null}
  </Helmet>
)

export default Seo
