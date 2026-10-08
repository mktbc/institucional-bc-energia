# Editorial Energy Premium — conceito, decisões e pendências

Registro vivo da evolução visual do site do Grupo BC Energia. Atualize a cada
etapa relevante (o que mudou, por quê, o que está pendente).

## Conceito

Autoridade institucional + energia + clareza comercial + sofisticação.
Percepção-alvo: "Essa empresa é grande, confiável, moderna e domina o assunto."
A sofisticação vem de tipografia, fotografia, proporção, composição, cor,
hierarquia e profundidade controlada — não de efeitos.

Fontes de verdade: Manual de Marca Rev. 01, relatório visual/técnico (46 rotas),
`docs/DESIGN-SYSTEM.md`, código atual e conteúdo aprovado.

## Regras de sistema já aplicadas

| Tema | Regra |
|---|---|
| Cor | Navy `#242F40` estrutura; verde `#18857D` institucional; turquesa `#24D2C8` informação; amarelo `#F1C035` só em CTA, número principal e destaque pontual |
| Tipografia | Barlow Condensed em H1–H3, headlines e métricas; Onest em texto, UI e botões |
| Escala | H1 hero ≤ 64px; H2 de seção ≤ 48px (`t-h2-lead`); H2 nunca usa `t-h1` |
| Superfícies | Painel translúcido (`media-panel`) só sobre fotografia protagonista; cards comuns sólidos |
| Movimento | Hover de elevação apenas em elementos clicáveis |
| Ruído | Sem filetes, cantoneiras ou linhas quando espaço + tipografia já organizam |
| Métricas | Número → rótulo → explicação; `<dl>` válido; nenhum número novo sem fonte |
| Tracking | `data-cta-name` existentes preservados; novos seguem o padrão da seção |

## Home — narrativa (implementada)

1. Hero → 2. Vitrine de soluções → 3. Como ajudamos → 4. Resultados →
5. Segmentos → 6. Presença regional → 7. Estrutura própria → 8. Conteúdo/BC Cast →
9. FAQ → 10. Institucional → 11. CTA final → Footer.

### Vitrine
- Protagonista: **Consórcio BC Energia** (geração distribuída por assinatura —
  núcleo comercial). Foto `consorcio-intro`, painel translúcido, "Até 25%",
  CTA "Fazer adesão gratuita" (App Energia) + "Como funciona o Consórcio".
- Destaque: **Mercado Livre de Energia** (empresas em alta tensão, conta a partir de R$ 10 mil).
- Complementares: Gestão de Energia, Certificação I-REC, Arrendamento de Usinas.
- Externo: Consultoria Jurídica (BC Energia Direito).
- Assets descartados: `gestao-de-energia-intro.webp` e
  `mercado-livre-de-energia-intro.webp` têm texto embutido (um diz "até 26%").

### Histórico de decisão
- v1 (11/09): Mercado Livre como protagonista (1º item do hub e slide 1 do hero).
  Aplicada inicialmente (commit `cc27f0d`), seguida da correção de
  slider (`9508940`: bullets a 32/24px, slides de altura igual).
- v2 (11/09): invertido para Consórcio após orientação de que o protagonista
  deve seguir prioridade comercial, não a ordem do código.

## Conflitos de conteúdo — decidir antes de publicar

| # | Conflito | Onde | Status |
|---|---|---|---|
| C1 | Limiar do Consórcio | Conteúdo local do produto, FAQs, portfólio, artigo e hero | **RESOLVIDO** — textos locais atualizados para contas a partir de R$ 700; textos embutidos em assets precisam de revisão |
| C2 | "até 25% **ao mês**" vs "até 25% **por ano**" no mesmo produto | Consórcio, quickAnswers, artigos, hero | **RESOLVIDO** — padrão aprovado: "Até 25% de economia na conta de energia" / "Até 25% de economia" |
| C3 | "mais de 100 usinas" (Consórcio) vs "14 complexos de geração" (Home/Usinas) | `consorcio-bc-energia/data.tsx`, `data/powerPlants.ts` | Pode ser usinas ≠ complexos; confirmar |
| C4 | Estados: site cita GO, TO, MT, MG, PR e DF; materiais de campanha citam SP e não DF | `data/coverage.ts` | Confirmar cobertura atual |
| C5 | Slide 1 do hero (H1) é Mercado Livre, vitrine prioriza Consórcio | `Sliders.data.tsx` | Trocar a ordem muda o H1 (SEO) — decidir |
| C6 | URL do App Energia em `http://` em alguns pontos e `https://` em outros | `Sliders.data.tsx`, `solutions.data.ts` | Técnico, baixo risco; padronizar em https |
| C7 | 25% "sobre a parcela de energia da fatura" (FAQ rápido) vs "na conta de energia" (demais textos) | `quickAnswers.ts` | Qualificador preservado no FAQ — confirmar se o 25% incide sobre a conta total ou só sobre a parcela de energia |
| C8 | Gestão de Energia cita "Até 25% nas despesas com conta e consumo" | `gestao-de-energia/page.tsx` | Claim de outro produto, fora do C2 — confirmar se é vigente |

### Regra C2 (aprovada em 11/09/2026)
O 25% é a economia/desconto aplicado à conta de energia — não é taxa mensal nem
anual. Usar somente "Até 25% de economia na conta de energia" ou, em espaço
curto, "Até 25% de economia". Nunca "ao mês", "por ano", "mensal", "anual".
Rótulos de métrica curtos ("Até 25%" + legenda "de economia…") são aceitos.

## Bloco Produtos (11/09, após o ZIP consolidado)

| Item | Mudança | Alcance |
|---|---|---|
| S1 | Numerais 01–04 dos passos: 44px teal 45% → marcador de 18px | ProductSteps/ProductProcess — produtos, segmentos, regionais, simulador |
| S3 | Hero interno: `lg:pt-44/pb-28` → `lg:pt-36/pb-20`, min-height 680→600px; H1 com teto de 64px; círculo decorativo removido | PageHeader — 38 rotas |
| S7 | `/produtos`: destaque amarelo só em "perfil de consumo"; eyebrow duplicado removido | /produtos |
| Hub | Protagonista do portfólio = Consórcio (mesma prioridade da Home) | /produtos |
| Espaço | Grade de logos: 104px → 72px de padding | Customers (3 páginas) |
| Cauda | Mercado Livre: formulário logo após o FAQ; bloco "Entenda melhor este tema" duplicado removido em Mercado Livre e Consórcio; `/conteudo/blog` movido para "Próximos passos" (nenhum destino perdido) | 2 páginas de produto |

## Bloco Segmentos (11/09)

| Item | Mudança | Alcance |
|---|---|---|
| Vitrine do hub | Proporção única 4:3/16:10 (antes 4:5 no desktop, ~850px de foto); `object-position` por segmento | /segmentos |
| Foto Saúde | `saude-v2` tinha marca d'água "MOCKUP/LOGO" → `saude.webp` | /segmentos |
| Hero do hub | Menos padding, H1 em 3 linhas; CTA "Ver todos" agora leva ao índice de 11 (antes caía na vitrine de 5) | /segmentos |
| Hero dos segmentos em split | Foto própria (antes 4 páginas com a mesma usina); intro tipográfica quando a foto se repetiria | 4 segmentos |
| Desafios × Benefícios | Desafios tipográfico sem filetes; Benefícios em cards de superfície | 11 segmentos |
| Divisores | Prova, faixa de logos e NextAction sem filetes redundantes (~10 a menos por página) | 11 segmentos + NextAction em produtos |

## Bloco Sobre + Nossas Usinas (11/09)

| Item | Mudança | Alcance |
|---|---|---|
| "Fechamento" de 708px (quem-somos) | Era a grade de 21 logos (`Customers`), não o CTA: 7 linhas no mobile (antes 11), 3–4 no desktop | Customers — produtos, quem-somos, nossas-usinas |
| Registro fotográfico (1.200px) | 3 fotos 16:10 na escala real dos arquivos; fotos mais nítidas + CGH hidrelétrica | InstitutionalStrip — nossas-usinas |
| Hero Nossas Usinas | `nossas-usinas.webp` (usina própria) no lugar da foto compartilhada | nossas-usinas |
| Estrutura (quem-somos) | Texto 7/12 + vídeo vertical 5/12 (antes vídeo de 320px numa coluna vazia de 7/12) | quem-somos |
| /sobre | Sem alteração (aprovada no relatório) | — |

Assets com problema mantidos em `public/`, sem exibição: `saude-v2.webp` (marca d'água
"MOCKUP"), `gestao-de-energia-intro.webp` ("até 26%" embutido — referência trocada por
`gestao-de-energia-lead.webp`) e `mercado-livre-de-energia-intro.webp` (texto embutido; só
referenciado em `solutions.data.ts`, arquivo sem importação).

## Bloco Conteúdo / Blog + BC Cast (11/09)

| Item | Mudança | Alcance |
|---|---|---|
| Artigo longo | Sumário gerado dos H2 reais (+ FAQ): recolhível abaixo de lg, lateral sticky no desktop; ids estáveis + `scroll-mt-28` | template de artigo |
| Ritmo do corpo | 24px entre blocos, respiro maior antes de H2 | ContentBody — artigos e transcrições de episódios |
| Hero do artigo | Foto por cluster (GD → `energia-por-assinatura.webp`) no lugar da foto de contato | template de artigo |
| Hub /conteudo | Sem eyebrow duplicado; Blog e BC Cast com descrição já publicada | /conteudo |
| BC Cast | Macrobloco escuro (como documentado) — mídia × leitura | /conteudo/bc-cast |

Regra de ids: `block.id` nos dados tem prioridade; sem ele, o id vem do texto do heading.
Editar o texto de um H2 muda a âncora — para links externos permanentes, fixe `id` no dado.

Assets sem uso e inadequados em `public/img/components/bc-cast/`: `cast-1..5` são fotos
genéricas (não do BC Cast); `cast-3` e `cast-5` mostram geração eólica, que o grupo não opera;
`cast-1` duplica `energia-por-assinatura.webp`. `contact.webp` (897×750) é hero de 7 páginas.

## Bloco Contato + Simulador (11/09)

| Item | Mudança | Alcance |
|---|---|---|
| Hero /contato e /contato/enviado | `gestao-de-energia-hero.webp` (1920×705, especialistas) no lugar de `contact.webp` (897×750, usina aérea) | 2 páginas |
| /contato | Passos com marcador 01–03; cards estáticos sem hover de elevação e sem filete lateral | /contato |
| /contato/enviado | Página legada (176px de padding, H1 "Contato", sem próximo passo) → cabeçalho compacto com a confirmação como H1 e 2 próximos passos | /contato/enviado |
| Simulador #lead-form | Cabeçalho 5/12 + formulário 7/12 no desktop (antes empilhado, ~956px) | /simulador-de-economia |
| FormEmbed | Altura inicial 400px (sem salto de 150px); variante `section` sem círculos/filete decorativos | 6 páginas |

`contact.webp` continua como hero de Conteúdo, Blog, BC Cast e episódio (ver bloco Conteúdo).

## Bloco Regionais (11/09)

| Item | Mudança | Alcance |
|---|---|---|
| Divisores (S4) | Todos os decorativos removidos de `components/Regional`; restam só os funcionais (linhas do FAQ e de links relacionados) | 7 regionais |
| Território | Card de superfície; nome do lugar `t-h1` → `t-h2-lead` | 7 regionais |
| Soluções / Diferenciais / Perfis | Solução indicada em card; Diferenciais em cards; Perfis como lista com check em 2 colunas | 7 regionais |
| Hero Rio Verde / Palmas | Retratos de ~500px ampliados ~4× → `agronegocio-hero.webp` / `energia-por-assinatura.webp` | 2 regionais |

Pendência: Aparecida de Goiânia e Trindade usam a mesma foto aérea (`FOTO_BANNER_02` e a versão
tingida `FOTO_BANNER_023`).

## Fechamento técnico (11/09)

| Item | Mudança |
|---|---|
| S6 | Token `--bc-yellow`/`--bc-accent` = `44.4 87% 57.6%` (#F1C035 exato; o valor anterior arredondava para #F1BF37). Hover do botão primário, tema/foco do carrossel e foco do rodapé saíram de `amber-*` para o token |
| S5 | Links do rodapé 44px sem mudar o ritmo (gap zerado); links legais 44px; breadcrumbs com 44px de área e margem negativa |
| Formulários | Mensagem de erro de envio em `text-yellow-300` sobre fundo claro (ilegível) → `text-error` + `role="alert"` |

## Bloco Conceito Visual Institucional (29/09)

Delta do briefing "novo conceito visual institucional". A maior parte do briefing já
estava implementada nos blocos anteriores; o que faltava eram desvios de paleta e
linguagem, corrigidos aqui.

| Item | Mudança | Alcance |
|---|---|---|
| Bug | Classe `bg-[radial-gradient(...)` sem `]` no CTA final fora da Home: o overlay nunca era emitido pelo Tailwind | 3 páginas |
| Paleta | `#123E43` (CTA final) e `#1f3b49` (presença regional) não pertencem ao Manual — gradientes agora só com navy/verde/turquesa oficiais | CTA final + Home |
| Paleta | Tema do simulador embutido tinha 2 cópias com verdes aproximados (`#1f7a6b`, `#27bdb1`) → `src/config/formWidgetTheme.ts` com os hex oficiais (achado B1 das auditorias) | FormEmbed + SimuleAgora, 6 páginas |
| Clichê ecológico | Sustentabilidade usava ícone de eólica (fonte que o grupo não opera) e planeta com folhas → usina solar e eficiência energética | /sobre/sustentabilidade |
| Linguagem | Coluna do rodapé "Conversão" (jargão interno) → "Atendimento" | rodapé, todas as páginas |

Auditados e mantidos sem alteração, por já atenderem ao briefing: header (navegação enxuta,
CTA único, alvos ≥ 44px), estrutura do rodapé (5 grupos + regulatório), hierarquia tipográfica,
gradientes remanescentes (todos funcionais: overlay de leitura sobre fotografia).

**Não implementável sem conteúdo:** cases, depoimentos, parceiros e certificações pedidos no
briefing não existem no projeto. Nenhum placeholder foi criado — ver pendências humanas no HANDOFF.

## Bloco Institutional Energy Premium (30/09)

Delta do briefing "redesign global do front-end". Nenhuma página foi reconstruída:
a etapa agiu na camada de tokens, nos componentes globais e nos desvios que
sobraram dos blocos anteriores.

| Item | Mudança | Alcance |
|---|---|---|
| Tokens | Lavagem radial turquesa do `<body>` removida (superfície institucional lisa) | todas as páginas |
| Tokens | `--focus` passa a `44.4 87% 57.6%` — era `44 87% 58%` (#F1BF37), fora de #F1C035 | foco global |
| Tokens | `--shadow-energy` deixa de ser sombra verde (alias de `--shadow-sm`); `--glow-*` e `.bc-depth-panel` removidos (sem uso) | design system |
| Tokens | `--glass-shadow` em navy (era slate-900) e `--glass-blur` sem `saturate()` — desfoque só por leitura | painéis sobre foto |
| Tokens | Loader usava `#0d9488` (teal do Tailwind) → verde institucional | Loading |
| Tipografia | Barlow Condensed restrito a `h1–h3`; `h4–h6` em Onest, como já definia `.t-h4` (§7: uso estratégico) | global |
| Header | Barra sólida em navy após o scroll — o `backdrop-blur` a 95% de opacidade não produzia efeito; `border-b` turquesa de definição | todas as páginas |
| Header | Véu de leitura sobre o Hero (a navegação é branca e podia cair sobre fotografia clara); sai quando a barra fica sólida | todas as páginas |
| Header | Item ativo deixa de depender só de cor (WCAG 1.4.1): sublinhado no desktop, barra lateral no mobile; "Área do cliente" visível a partir de `lg` | todas as páginas |
| Rodapé | Títulos de coluna usavam `font-onest`, classe inexistente no `tailwind.config`: caíam em Barlow Condensed. Agora `font-sans` | todas as páginas |
| Simulador flutuante | CTA era turquesa com texto branco (~1,9:1) → verde institucional; `shadow-xl/2xl` (defaults do Tailwind) → tokens; cinzas/verde do Tailwind → tokens de superfície e `success` | 6 páginas |
| 404 | Campo navy, "404" como métrica, botões do Design System com área de toque; mesmos três destinos e mesmo texto | /404 |
| Home | Bloco institucional passa a nível protagonista (`bc-level-lead` + `t-h2-lead`) — era a seção de menor peso da página (§15) | Home |
| Home | Pilares de "Como ajudamos" com o mesmo peso (um deles tinha realce verde + sombra colorida); ícone sem chip circular | Home |
| Home | Foto e métricas de Sustentabilidade e painel do mapa regional não são clicáveis: elevação, zoom e troca de sombra no hover removidos | Home |
| Ruído | `.bc-accent-rule` (+ `-on-dark`) substitui **cinco** especificações do mesmo filete (3px/1px/4px × 32/40/64px, verde e amarelo) | 8 componentes/páginas |
| Cor | Amarelo sai da decoração: filetes do CTA final e do Mercado Livre e o H2 inteiro de "Presença regional" deixam de ser amarelos. Como preenchimento, `bc-yellow` existe agora só em botão/CTA | CTA final, Mercado Livre, Home |

Não alterado por decisão: as rampas `teal` e `amber` do `tailwind.config` já estão
realinhadas ao Manual (`teal-600` = #18857D, `teal-900` = #242F40, `teal-400` = #24D2C8),
então as referências legadas a `teal-*` **não** são desvio de paleta e renomeá-las seria
refatoração sem efeito visual (§22 do briefing).

### Componentes órfãos com cor fora da paleta

Não são montados por nenhuma rota, por isso não foram alterados (§5: neutralizar só o que
chega ao usuário). Candidatos a remoção — exige conferir dependências antes:
`FeatureV2`, `ChecklistItem`, `CardIconContent`, `TestimonyCard`, `Numbers`, `ProductCard`,
`HowItWorks`, `Resources`, `BcFormSection`, `Fields/Terms`, `pages/produtos/irec/page.tsx`
(a rota viva é `/produtos/certificacao-renovavel-irec`). Contêm `bg-yellow-500`/`yellow-200`
(amarelo do Tailwind, **não** #F1C035), cinzas do Tailwind e, no `irec/page.tsx`, a variante
centrada do `PageHeader` com lavagem verde sobre a fotografia.

## Revisão 3 — fechamento nas rotas vivas (30/09)

Escopo definido por grafo de render a partir de `App.tsx` (45 rotas → 136 arquivos
efetivamente renderizados). Os componentes órfãos listados no bloco anterior foram
confirmados como não renderizados e **não** foram tocados.

| Item | Mudança | Alcance |
|---|---|---|
| Glow no Hero | `.bc-hero-flow` removido: filete em gradiente + ponto turquesa com glow de 12px a 55% + animação infinita de 10s. Por erro de media query (definido em `max-width:768px`, escondido em `767px`) aparecia só na largura exata de 768px | Home |
| Carrossel | Indicador ativo sem o anel amarelo de 1px (padrão de glow) | Home |
| Formulários | `bc-form.css` declarava `--bc-yellow/--bc-error/--bc-dark/--bc-gray-400/--bc-white/--bc-radius/--bc-transition` locais, **sombreando** os tokens globais dentro do formulário. `--bc-dark: #1a2535` não é o navy da marca, e um hex no lugar de canais HSL quebraria qualquer classe Tailwind `bg-bc-dark` ali dentro. Renomeados para `--bcf-*` e apontados aos tokens | Mercado Livre, Gestão de Energia, Arrendamento |
| Formulários | Confirmação de envio: `text-gray-600` → `text-text-secondary`; `bg-white` → superfície com borda do sistema | 3 rotas |
| RelatedLinks | Variante `list` escrevia corpo e descrições em verde escuro (`teal-800`) e o link em `teal-700`, fora do sistema tipográfico → tokens de texto e `bc-primary` | 7 rotas |

Mantido por decisão, com motivo: a variante centrada do `PageHeader` (lavagem verde sobre
fotografia) é alcançada apenas pela rota órfã `/produtos/irec` — todas as rotas vivas usam
`align="left"`; o antigo `src/styles/lgpd.css`, sem importadores e com seletores que não
existem na página atual, foi removido; `Section` usa o `container` do Tailwind e alinhar sua
largura ao container do site exigiria validação visual; as referências a `teal-*` que restam
resolvem em cores do Manual pela rampa realinhada (`teal-900` = #242F40, `teal-600` = #18857D,
`teal-400` = #24D2C8).

## Refinamento visual (30/09)

Rodada de refinamento sobre o front-end já implementado — hierarquia, ritmo,
composição e separação de blocos. Nenhum texto, número, claim, rota, tracking ou
lógica foi alterado.

| Item | Mudança | Alcance |
|---|---|---|
| CTA final | Painel navy sólido contido na largura do conteúdo, sobre a superfície clara da página. Saem o gradiente diagonal navy→verde, o overlay radial e o grafismo. A faixa clara separa o CTA do rodapé, que antes se fundia com ele em um único bloco escuro. Turquesa só no eyebrow e no hover; amarelo só no CTA | 6 fechamentos de página |
| Rodapé | Grafismo decorativo de 300–420px removido; seta de hover em ~25 links removida; endereços em leitura compacta sem o pin repetido; assinatura institucional sai de amarelo/28px para branco/20px; padding 12/16 → 10/12; filete superior para distinguir do PreFooter. **Nenhum link removido** | todas as páginas |
| Ritmo vertical | `RegionalSection` adota o padrão `level` do `ProductSection` e passa a `mid` (eram 160px fixos entre as 6 seções de cada página regional). `FormEmbed` (`py-16 lg:py-24`), `RelatedLinks`, `SegmentsSolutions`, `SegmentsIndex`, `AboutTopics`, `BlogEditorialHub`, `LeadInstitucional` e `/produtos` passam para as escalas do Design System | 7 regionais + 8 blocos |
| Índice de segmentos | Eram 11 cartões com borda, sombra, ícone e seta — quatro invólucros para um link. Agora índice editorial com filete, numeral de dois dígitos e nome; linha inteira clicável | /segmentos |
| "Próximos passos" | Variante padrão do `RelatedLinks` saiu da grade de 3 colunas de blocos cinza para lista editorial em 2 colunas com filete | 7 rotas |
| "Para quem esta solução faz sentido" | O título era renderizado como eyebrow de 13px em cinza e os destinos em 15px, então a seção lia como links auxiliares. Agora título de seção, destinos em escala de item e linha inteira como área de toque. O `eyebrow` que as páginas passavam era **descartado** pelo componente e voltou a aparecer | 13 rotas |
| "Entenda melhor este tema" | Em Gestão de Energia havia um único destino (o hub do Blog) em uma seção alta: o hub passou para "Próximos passos" e o aprofundamento fica no `ContextualContent`. A variante editorial deixa de abrir 2 colunas com um só item | /produtos/gestao-de-energia |
| Conteúdo contextual | "Entenda melhor esta solução" passa de nível `support` para `mid` | páginas de produto |
| Decoração | `BlogEditorialHub` tinha duas composições gráficas na mesma seção, uma delas o radial (sol) — ficou uma | /conteudo/blog |
| Tipografia | `t-h3` e `t-h4-display` deixam a caixa alta. Uppercase em Barlow Condensed fica restrito a `t-display`, `t-h1` e à família `t-h2-*` | global |
| CTA flutuante | 128px no desktop → 72px; sombra `md` → `sm`; indicador "online" (sugeria atendimento em um botão de simulador) removido | 6 páginas |

`PreFooter` da Home foi **mantido**: é o único caminho interno da Home para
`/energia-solar-goiania`, e removê-lo enfraqueceria o link building — não é uma
decisão de composição.

**Capa do BC Cast:** os episódios não têm imagem nos dados (só `embedUrl`), então
o bloco contextual continua sem capa quando o destaque é um episódio. Permanece
como pendência humana, sem capa inventada.

## Próximas etapas (relatório visual)
- Todas as correções sistêmicas do relatório (S1–S7) foram aplicadas. Pendências agora são de
  conteúdo e fotografia (ver HANDOFF, seção "Decisões humanas pendentes").

## Recomposição editorial da Home (05/10/2026)

- A vitrine mantém quatro soluções com fotografia e dois serviços complementares. O claim do
  Consórcio fica em um bloco próprio, sem alterar descrição, ordem, links ou tracking.
- Movimento mantém texto e pilares completos; a foto existente fica à esquerda no desktop e
  acima da narrativa empilhada em tablet e mobile. No mobile, os pilares formam uma lista
  vertical. A foto preserva proporção nativa, sem overlay nem filtro.
- Resultados permanecem em navy, com economia em amarelo e indicadores secundários em branco.
- Especificações continuam dentro do slide ativo das usinas; mover os dados exigiria alterar o
  vínculo funcional com o Swiper. `slidesPerView="auto"` mantém um slide por vez e acompanha a
  largura real do contêiner, sem reimplementar a navegação.
- Institucional reúne título, descrição e ações ao lado da foto integral da equipe. A faixa de
  clientes conserva os 21 logos. BC Cast, FAQ, segmentos e demais acessos permanecem presentes.
- O CTA usa `public/img/editorial/infrastructure.webp`, sem edição nem camada CSS adicionada.
  A seção tem fundo branco e texto navy; eyebrow e contato usam o verde acessível
  `--be-green-text`; o botão amarelo mantém texto navy, com hover e foco visíveis.

Não havia captura da referência aprovada nem captura anterior disponível na pasta compartilhada;
esta rodada foi composta pela especificação textual. A cópia local também não contém metadados
Git, portanto branch, HEAD e alterações locais anteriores não puderam ser comparados.

## Fechamento conforme revisão editorial (05/10/2026)

- Em Movimento, fotografia e introdução formam a primeira linha editorial; os quatro pilares
  ocupam uma linha completa abaixo no desktop. Tablet e mobile empilham fotografia, introdução
  e pilares; a foto preserva os 1524×690 pixels intrínsecos e os pilares mantêm o texto integral.
- A grade mantém os 21 logos e seus PNGs originais. Dez marcas com menor área visível recebem
  escala óptica moderadamente maior; nenhum asset é recolorido, filtrado ou reduzido em opacidade.
- O episódio principal mantém mídia e metadados em proporção aproximada 65/35 no desktop. O
  índice secundário ocupa a coluna editorial ao lado, com descrições integrais; abaixo de 900px,
  mídia, identificação e índice fluem em uma coluna.
- Especificações, identificação e controles das usinas seguem associados ao slide ativo. Rótulos
  técnicos passaram a 14px, o contador a 16px e os alvos das setas permanecem em 44×44px.
- A hierarquia de Soluções já separa o claim de economia, mantém quatro imagens e descrições
  integrais e apresenta Arrendamento e Consultoria como entradas editoriais, sem cards.
- A revisão de superfícies confirmou contrastes AA nos textos avaliados e foco visível. O relatório
  recebido mencionava uma captura reduzida (457×2048px), mas ela não foi recebida como arquivo de
  imagem; portanto, não se declara comparação visual direta com essa referência.

## Apresentação institucional sob o hero (05/10/2026)

- A seção “Energia que transforma consumo em resultado” foi movida no JSX para logo após o
  carrossel e antes de Soluções. A foto oficial, os textos e os quatro pilares existentes foram
  preservados; os pilares seguem em duas colunas quando há espaço e passam a uma coluna em telas
  menores. Não foi encontrada outra faixa que repetisse os mesmos quatro pilares.
- O claim existente “Até 25% de economia” agora aparece junto ao rótulo “Geração distribuída” e a
  “Fazer adesão gratuita”. O CTA reutiliza o destino App Energia e o identificador
  `home_solucoes_adesao` já empregados no CTA de adesão de Soluções. O claim e as ações daquela
  seção permanecem intactos.
- Copy proposta pendente de aprovação — não publicada: “Na conta de energia com geração
  distribuída.” Não foi localizada no projeto uma frase equivalente aprovada para esse destaque.
  Substituir ou incluir essa explicação exige aprovação editorial.
