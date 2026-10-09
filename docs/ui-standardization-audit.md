# Auditoria de padronização institucional — BC Energia

Direção: Editorial de Energia em Movimento. Data: 2026-10-02.

## Escopo e implementação

- Home: mantém a composição e o padrão tátil aprovados.
- Produtos e Segmentos: corpo editorial com títulos Barlow Condensed, leitura Onest, ações preenchidas com relevo discreto e mídia responsiva existente.
- Institucional e páginas regulatórias: mesmos tokens, componentes funcionais legíveis e coluna de leitura existente preservada.
- Conteúdo, artigos e BC Cast: mesmas fontes, ações e foco; mídia e dados permanecem nas fontes atuais.
- Páginas regionais: mesmos estilos de corpo; cobertura, mapa, textos e URLs existentes preservados.
- Formulários nativos: largura até 650 px, campos de 48 px, fonte de 16 px, foco visível e mensagens sem corte pelo container.
- Formulários externos: destinos e integrações preservados; não se altera o conteúdo de terceiros dentro de iframe.

A folha `src/styles/institutional-standardization.css` aplica-se somente a `.bc-inner-editorial`. Os banners `.bc-reference-banner` são explicitamente excluídos dos estilos de texto e ações. Header, footer e simulador estão fora desse escopo. Home utiliza seu stylesheet aprovado.

Botões mantêm suas variantes de cor. Somente ações preenchidas recebem profundidade leve; links textuais, FAQ e conteúdo estático não recebem elevação. Hover exige ponteiro preciso; disabled, carregamento e preferência por movimento reduzido não recebem deslocamento.

## Validação técnica

- Typecheck aprovado.
- Lint sem erros; 23 avisos preexistentes, principalmente Fast Refresh, dependências de hooks e diretivas sem uso.
- Build de produção e pré-renderização aprovados.
- Comparação dos 66 arquivos HTML correspondentes às páginas pré-renderizadas: mesmos textos, links, tracking, metadados e contagem de H1; IDs e referências ARIA válidos.
- Auditoria de navegação: 33 destinos, nove verificações aprovadas, sem avisos/erros.
- Fontes de métricas/cobertura, rotas, componentes do carrossel, simulador e handlers dos formulários preservados.
- Limpeza de lint: descarte de caracteres NUL mantém o mesmo resultado; foi removida somente uma diretiva referente a regra ESLint não instalada.

## Pendências de homologação

A inspeção visual e interação real em navegador nas larguras 375, 768, 1280 e 1440 px não foram executadas: o mecanismo de navegador exigido pelo ambiente Sites não está disponível. Breakpoints e escopo foram revisados no código; isso não substitui screenshots ou testes de teclado reais.

Também permanece pendente o teste ponta a ponta de envio dos formulários, sem enviar leads de teste não autorizados. A auditoria confirma preservação de código e destinos, não comprova disponibilidade dos serviços externos.

Não considerar o site visualmente homologado até concluir essas verificações. Nenhum texto, claim, número, rota ou integração foi inventado ou substituído.
