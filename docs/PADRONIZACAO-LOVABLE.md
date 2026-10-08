# Padronização editorial e técnica

Registro de base da implementação anterior: `3bcc94ac7080c622edf1856a0c81ad2b8cad2393`, branch `main`. Esse registro não confirma o checkout atual.
Esta cópia local não contém `.git`; branch, HEAD e remote não são verificáveis. Esta documentação não afirma correspondência com outro commit. Não realiza publicação.

## O que foi ajustado

| Família | Ajustes |
| --- | --- |
| Produtos e serviços | Escala tipográfica, heros legíveis, mídia 60/40, ações e fechamento consistentes. |
| Segmentos | Mesmos tokens e estados de ação; composição específica e conteúdo preservados. |
| Regionais | Hierarquia editorial, superfície navy do território, contraste e composição responsiva. |
| Institucional, usinas, sustentabilidade e social | Fotografias expressivas e enquadramento integral nas introduções; a foto da equipe mantém sua proporção nativa. |
| Conteúdo, blog e BC Cast | Leitura consistente, links acessíveis, títulos e legendas; tabelas contidas com rolagem local e acesso por teclado. |
| Contato e legais | Superfície do formulário externo corrigida para navy, evitando texto branco sobre branco; tipografia e índices de leitura consistentes. |
| Simulador | Apenas contraste e alvos de interação, incluindo slider de 44px. Cálculos e integração preservados. |

Onest permanece principal; Barlow Condensed é seletiva nos displays e métricas. Textos pequenos verdes sobre superfície clara usam `--be-green-text`; superfícies navy usam turquesa ou branco. CTAs principais usam amarelo e navy. Foco visível e movimento reduzido foram verificados.

## Arquivos da implementação

- `src/styles/institutional-standardization.css`: tokens, tipografia, superfícies, ações, foco, leitura e exceções locais.
- `src/styles/editorial-pages.css`: proporções e correção da superfície escura do formulário legado.
- `src/components/Content/ContentBody.tsx`: escopo da leitura e foco no contêiner da tabela.
- `src/components/Institutional/InstitutionalProse.tsx`: escopo da leitura legal.
- `src/components/Institutional/InstitutionalIntro.tsx`: proporção da fotografia fornecida pela página.
- `src/pages/sobre/quem-somos/page.tsx`: proporção nativa da foto oficial da equipe.
- `src/pages/simulador-de-economia/page.tsx`: escopo exclusivo para os ajustes acessíveis.

Os estilos internos são delimitados por `.bc-inner-editorial`; o simulador tem escopo próprio `.bc-simulator-page`. O `Navbar` e o `Footer` permanecem componentes compartilhados, fora do escopo editorial interno, e seus CTAs/alvos de navegação existentes foram mantidos. Refinamentos posteriores desta cópia local alcançam a composição responsiva da Home, o `PageHeader` compartilhado e CTAs secundários de banner/fechamento, sem substituir `HomeEditorial.tsx` por componentes legados nem copiar o CSS da Home indiscriminadamente. Indicadores direcionais permanecem em títulos-links editoriais, navegação e controles funcionais; CTAs secundários usam o estilo de ação compartilhado.

## Validação desta rodada

- 47 rotas de interface × 360, 390, 768, 1024 e 1440px: 235 inspeções automatizadas sem overflow da página ou alvos visíveis menores que 44px no conteúdo principal.
- Os textos renderizados, atributos preservados de conteúdo/navegação/ARIA e metadados SEO corresponderam à base nas 235 inspeções. Os estilos medidos da Home corresponderam à base nas cinco larguras.
- 65 inspeções de famílias de página: teclado, accordions, detalhes, estados normal/hover/foco, menu mobile e simulador. O hover com movimento reduzido foi corrigido após a primeira rodada.
- 86 amostras de contraste em 43 rotas, mobile e desktop: 6.201 nós de texto, sem falhas detectadas sobre fundos sólidos. 498 casos com fotografia ou imagem de fundo foram separados e não representam uma certificação geral de contraste.
- `npm run typecheck`: aprovado.
- `npm run lint -- --ignore-pattern 'dist-ssr/**'`: sem erros; 23 avisos existentes.
- `VITE_SEO_ENV=production npm run build`: aprovado, incluindo o `postbuild` de pré-renderização das 33 rotas indexáveis e da página 404.

As capturas e os relatórios detalhados acompanham a entrega fora do código-fonte. Requisições externas foram bloqueadas durante os testes de navegador para evitar envio a integrações. Reprodução remota do YouTube, entrega de formulários, geração de leads, envio de mensagens e tracking externo ponta a ponta não foram testados.

O build de produção também foi navegado em 47 rotas × duas larguras, com assets locais sem erro HTTP, respostas abertas das FAQs sem corte e seis PDFs válidos. Foram observados erros recuperáveis de hidratação React `#418`/`#422` ao carregar determinadas rotas pelo fallback estático. Uma construção isolada da base aprovada reproduziu o comportamento; a comparação dirigida de cinco páginas apresentou os mesmos resultados antes e depois. Registrar esse problema anterior para revisão do fallback/SSR, preservando SEO e conteúdo. Build aprovado não significa ausência desses avisos no navegador de produção.

## Como continuar

1. Abrir o projeto existente no repositório com a revisão entregue no GitHub ou importar o ZIP de código-fonte.
2. Manter o lockfile. Em um novo ambiente, instalar as dependências declaradas com `npm ci`; nesta rodada não houve instalação nem alteração de dependências.
3. Usar `npm run dev` para revisão local. Conferir especialmente fotos, estados de foco, navegação mobile e conteúdos longos após qualquer ajuste.
4. Para o domínio oficial, construir com `VITE_SEO_ENV=production npm run build`. O `postbuild` já executa o prerender; não repetir. Saída: `dist`.
5. Para prévia, preservar o ambiente sem `VITE_SEO_ENV=production`, o `robots.txt` com `Disallow: /` e as regras existentes de `noindex` por hostname. Não liberar indexação de blog, BC Cast ou simulador incidentalmente.
6. Não versionar alterações incidentais de `public/robots.txt` ou `public/sitemap.xml` geradas pelos scripts. Nesta rodada o arquivo gerado de produção foi restaurado ao estado original de fonte.
7. Validar integrações e conteúdo remoto no ambiente autorizado antes da futura publicação. Não inserir segredos no código ou no ZIP. Configurar somente pelo mecanismo seguro já usado pelo projeto.

Textos, números, produtos, imagens oficiais, URLs, SEO, UTMs, tracking, formulários, simulador e integrações permanecem preservados. Refinamentos finais que exijam alteração desses conteúdos dependem de aprovação da cliente. A publicação e a configuração da hospedagem ficam para a etapa posterior.

## Validação da cópia local atual

- Cópia local sem versão Git confirmada; não foi associada ao commit de referência nem ao registro histórico acima.
- Prévia Vite iniciada diretamente, sem `predev`; a URL local respondeu HTTP 200.
- 46 rotas ativas ou ligadas no conteúdo × 360, 390, 768, 1024 e 1440px: 230 inspeções, sem overflow horizontal ou ausência de H1.
- Home: os quatro trechos refinados foram capturados e inspecionados em desktop e mobile. Movimento distribui os pilares em uma, duas ou quatro colunas conforme a largura; Equipe empilha no mobile e alinha imagem/título no desktop; Usinas preserva a sequência e a associação dos dados; BC Cast mantém mídia 16:9 e relacionados abaixo da primeira linha.
- Menu mobile, FAQ, carrossel inicial, carrossel de usinas por controle e teclado, alvos de 44px e `prefers-reduced-motion` foram exercitados sem submeter formulários.
- `npm.cmd run typecheck`: aprovado. `npm.cmd run lint`: sem erros; 23 avisos.
- Não foram executados build, prerender, envio de formulários, publicação ou alterações de SEO. Nenhum aviso de hidratação React foi identificado. Em `/sobre/quem-somos`, `/segmentos/agronegocio` e `/conteudo/bc-cast`, a Edge Function `salesforce-numbers` respondeu HTTP 500; integração não alterada. Também apareceram avisos de preload não utilizado, GTM bloqueado e requisições automáticas de analytics/iframe abortadas durante a navegação entre rotas. A thumbnail do BC Cast carregou nesta inspeção.
