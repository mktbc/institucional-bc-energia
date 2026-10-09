# Hospedagem no Lovable — build, redirects, 404 e indexação

Registro da transferência do front-end redesenhado para a branch `Marketing-BC`
(projeto Lovable `31b1f24d-1190-4536-b641-eef4bdddc83d`).

- Origem: `mktbc/institucional-bc-energia@a7d0e6f0f248fd47719243f2a628a8b88248a993`
- Ponto de reversão (backup) da `Marketing-BC`: `ec3694e825a0c62c0b6768443d8deb45f744294e`

## Build

O Lovable pode não executar os hooks `prebuild`/`postbuild` do npm. Por isso o
script `build` faz tudo de forma explícita:

1. `scripts/generate-sitemap.ts` → `public/sitemap.xml` + `public/robots.txt`
2. `scripts/generate-llms.ts` → `public/llms.txt`
3. `vite build --mode production`
4. `scripts/prerender.ts` → `dist/<rota>/index.html`, `dist/<rota>.html` e `dist/404.html`

`tsx` é devDependency; `bun.lock` e `package-lock.json` foram regenerados com
`bun install --lockfile-only` e `npm install`.

## Redirects 301

Os redirects estão declarados em três lugares:

| Arquivo | Vale em | Tipo |
| --- | --- | --- |
| `vercel.json` | Vercel | 301 HTTP |
| `public/_redirects` | hospedagens que leem o formato Netlify/Cloudflare Pages | 301 HTTP |
| `src/App.tsx` (`Navigate`, `PdfRedirect`) | qualquer hospedagem, após o JS carregar | redirecionamento no cliente — **não é 301** |

Não há documentação oficial do Lovable confirmando suporte a `_redirects`,
`_headers`, 301 por caminho ou página 404 com status HTTP 404. A documentação
pública cita apenas redirect **302** entre domínios conectados (domínio
primário / www). Enquanto isso não for confirmado no domínio publicado, os
redirects de `/produtos/irec` e `/documentos/*` devem ser considerados
**somente via JavaScript** no Lovable.

## 404

`dist/404.html` é gerado com `noindex,nofollow`. Se a hospedagem servir esse
arquivo para rotas desconhecidas, o status será 404 real. Se ela fizer
fallback SPA (servir `index.html` com 200), a página "não encontrada" aparece,
mas o status HTTP continua 200 (soft 404).

## Indexação

- O build sai como produção por padrão (`src/config/seoEnv.ts`): HTML
  pré-renderizado com `index,follow` nas rotas indexáveis e robots.txt com
  `Allow: /` + `Sitemap`.
- Fora de `grupobcenergia.com.br`/`www`, inclusive `*.lovable.app`, o cliente
  aplica `noindex,nofollow` em runtime (`src/config/site.ts`). O HTML inicial
  desses previews ainda traz `index,follow` até o JS rodar.

## Verificar após publicar

Com `curl -I` em `*.lovable.app` e no domínio oficial:

- `/produtos/irec` e `/documentos/condicoes_gerais_gd` → esperado 301
- `/rota-inexistente` → esperado 404
- `/contato` → 200 com o HTML pré-renderizado (title/canonical da rota, não da Home)
