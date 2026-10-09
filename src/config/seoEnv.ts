/**
 * Ambiente de SEO do build: decide se o HTML pré-renderizado e o robots.txt
 * saem liberados para indexação ("production") ou bloqueados ("preview").
 *
 * Padrão SEGURO PARA PRODUÇÃO: sem configuração, o build é de produção. Antes
 * o padrão era o inverso e um build sem VITE_SEO_ENV publicava
 * `noindex,nofollow` em todas as páginas e `Disallow: /` no robots.txt — o que
 * aconteceria em qualquer hospedagem que não definisse a variável.
 *
 * Bloqueio apenas quando explícito ou em preview conhecido:
 *  - VITE_SEO_ENV = preview | staging | development  → preview
 *  - VERCEL_ENV = preview | development (deploys de branch na Vercel) → preview
 * Em qualquer host fora de PRODUCTION_HOSTS o cliente ainda aplica
 * `noindex,nofollow` em runtime (src/config/site.ts), e o canonical aponta
 * sempre para o domínio oficial.
 */
export type SeoEnv = 'production' | 'preview'

export const resolveSeoEnv = (env: Record<string, string | undefined>): SeoEnv => {
  const explicit = env.VITE_SEO_ENV?.trim().toLowerCase()
  if (explicit === 'production') return 'production'
  if (explicit && ['preview', 'staging', 'development'].includes(explicit)) return 'preview'
  const vercel = env.VERCEL_ENV?.trim().toLowerCase()
  if (vercel === 'preview' || vercel === 'development') return 'preview'
  return 'production'
}
