# HANDOFF — Entrega final consolidada para upload manual no GitHub

**Data da entrega:** 30/09/2026 (revisão 3 — fechamento do conceito Institutional Energy Premium)
**Repositório oficial de destino:** `git@github.com:mktbc/site-grupo-bc-energia.git`
**Pacote:** `bc-energia-site-github-ready.zip` — projeto completo, abre direto na raiz.
**Push realizado:** NÃO. **Upload manual necessário:** SIM.

---

## 1. Base e versão

| Item | Valor |
|---|---|
| Base original do export | Export inicial @ `7e977c3` |
| Última base consolidada | **`9508940`** ("Corrigiu slider desktop e mobile"), reproduzida localmente no commit `b58ac55` |
| Versão consolidada | Árvore local com todos os blocos abaixo (hashes locais — não existem no GitHub até o upload) |
| Relação com upstream | O repositório upstream não contém nada posterior a `9508940`. As evoluções devem partir do GitHub |

Arquivos em relação à base `7e977c3`: 61 alterados, 6 adicionados, 1 removido.
Desde o ZIP da rev. 2: **27 arquivos alterados**, nenhum adicionado, nenhum removido.
(As contagens acima contra `7e977c3` e `9508940` são históricas: o histórico local foi
reinicializado em 29/09 a partir da árvore consolidada, e esses dois commits não existem
mais localmente. A árvore continua com 822 arquivos versionados.)
Em relação à base `9508940`: 50 alterados, 4 adicionados.

Adicionados: `HANDOFF-GITHUB-MANUAL.md`, `docs/EDITORIAL-ENERGY-PREMIUM.md`,
`src/config/formWidgetTheme.ts`,
`src/components/Content/ArticleToc.tsx`, `src/data/content/toc.ts`.
Removido: `src/pages/home/Sections/SolutionHighlight.tsx` (órfão).

---

## 2. Blocos concluídos

| Bloco | Principais mudanças |
|---|---|
| **Home** | Home-vitrine: Soluções logo após o hero; Consórcio BC Energia protagonista (foto, painel translúcido, "Até 25%", adesão), Mercado Livre em destaque, complementares em cards, Consultoria Jurídica como link externo; H2 de "Como ajudamos" fora da escala de H1; métricas número→rótulo→explicação com `<dl>` válido; hero com altura fluida e H1 ≤ 64px; ruído decorativo removido |
| **Produtos** | Hub `/produtos` com Consórcio como destaque; eyebrow duplicado removido; amarelo do hero só em "perfil de consumo"; Mercado Livre com formulário logo após o FAQ; bloco de links duplicado removido em Mercado Livre e Consórcio (nenhum destino perdido) |
| **Segmentos** | Vitrine do hub em proporção única (antes 4:5 no desktop, ~1.117px); CTA "Ver todos" leva ao índice de 11; hero próprio nos 4 segmentos em split (antes a mesma foto); Desafios tipográfico × Benefícios em cards; ~10 divisores a menos por página |
| **Sobre** | Sem alteração (aprovada no relatório) |
| **Quem Somos** | Grade de logos compacta (era o bloco de ~708px); seção Estrutura 7/12 + vídeo 5/12 |
| **Nossas Usinas** | Registro fotográfico em 3 fotos 16:10 com as mais nítidas (antes 16:9 esticado, ~1.200px); hero próprio |
| **Conteúdo / Blog** | Sumário do artigo gerado dos H2 reais (+FAQ), recolhível no mobile e sticky no desktop; ids estáveis + `scroll-mt`; ritmo do corpo mais compacto; hero temático do artigo; hub sem repetição e com descrição dos formatos |
| **BC Cast** | Macrobloco escuro (mídia × leitura), como documentado no componente |
| **Contato** | Hero em alta resolução; passos com marcador 01–03; cards estáticos sem hover |
| **Contato Enviado** | Página legada (176px de padding, H1 "Contato", sem próximo passo) → cabeçalho compacto com a confirmação como H1 e 2 próximos passos |
| **Simulador** | Formulário lado a lado no desktop (antes empilhado, ~956px); embed com altura inicial estável |
| **Regionais** | Todos os divisores decorativos removidos do template; território em card; nome do lugar fora da escala de H1; heros de Rio Verde e Palmas trocados (retratos de ~500px ampliados ~4×) |
| **Conceito Visual Institucional** (29/09) | Bug: classe `bg-[radial-gradient(...)` sem `]` no CTA final fora da Home (overlay nunca renderizava). Paleta: `#123E43` e `#1f3b49` removidos dos gradientes; tema do simulador unificado em `src/config/formWidgetTheme.ts` com hex oficiais (achado B1). Sustentabilidade: ícone de eólica (fonte que o grupo não opera) e planeta com folhas substituídos. Rodapé: coluna "Conversão" → "Atendimento". Header e estrutura do rodapé auditados e mantidos. Cases/depoimentos/parceiros: não implementados por não existirem no projeto — nenhum placeholder criado |
| **Institutional Energy Premium** (30/09) | Tokens: lavagem radial turquesa do `<body>` removida; `--focus` = #F1C035 exato; `--shadow-energy` deixa de ser sombra colorida; `--glow-*` e `.bc-depth-panel` removidos; `--glass-shadow` em navy e `--glass-blur` sem `saturate()`; loader sai de `#0d9488` (teal do Tailwind) para o verde institucional; Barlow Condensed restrito a `h1–h3`. Header: barra sólida em navy após o scroll (o `backdrop-blur` a 95% de opacidade não produzia efeito) com `border-b` turquesa, véu de leitura sobre o Hero e item ativo com indicador além da cor (WCAG 1.4.1). Rodapé: títulos de coluna usavam `font-onest`, classe inexistente no `tailwind.config`, e caíam em Barlow → `font-sans`. Widget do simulador: CTA turquesa com texto branco (~1,9:1) → verde institucional; sombras `xl/2xl` → tokens. 404 institucional. Home: bloco institucional em nível protagonista; pilares de mesmo peso; hovers removidos de foto, métricas e painel do mapa (não são clicáveis). `.bc-accent-rule` substitui cinco especificações do mesmo filete; amarelo sai da decoração |
| **Revisão 3 — rotas vivas** (30/09) | Escopo por grafo de render a partir de `App.tsx` (45 rotas → 136 arquivos renderizados); componentes órfãos confirmados como não renderizados e não tocados. `.bc-hero-flow` removido do Hero (filete em gradiente + ponto turquesa com glow de 12px a 55% + animação infinita de 10s; por erro de media query aparecia só na largura exata de 768px); anel amarelo de glow do indicador do carrossel removido. `bc-form.css` declarava `--bc-yellow/--bc-error/--bc-dark/--bc-gray-400/--bc-white/--bc-radius/--bc-transition` locais **sombreando** os tokens globais dentro do formulário (`--bc-dark: #1a2535` não é o navy da marca, e um hex no lugar de canais HSL quebraria qualquer classe Tailwind `bg-bc-dark` ali dentro) → renomeados para `--bcf-*` e apontados aos tokens, sem tocar em regra, seletor ou lógica. Confirmação de envio dos formulários em tokens. `RelatedLinks` variante `list` (7 rotas) com corpo e link no sistema tipográfico |

### Correções sistêmicas do relatório

| # | Status | Onde |
|---|---|---|
| S1 — índices 01–04 grandes | Concluído | `ProductSteps`, `ProductProcess` |
| S2 — H2 competindo com H1 | Concluído na Home | `Positioning` |
| S3 — hero interno alto | Concluído | `PageHeader`, `.hero-title` |
| S4 — excesso de divisores | Concluído | Segmentos, Regionais, `NextAction` |
| S5 — alvos de toque < 44px | Concluído | Rodapé, breadcrumbs (menu mobile já atendia) |
| S6 — dois amarelos | Concluído | Token exato `44.4 87% 57.6%` = #F1C035 |
| S7 — amarelo excessivo no hero | Concluído em `/produtos` | `produtos/page.tsx` |

---

## 3. Componentes compartilhados alterados

`PageHeader`, `ProductSteps`, `ProductProcess`, `NextAction`, `Customers`, `FormEmbed`,
`Breadcrumbs`, `Footer`, `Button` (hover primário), `ContentBody`, `EditorialLayout`,
`SegmentChallenges`, `SegmentBenefits`, `SegmentProof`, `InstitutionalStrip`,
`components/Regional/*` (5 componentes), formulários `FormularioMercadoLivre`, `FormularioIREC`,
`FormularioParceiro` (somente cor e `role` da mensagem de erro).
Tokens: `--bc-yellow`, `--bc-accent`. CSS: `globals.css` (`.hero-title`), `carousel.css`.

---

## 4. Decisões

**Visuais**
- Painel translúcido só sobre fotografia protagonista; cards comuns sólidos; hover de elevação apenas em elementos clicáveis.
- Amarelo #F1C035 restrito a CTA, número principal e destaque pontual.
- H1 ≤ 64px em todo o site; H2 de seção ≤ 48px.
- Fotografia: nenhuma imagem nova; só assets existentes, priorizando resolução compatível com a área exibida.

**Comerciais**
- Consórcio BC Energia (geração distribuída por assinatura) é o protagonista na Home e no hub de Produtos, por prioridade comercial, não pela ordem do código.
- Nenhum produto, número, critério ou claim novo foi criado.

**Tracking**
- `data-cta-name` preservados. Removido: `home_como_ajudamos_produtos` (link redundante após a vitrine). Adicionados: "Fazer adesão gratuita" (vitrine da Home, mesmo rótulo do hero) e os CTAs da página de confirmação (rótulos "Simular minha economia" e "Conhecer nossas soluções", via `PageHeader`).
- O formulário do Mercado Livre mudou de posição na página: métricas de profundidade de rolagem até ele podem variar.

---

## 5. C2 — padronização do 25%

**Padronização aprovada: "Até 25% de economia na conta de energia" / "Até 25% de economia".**
O 25% é a economia aplicada à conta de energia, não taxa mensal ou anual.

Busca global final (11/09/2026), excluindo a documentação:

| Termo | Ocorrências |
|---|---|
| "25% ao mês", "25% por ano", "25% mensal", "25% anual", "25% ao ano", "25% por mês" | 0 |
| "desconto anual", "economia anual", "desconto mensal" | 0 |
| "economia mensal" | 3 — **mantidas** |

Mantidas, com motivo: `src/components/Simulator/Simulator.tsx`, `src/components/Simulator/simulator.data.ts` e
`src/pages/simulador-de-economia/page.tsx` — referem-se ao **valor em R$ estimado por mês** calculado pelo
simulador, não à taxa de 25%.
Correções feitas na consolidação anterior: 11 substituições em 5 arquivos (Consórcio page/data, quickAnswers,
artigo, hero slide 2).

---

## 6. Conflitos de conteúdo ainda abertos

| # | Conflito | Tratamento atual |
|---|---|---|
| C1 | Limiar do Consórcio | **Resolvido no conteúdo textual local:** contas a partir de R$ 700; materiais gráficos/PDF ainda precisam de inspeção |
| C3 | "mais de 100 usinas" (Consórcio) × "14 complexos de geração" | Mantido; confirmar se usinas ≠ complexos |
| C4 | Estados: site cita DF e não SP; campanhas citam SP e não DF | Mantido |
| C5 | Slide 1 do hero (H1) é Mercado Livre; vitrine prioriza Consórcio | Mantido — trocar muda o H1 (SEO) |
| C6 | App Energia em `http://` e `https://` | Mantido; padronizar em https |
| C7 | 25% "sobre a parcela de energia da fatura" (FAQ) × "na conta de energia" | Qualificador preservado |
| C8 | Gestão de Energia: "Até 25% nas despesas com conta e consumo" | Outro produto; confirmar vigência |

---

## 7. Decisões humanas pendentes

- **Fotos:** usinas em alta resolução (12 de 14 têm só 500×300); fotos regionais próprias (Aparecida de Goiânia e Trindade usam a mesma foto aérea; Rio Verde reutiliza a foto do segmento Agronegócio); hero próprio de Quem Somos (hoje a mesma foto de `/sobre` e `/produtos`); foto real de atendimento para Contato (hoje a mesma do hero de Gestão de Energia); imagem/capa oficial do BC Cast; heros próprios para Conteúdo, Blog, BC Cast, Leilão e Fator de Alavancagem (hoje `contact.webp`, 897×750).
- **Teste real** de envio dos formulários (contato, simulador e formulários de produto) no navegador.
- **Âncoras do artigo** derivam do texto dos H2; para links externos permanentes, fixar `id` nos dados.
- **Conflitos C1, C3–C8** (seção 6).

---

## 8. Validações

**Executadas neste ambiente**

| Validação | Resultado |
|---|---|
| Bundle esbuild de `src/main.tsx` e `src/entry-server.tsx` (resolve todos os imports e aliases) | 0 erros, 0 avisos |
| Referências de assets em código, dados e `index.html` | 138 referências, 0 faltando; 21 logos de clientes, 0 faltando |
| Links internos para rotas | Nenhum link para rota inexistente |
| Âncoras novas | `#todos-os-segmentos` com alvo; ids do sumário gerados e testados (10 H2 únicos) |
| H1 | Componentes com `<h1>`: `PageHeader`, `SegmentsHero`, 404, hero da Home — um por página |
| `data-cta-name` (literais, base × atual) | 1 removido intencional, 1 adicionado (seção 4) |
| Regressão por inspeção (26 marcadores dos blocos) | 26/26 presentes |
| Busca global C2 | Seção 5 |
| Varredura de segurança | Seção 9 |
| Conferência do ZIP extraído | Idêntico à árvore consolidada |

**Revisão 3 (30/09) — executadas neste ambiente**

| Validação | Resultado |
|---|---|
| Análise sintática TSX/TS do projeto inteiro (parser do `typescript`) | 373 arquivos, 0 erros |
| Balanceamento de chaves e parênteses dos 5 stylesheets | 5/5 OK |
| `@apply` de classes custom inexistentes no `globals.css` | nenhuma |
| Variáveis `--bcf-*` do formulário (definidas × usadas, auto-referência) | 8/8, nenhuma órfã, nenhuma auto-referência |
| Grafo de alcance a partir de `main.tsx` e `entry-server.tsx` | 365 alcançáveis, 19 órfãos (igual a antes das mudanças) |
| Grafo de render a partir das 45 rotas de `App.tsx` | 136 arquivos renderizados |
| Tokens de cor usados × definidos no `tailwind.config` | todos existem |
| Varredura de cor nas rotas vivas | nenhuma cor fora da paleta (exceto o vermelho da marca do YouTube no player) |
| Varredura de glow/neon/animação infinita nas rotas vivas | só restam anéis de foco/erro (blur zero) e o loader |
| H1 por página / alvos de toque ≥ 44px / largura fixa nova / `w-screen` em layout | OK |
| Claims: ocorrências de "25%" e periodicidade | 20 ocorrências, 0 com periodicidade |
| Preservação (backend, Supabase, APIs, rotas, SEO, sitemap, prerender, canonical, robots, `noindex`, tracking, `data-cta-name`, lógica de formulário e do simulador) | nenhum arquivo dessas áreas no diff |

**NÃO VALIDADO NESTE AMBIENTE** (sem `node_modules`; registro npm e GitHub bloqueados pela rede):
- TypeScript (`npm run typecheck`)
- ESLint (`npm run lint`)
- Build de produção com Vite + Tailwind + sitemap + prerender (`npm run build`)
- Validação visual e responsiva (1920/1440/1366/1024/768/390), overflow horizontal e console no navegador
- Envio real de formulários e funcionamento do embed do simulador

---

## 9. Segurança

| Item | Resultado |
|---|---|
| .git removido | SIM |
| .workspace removido | SIM (e `.workspace/` no `.gitignore`) |
| node_modules removido | SIM (não existe na árvore) |
| dist removido | SIM (não existe na árvore) |
| tokens encontrados | SIM — no export original (`.workspace/.git/config`, token de acesso Git) |
| tokens removidos | SIM — o diretório nunca entrou na árvore consolidada |
| secrets identificados | NÃO — varredura por JWT, chaves privadas, tokens de GitHub/AWS/Stripe/Google/Slack, chave de serviço do Supabase, cabeçalhos de autorização e URLs com credencial: nenhum resultado |
| .env reais incluídos | NÃO — só `.env.example` (placeholders e links públicos); `.env` real ignorado no `.gitignore` |

Observação: `src/lib/supabase.ts` contém uma chave **publicável** do Supabase como fallback. É pública por design (vai ao navegador; proteção via RLS) e foi mantida para não quebrar formulários. Recomendado definir `VITE_SUPABASE_ANON_KEY` no ambiente de deploy.
**Ação recomendada:** o ZIP original exportado (`bc-energia-frontend-completo.zip`) contém o token — não compartilhe esse arquivo.

---

## 10. Assets problemáticos (mantidos em `public/`, sem exibição)

| Asset | Problema | Referências |
|---|---|---|
| `img/pages/segmentos/saude-v2.webp` | Marca d'água "MOCKUP/LOGO" | Apenas comentário — órfão |
| `img/pages/gestao-de-energia-intro.webp` (+`-600`) | Texto embutido "até 26%" | Apenas comentário — órfão |
| `img/pages/mercado-livre-de-energia-intro.webp` (+`-600`) | Texto embutido | Só em `solutions.data.ts`, arquivo não importado — efetivamente órfão |
| `img/components/bc-cast/cast-1..5` (.webp/.jpg) | Fotos genéricas; `cast-3` e `cast-5` mostram geração eólica (o grupo não opera); `cast-1` duplica outra foto | Nenhuma — órfãos |
| `img/pages/contact.webp` | 897×750, ampliada em heros largos | **Em uso** em 7 páginas |

Candidatos à remoção futura: todos os órfãos acima. Não removidos nesta entrega (sem limpeza destrutiva).
Também em `src/data/segments/*.json` há spans `text-amber-400` em um campo `title` que não é renderizado pelas páginas atuais (dados preservados).

---

## 11. Como subir manualmente no GitHub

1. **Veja o estado do repositório:** branch padrão e último commit. Não sobrescreva nada sem comparar.
2. **Crie uma branch** pela interface (seletor de branch → branch de trabalho → "Create branch").
3. **Envie o conteúdo do ZIP descompactado** para essa branch:
   - Repositório já com o projeto: prefira o editor web `github.dev` (tecla `.` no repositório) ou um Codespace — arraste a pasta inteira para o explorador, revise as diferenças na aba Source Control e faça o commit. A interface "Upload files" aceita no máximo 100 arquivos por envio.
   - Exclua `src/pages/home/Sections/SolutionHighlight.tsx` se existir no repositório.
   - Não envie o `.zip` compactado como arquivo, nem a pasta `.workspace` do export antigo.
4. **Sem force push**, sem apagar branches.
5. **Abra um Pull Request** para a branch padrão e revise o diff.
6. **Antes do merge (Codespace):** `npm install && npm run typecheck && npm run lint && npm run build` — é a primeira validação completa desta entrega. Depois, teste visual nos breakpoints e um envio real de formulário.

## 12. Como continuar

- Leia `docs/EDITORIAL-ENERGY-PREMIUM.md` (conceito, decisões por bloco e conflitos).
- Novas entregas devem partir **do estado do GitHub** (repositório oficial).
- Próximos passos: validar build e visual desta entrega; decidir C1, C3–C8; produzir as fotos listadas na seção 7; remover os assets órfãos da seção 10.
