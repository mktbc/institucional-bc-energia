import { Container } from '@/components'
import { buttonStyles } from '@/components/Button/Button.style'
import Link from '@/components/Link'
import Seo from '@/components/Seo'
import { NOT_FOUND_META } from '@/config/meta'

/**
 * Página Not Found (rota `*` e rotas dinâmicas com parâmetro inválido).
 *
 * SEO (ETAPA SEO 06):
 *  - metadata própria (nunca a da Home);
 *  - robots noindex,nofollow em qualquer ambiente;
 *  - sem canonical (não existe URL válida para uma rota inexistente);
 *  - sem JSON-LD de página válida;
 *  - H1 textual ("Página não encontrada"), o "404" é apenas visual.
 *
 * Visual: campo navy institucional, "404" tratado como métrica (Barlow
 * Condensed) e os três destinos com hierarquia — retomar a navegação é a
 * ação principal. Nenhum destino ou texto foi alterado.
 */
const NotFound = () => (
  <div className="bc-not-found flex min-h-[70vh] w-full items-center bg-surface-dark py-20 text-text-inverse lg:py-28">
    <Seo
      title={NOT_FOUND_META.title}
      description={NOT_FOUND_META.description}
      noindex
      nofollow
    />

    <Container width="narrow">
      <p aria-hidden="true" className="t-metric-xl text-bc-cyan/35">
        404
      </p>

      <h1 className="mt-3 t-h2-lead max-w-[16ch] text-white">Página não encontrada</h1>

      <p className="mt-4 max-w-[52ch] t-body-lg text-white/80">
        A página que você tentou acessar não foi encontrada ou não existe mais.
      </p>

      <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <Link className={buttonStyles({ variant: 'primary', size: 'lg' })} href="/">
          Retornar para home
        </Link>
        <Link className={buttonStyles({ variant: 'outline', size: 'lg' })} href="/produtos">
          Conhecer as soluções
        </Link>
        <Link className={buttonStyles({ variant: 'light', size: 'lg' })} href="/contato">
          Falar com a BC Energia
        </Link>
      </div>
    </Container>
  </div>
)

export default NotFound
