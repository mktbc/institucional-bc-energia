# SEO técnico, SEO local, GEO/AIO e engajamento — rodada 2026-10

Escopo: otimizações técnicas sem alterar design, textos visíveis, regras de
negócio, formulários, simulador, Supabase ou rastreamento.

## Diagnóstico (problemas reais encontrados)

| # | Problema | Evidência | Status |
|---|---|---|---|
| 1 | Build sem `VITE_SEO_ENV=production` publicava `noindex,nofollow` no HTML de todas as páginas e `Disallow: /` no robots.txt | `site.ts` (SSR), `generate-sitemap.ts` | Corrigido: produção por padrão (`src/config/seoEnv.ts`); preview só com `VITE_SEO_ENV=preview` ou `VERCEL_ENV=preview` |
| 2 | Sem 301 reais: `/produtos/irec` e `/documentos/*` respondiam 200 com o HTML da Home e redirecionavam por JS | `vercel.json` sem `redirects` | Corrigido: 7 redirects 301 em `vercel.json` |
| 3 | Rewrites para `/` entregavam o HTML da Home (canonical `/`) em artigos, episódios e slugs inventados (soft-404) | `vercel.json` `rewrites` | Corrigido: rewrites removidos; artigos/episódios reais e `/design-system` pré-renderizados; slugs inexistentes → 404 |
| 4 | Pré-carregamento do banner apontava para o 2º slide em todas as páginas | `index.html` | Corrigido: preload só na Home, do 1º slide, por largura |
| 5 | `/contato/enviado` herdava título/descrição da Home | `meta.ts` | Corrigido |
| 6 | Organization sem razão social, CNPJ, endereços, contato e área atendida; regionais sem área atendida | `structuredDataBuilders.ts` | Corrigido (dados já publicados; fonte `src/data/company.ts`) |
| 7 | og:image padrão fora de 1200×630; quem-somos com retrato 448×625; segmentos/regionais com a mesma imagem | `meta.ts`, `site.ts` | Corrigido: `public/img/og/*.jpg` 1200×630 + width/height/alt |
| 8 | `<main>` aninhado no redirecionamento de PDF | `PdfRedirect.tsx` | Corrigido |

## Dados estruturados (JSON-LD)

- Organization (`/#organization`): Home, /contato, /sobre, /sobre/quem-somos — nome, razão social, CNPJ, logo, 2 endereços, WhatsApp oficial, estados de atuação, perfis oficiais.
- WebSite (`/#website`): Home. WebPage (`<url>#webpage`): toda página indexável, ligada a WebSite e Organization.
- BreadcrumbList; Service nas 5 soluções e nas 7 regionais (`areaServed` = cidade/estado); FAQPage só onde a FAQ é visível.
- Não emitidos por falta de dados reais (o que não impede a indexação das páginas): Article/BlogPosting (data, autor), VideoObject (data, duração), LocalBusiness (escritórios corporativos; usar só se confirmado atendimento ao público). Sem avaliações ou notas.

## GEO / AIO

- `public/llms.txt` (experimental, gerado no build a partir de rotas, metadados e dados institucionais). Não garante leitura nem citação.
- robots.txt de produção libera todos os agentes; nenhum conteúdo privado é exposto.

## Pendências (decisão ou acesso externo)

- CEP de Goiânia diverge: rodapé/contato `74810-240` × LGPD `74.810-100` (texto visível; confirmar).
- 4 números de WhatsApp diferentes; nenhum telefone fixo ou e-mail publicado.
- Artigo do blog: hoje está `noindex` por decisão editorial do projeto (`src/config/contentIndexing.ts`: lista `EDITORIAL_APPROVED` vazia e critérios internos que pedem data, autor e imagem). Tecnicamente, a ausência de autor, data ou schema Article **não impede** a indexação; liberar é decisão editorial. O schema Article só deve ser emitido se data e autor reais forem informados — nunca inventados.
- www→apex e http→https: configuração de domínio na hospedagem.
- Validação em produção (HTTP real, Search Console, Rich Results Test) após publicar.

## Sugestões que exigem mudança de conteúdo (não aplicadas)

1. H1 da Home não descreve o serviço; considerar H1 com "comercializadora de energia / Mercado Livre".
2. Regionais com poucos links internos (Anápolis e Trindade: 1 cada); linkar no rodapé ou na Home.
3. "O que é o Mercado Livre de Energia?" tem respostas diferentes na Home e na página do produto; unificar.
4. 6 títulos acima de ~60 caracteres podem ser truncados.

## Engajamento — medido × estimado

Medido (build local, 1440 px): palavras no `<main>`, altura em telas de 900 px, CTAs rastreados (`data-cta-name`), links internos únicos, acordeões, formulários/iframes.
Estimado: leitura = palavras ÷ 220 ppm. Não há GA4/RUM neste ambiente; a duração real de sessão só é medível em produção (GA4 `engagement_time_msec`, `scroll`, `cta_click`, `form_start`).

| Rota | Palavras | Leitura (min, est.) | Telas | CTAs | Links internos | Acordeões | Form/iframe |
|---|---|---|---|---|---|---|---|
| `/` | 668 | 3.0 | 11.3 | 38 | 27 | 5 | 0 |
| `/contato` | 274 | 1.2 | 3.6 | 1 | 1 | 0 | 1 |
| `/contato/enviado` | 30 | 0.1 | 1.5 | 2 | 3 | 0 | 0 |
| `/produtos` | 368 | 1.7 | 5.3 | 14 | 10 | 0 | 1 |
| `/produtos/mercado-livre-de-energia` | 1578 | 7.2 | 12.9 | 15 | 14 | 4 | 1 |
| `/produtos/consorcio-bc-energia` | 1302 | 5.9 | 10.4 | 7 | 13 | 0 | 1 |
| `/produtos/gestao-de-energia` | 838 | 3.8 | 8.1 | 4 | 10 | 0 | 1 |
| `/produtos/certificacao-renovavel-irec` | 697 | 3.2 | 6.8 | 4 | 10 | 0 | 1 |
| `/produtos/arrendamento-de-usinas` | 717 | 3.3 | 7.6 | 4 | 6 | 0 | 1 |
| `/segmentos` | 177 | 0.8 | 6.1 | 18 | 16 | 0 | 0 |
| `/sobre` | 339 | 1.5 | 3.9 | 10 | 11 | 0 | 0 |
| `/sobre/quem-somos` | 565 | 2.6 | 6.5 | 2 | 7 | 0 | 0 |
| `/sobre/nossas-usinas` | 557 | 2.5 | 6.7 | 2 | 7 | 0 | 0 |
| `/sobre/lgpd` | 1596 | 7.3 | 8.3 | 2 | 3 | 0 | 0 |
| `/sobre/sustentabilidade` | 489 | 2.2 | 6 | 2 | 7 | 0 | 0 |
| `/sobre/social` | 546 | 2.5 | 4.9 | 2 | 4 | 0 | 0 |
| `/sobre/leilao` | 54 | 0.2 | 1.8 | 0 | 5 | 0 | 0 |
| `/sobre/fator-de-alavancagem` | 122 | 0.6 | 2.1 | 0 | 2 | 0 | 0 |
| `/sobre/condicoes-gerais-varejistas` | 118 | 0.5 | 2.1 | 0 | 4 | 0 | 0 |
| `/energia-solar-goiania` | 842 | 3.8 | 8.2 | 10 | 11 | 3 | 0 |
| `/energia-solar-anapolis` | 725 | 3.3 | 8 | 10 | 11 | 3 | 0 |
| `/energia-solar-aparecida-de-goiania` | 699 | 3.2 | 8 | 10 | 11 | 3 | 0 |
| `/energia-solar-em-rio-verde` | 715 | 3.2 | 8.2 | 10 | 10 | 3 | 0 |
| `/energia-solar-trindade` | 644 | 2.9 | 8 | 10 | 11 | 3 | 0 |
| `/energia-solar-palmas` | 736 | 3.3 | 8.2 | 10 | 10 | 3 | 0 |
| `/energia-solar-no-tocantins` | 672 | 3.1 | 8.1 | 11 | 12 | 3 | 0 |
| `/segmentos/agronegocio` | 787 | 3.6 | 8.4 | 12 | 10 | 0 | 1 |
| `/segmentos/bares-e-restaurantes` | 734 | 3.3 | 7.6 | 9 | 7 | 0 | 1 |
| `/segmentos/condominio` | 744 | 3.4 | 8.1 | 10 | 8 | 0 | 1 |
| `/segmentos/educacional` | 745 | 3.4 | 7.8 | 9 | 7 | 0 | 1 |
| `/segmentos/lazer` | 689 | 3.1 | 7.5 | 9 | 7 | 0 | 1 |
| `/segmentos/religioso` | 669 | 3.0 | 7.5 | 8 | 6 | 0 | 1 |
| `/segmentos/residencial` | 744 | 3.4 | 8.1 | 9 | 7 | 0 | 1 |
| `/segmentos/saude` | 676 | 3.1 | 7.6 | 9 | 8 | 0 | 1 |
| `/segmentos/servico` | 688 | 3.1 | 7.5 | 9 | 7 | 0 | 1 |
| `/segmentos/turismo` | 682 | 3.1 | 7.6 | 9 | 8 | 0 | 1 |
| `/segmentos/varejo` | 724 | 3.3 | 8 | 12 | 10 | 0 | 1 |
| `/simulador-de-economia` | 294 | 1.3 | 4.1 | 1 | 1 | 0 | 1 |
| `/conteudo` | 310 | 1.4 | 3.2 | 11 | 12 | 0 | 0 |
| `/conteudo/blog` | 243 | 1.1 | 2.7 | 7 | 8 | 0 | 0 |
| `/conteudo/bc-cast` | 175 | 0.8 | 3.2 | 2 | 6 | 0 | 0 |
| `/conteudo/blog/energia-solar-por-assinatura` | 1918 | 8.7 | 9.7 | 2 | 7 | 0 | 0 |
| `/conteudo/bc-cast/rubens-fileti` | 59 | 0.3 | 2.9 | 1 | 3 | 0 | 0 |
| `/conteudo/bc-cast/tiago-mendonca` | 79 | 0.4 | 3.1 | 1 | 4 | 0 | 0 |

Leitura (estimativa, não medição de usuários):
- Soluções e segmentos: 3–7 min de leitura, 7–15 CTAs. Home: ~3 min, 38 CTAs.
- Leilão, Fator de Alavancagem, Condições Gerais e episódios do BC Cast têm pouco conteúdo e tendem a sessões curtas.
- Um percurso típico Home → solução → segmento/contato reúne ~8–12 min de conteúdo; a duração real depende do tráfego e deve ser confirmada no GA4.
