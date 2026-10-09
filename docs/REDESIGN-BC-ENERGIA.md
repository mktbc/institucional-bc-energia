# Redesign institucional do Grupo BC Energia

## Diagnóstico e direção visual

A Home acumulava oito folhas de composição com regras concorrentes, soluções em uma grade uniforme, resultados sem fotografia e narrativa de infraestrutura vinculada ao slide ativo. As páginas internas tinham prioridades de CSS conflitantes e uma hierarquia tipográfica diferente da Home. O dimensionamento percentual dos logos dependia de uma lista sem largura definida no mobile.

A nova direção utiliza branco e superfícies claras para leitura, navy para autoridade e fechamento, verde institucional, amarelo para ações e métricas e turquesa para detalhes. Onest permanece na interface e no corpo; Barlow Condensed apresenta títulos de impacto e resultados. Os logos oficiais continuam com seus arquivos, proporções e cores originais.

A Home foi recomposta com hero fotográfico, benefícios em composição assimétrica, duas soluções protagonistas e duas de apoio, serviços complementares, mosaico de segmentos, resultados sobre fotografia existente, clientes, infraestrutura, equipe, conteúdo, FAQ e CTA final. Nenhuma informação foi removida para reduzir o layout.

## Arquivos e componentes

| Arquivo | Resultado |
| --- | --- |
| `src/pages/home/editorial/home-design.css` | Composição completa da Home, substituindo a importação de oito camadas de estilos. |
| `src/pages/home/editorial/HomeEditorial.tsx` | Títulos de soluções como H3; navegação de segmentos depois do mosaico; conteúdo centralizado nas fontes existentes. |
| `src/pages/home/editorial/MetricsScale.tsx` | Reutilização da fotografia de resultados já existente, com overlay navy e números amarelos. |
| `src/pages/home/editorial/PlantCarousel.tsx` | Separação entre galeria navegável e narrativa institucional persistente. |
| `src/styles/site-design.css` | Containers, tipografia, PageHeaders, espaçamento, composições internas, foco, formulários e rodapé compartilhados. |
| `src/components/Layout/RootLayout.tsx` | Aplicação do padrão visual global. |
| `src/components/Navbar/Navbar.tsx` | Identificação do componente para o padrão global, preservando navegação e links. |
| `src/components/Carousel/Carousel.tsx` | Pausa explícita, pausa por mouse/foco, retomada, teclado, slides visíveis interativos e movimento reduzido sem transição. |
| `src/components/Customers/LogoCarousel.tsx` | Medição com ResizeObserver, avanço por um logo e cálculo consistente do ciclo. |
| `src/components/Customers/logo-carousel.css` | Exatamente dois logos por viewport no mobile, sem distorção. |
| `src/components/Accordion/Accordion.tsx` | Recalcular altura ao mudar largura; conteúdo sem um parágrafo envolvendo possíveis blocos HTML. |
| `src/main.tsx` | Hidratar somente quando o HTML pré-renderizado corresponde à URL atual. |
| `scripts/prerender.ts` | Marcador da rota no root de cada arquivo estático. |
| `index.html` | Propriedade das tags estáticas pelo Helmet, evitando duplicação sem reescrever seus valores. |
| `docs/REDESIGN-BC-ENERGIA.md` | Registro de decisões, preservação, testes e limitações. |

Os componentes existentes PageHeader, SectionHeader, ProductSection, SegmentSection, Customers, FAQ, formulários, breadcrumbs, CTA e Footer foram reutilizados. O padrão compartilhado alcança produtos, os onze segmentos, regionais, institucional, contato, conteúdo, artigos, episódios, simulador, legais, design system e 404. As composições específicas e o conteúdo de cada página permanecem.

## Preservação

- Fontes de rotas, slugs, redirecionamentos, links, conteúdo, métricas e SEO não foram alteradas.
- Todos os 214 textos/strings do componente da Home, excluindo imports, foram comparados pelo parser TypeScript e preservados.
- Nos testes de navegador, links, titles, canonical e H1 foram comparados ao registro anterior de 46 rotas. Textos das páginas internas foram comparados integralmente. Descriptions foram validadas contra a configuração original de cada rota: a descrição estática duplicada do HTML-base não foi tratada como a descrição correta de todas as páginas.
- Imagens importadas foram comparadas considerando os nomes com hash gerados pelo Vite. Todos os assets locais originais foram mantidos.
- `src/config`, `src/data`, `src/services`, `src/lib`, `supabase`, PDFs, imagens, fontes, `public/robots.txt`, `public/sitemap.xml`, `package.json`, configurações de build e variáveis de ambiente foram preservados.
- O slogan permanece exatamente “Geramos valor com a nossa energia.”
- Fora dos segmentos, nenhuma imagem ou banner foi substituído. A seção de resultados reutiliza `/img/hero/hero-resultados.webp`, que continua também no carrossel original.
- Nenhum arquivo comprovadamente exclusivo de Claude, Copilot, Cursor ou outro agente foi encontrado. Nenhum arquivo foi removido. Documentação útil e folhas antigas de estilo foram mantidas por segurança.
- Backend, processamento dos formulários, APIs, autenticação, banco, simulador interno e integrações de produção permaneceram intactos.

## Imagens dos onze segmentos

Todos os arquivos abaixo já estavam versionados no repositório. Nenhuma imagem foi adicionada ou substituída; a origem nesta entrega é o acervo existente do projeto. As imagens de cards e os ícones também permanecem nos arquivos originais. A proveniência externa e as licenças desse acervo não foram objeto de alteração ou verificação.

O prefixo dos arquivos na tabela é `public/img/pages/segmentos/`.

| Segmento | Banner mantido | Introdução mantida | Justificativa visual |
| --- | --- | --- | --- |
| Agronegócio | `agronegocio-hero.webp` | `agronegocio-intro.webp` | Relação direta com a operação rural; enquadramento e texto com espaço de leitura. |
| Bares e restaurantes | `bares-e-restaurantes-hero.jpg` | `bares-e-restaurantes.webp` | Contexto gastronômico específico, sem repetir imagens genéricas de energia. |
| Condomínio | `condominio-hero.webp` | `condominio-v2.webp` | Arquitetura urbana reconhecível e continuidade entre banner e contexto. |
| Educacional | `educacional-hero.jpg` | `educacional.webp` | Instalações de ensino coerentes com o perfil da página. |
| Lazer | `lazer-hero.jpg` | `lazer.webp` | Cenário próprio do setor, com hierarquia tipográfica compartilhada. |
| Religioso | `religioso-hero.jpg` | `religioso.webp` | Identidade da instituição preservada, sem substituir o contexto por painéis solares. |
| Residencial | `residencial-hero.webp` | `residencial.webp` | Escala residencial e recorte específico já configurado para esse banner. |
| Saúde | `saude-hero.webp` | `saude.webp` | Contexto de saúde mantido com fotografia legível e overlay de leitura. |
| Serviço | `servico-hero.webp` | `servico.webp` | Contexto corporativo preservado e composição alinhada ao padrão geral. |
| Turismo | `turismo-hero.webp` | `turismo-intro.webp` | Contexto de hotelaria/turismo mantido nas duas áreas fotográficas. |
| Varejo | `varejo-hero.webp` | `varejo.webp` | Operação comercial reconhecível, preservando imagem e dados existentes. |

## UX, SEO, acessibilidade e performance

A hierarquia de conversão mantém os CTAs reais: amarelo na ação principal, contorno/link nas ações secundárias e navegação textual de apoio. A Home passa de uma sequência uniforme de cards para composições com funções distintas. A narrativa e os dados de infraestrutura não desaparecem entre slides.

O hero conserva três banners, textos, imagens, autoplay, indicadores e setas. Agora também oferece pausa explícita e sincroniza a troca automática com foco, mouse e preferência de movimento. Slides fora de tela ficam inertes; slides visíveis continuam interativos. A faixa de logos mantém todos os logos, dois no mobile, controles com área de toque e navegação por setas.

O FAQ conserva perguntas, respostas e schema, com atualização da altura aberta quando a largura muda. O menu mobile mantém Escape e retorno de foco. O padrão global inclui foco visível, tratamento de campos inválidos e desabilitados, dimensões de leitura e movimento reduzido.

Titles, descriptions, canonical, robots, Open Graph, Twitter, entidades e schemas mantêm os dados originais. Os títulos de soluções na Home passam a headings reais. A remoção da duplicidade das tags e a correspondência entre URL e HTML pré-renderizado corrigem problemas de SEO e hidratação do frontend, sem inventar conteúdo para AIO/GEO.

O CSS principal do build passou de 287,60 kB (44,66 kB gzip) para aproximadamente 177,86 kB (32,23 kB gzip), medido no mesmo ambiente. Os chunks do Swiper permanecem separados. Não foram adicionadas dependências, fontes externas ou bibliotecas de animação. Dimensões explícitas, lazy loading e carregamento progressivo existentes foram preservados. Não foi feita uma medição de Core Web Vitals em campo; nenhum score de Lighthouse é alegado.

## Validação executada

Ambiente: Node 24.19.0, npm 11.9.0 e Chromium instalado. Não existe lockfile no projeto; a instalação foi executada com `npm install --package-lock=false --cache /workspace/.npm-cache --no-audit --no-fund` para não criar um arquivo novo durante a entrega.

| Verificação | Resultado |
| --- | --- |
| Instalação | Passou. |
| `npm run typecheck` | Passou no código final. |
| `npm run build` | Passou; gerou `dist/`, 33 rotas pré-renderizadas e `404.html`. |
| `npm run lint` | Passou com 0 erros e os mesmos 23 avisos já existentes. |
| `npm run preview -- --host 0.0.0.0 --port 4173 --strictPort` | Iniciado após o build; o preview serviu os arquivos do build final. |
| Matriz em desenvolvimento | 46 rotas × 5 larguras: 230 verificações sem overflow, exceções JavaScript ou imagens locais quebradas. |
| Matriz no preview final | 46 rotas × 5 larguras: 230 verificações, 0 falhas, incluindo preservação de conteúdo/links/metadados e ausência de erros de hidratação. |
| Larguras | 1440, 1024, 768, 390 e 320 px. |
| Hero | Autoplay, pausa por mouse, pausa explícita, retomada, pausa por foco, teclado, movimento reduzido e inércia dos slides passaram. |
| Logos | Dois logos visíveis em 390 e 320 px, teclado, avanço e retorno passaram. |
| FAQ e menu | Abrir/fechar FAQ, redimensionar resposta, menu mobile e Escape passaram. |
| I-REC | Redirecionamento de `/produtos/irec` para `/produtos/certificacao-renovavel-irec` passou. |
| 404 | Página, H1, noindex/nofollow e ausência de canonical passaram. |
| PDFs | Seis destinos existentes responderam HTTP 200 com `application/pdf`. |
| Zoom | Layout em viewport de 720 px, equivalente a desktop de 1440 px em zoom de 200%, sem overflow. |
| Semântica HTML | 33 rotas com exatamente um H1 e main; auditoria passou. Avisos do inventário relativos a links dinâmicos existentes foram mantidos. |
| Dados estruturados | Auditoria passou nas 33 rotas indexáveis. |
| Navegação | Auditoria passou: 9 verificações, 0 avisos e 0 erros. |
| Metadados | Auditoria passou: nenhum title/description ausente ou duplicado na configuração. Tags únicas também verificadas no navegador. |
| Git | Diff revisado; `git diff --check` passou; somente os arquivos explícitos desta entrega devem integrar o commit. |

As 46 rotas incluem todas as páginas indexáveis, páginas noindex, o artigo existente, os dois episódios, design system e uma URL desconhecida para validar a 404. O redirect I-REC e os PDFs foram exercitados separadamente.

Os testes de layout e preservação bloquearam requisições de terceiros para torná-los repetíveis e evitar efeitos sobre integrações reais. Nenhum formulário foi enviado. O funcionamento dos campos e do iframe externo não foi confundido com uma confirmação de entrega de leads.

## Defeitos de frontend identificados no preview e corrigidos

1. O servidor de SPA entregava o HTML da Home em URLs sem pré-renderização. A seleção de `hydrateRoot` apenas pela existência de filhos tentava hidratar a página errada e produzia erros React 418/422. Agora o HTML identifica sua rota, e o navegador só o hidrata quando a URL corresponde.
2. Algumas tags estáticas do `index.html` não eram gerenciadas pelo Helmet, duplicando descrições/metadados no modo SPA. Seus valores foram preservados e o atributo de gerenciamento foi alinhado ao das demais tags.

Após essas correções, a matriz de produção foi repetida e passou integralmente.

## Pendências e limites reais

- `bc-energia-home-mockup.png` não estava no repositório nem nos anexos disponíveis. A direção foi construída com o manual de marca enviado e o conteúdo existente; não se alega comparação com esse arquivo.
- Miniaturas do YouTube em `i.ytimg.com` foram bloqueadas pelo proxy do ambiente (CONNECT 403). Seus URLs originais foram preservados. A liberação desse domínio nas configurações do ambiente é necessária para visualizar as miniaturas remotamente nesta máquina.
- O Supabase respondeu HTTP 200 à leitura autenticada de `app_config` (9 registros). A função `salesforce-numbers` respondeu HTTP 200; isso confirma resposta do serviço, não valida os dados comerciais. `blog-posts` respondeu HTTP 403. A causa do bloqueio do blog precisa ser avaliada pelos responsáveis pela integração; não houve alteração do backend.
- O simulador externo respondeu HTTP 200. Fluxo interno e envio de formulários não foram testados nem alterados.
- O Chromium do ambiente apresentou erro de confiança de certificado em requisições externas. Os testes repetíveis do frontend foram isolados dessas requisições; verificações HTTP externas usaram a cadeia de confiança fornecida, sem desativar TLS.
- O fallback do preview do Vite responde HTTP 200 em URLs desconhecidas, embora a página 404 seja renderizada corretamente e `dist/404.html` exista. O status HTTP 404 e redirects HTTP de produção dependem da hospedagem. Infraestrutura e hospedagem foram preservadas.
- O push no GitHub atualiza o repositório; esta entrega não afirma uma publicação na hospedagem de produção.

## Publicação solicitada

Destino: `https://github.com/wanessakarenn-ship-it/Site-BC-.git`, branch `main`, preservando histórico e sem force push.

Mensagem do commit: `feat: redesign institucional completo do site BC Energia`.

A confirmação do push e o hash exato do commit são apresentados no relatório final do chat após a operação.
