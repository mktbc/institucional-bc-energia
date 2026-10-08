
## Verificação local de assets do Consórcio
- Data: 2026-08-14 · Seção: /produtos → Mercado Livre de Energia e Consórcio BC Energia
- A versão local de `/img/pages/consorcio-intro.webp` foi aberta e inspecionada:
  é uma fotografia sem texto comercial legível embutido. A anotação anterior
  que atribuía condições comerciais a esse arquivo não se confirma nesta cópia.
- Os PDFs locais de campanha e condições gerais não foram editados; a extração
  textual não está disponível neste ambiente. Verificar se há limiar de conta
  impresso antes de reutilizar ou distribuir essas peças.
- Não existe no projeto versão da MESMA fotografia sem texto (`mercado-livre-de-energia-intro2.jpg`
  é outra fotografia). Nenhum asset novo foi criado.
- Ação necessária: confirmar os materiais PDF e manter informações comerciais
  variáveis em HTML quando possível.

## Atualização — seção Consórcio BC Energia (/produtos)

- A anotação anterior de texto embutido em `/img/pages/consorcio-intro.webp` não
  corresponde à fotografia verificada na cópia local. O arquivo não foi alterado.
- Substituída pela fotografia institucional já existente no projeto
  `/img/pages/consorcio-de-energia-intro.jpg`, sem texto embutido, convertida para
  `/img/pages/consorcio-solucao.webp` (+ variante 600w).
- **PENDÊNCIA DE DESIGN — ARTE DO CONSÓRCIO ATUALIZADA PARA ATÉ 25%**: caso a peça
  publicitária volte a ser usada em algum ponto do site, ela precisa ser refeita com
  o percentual correto.

### DECISÃO HUMANA NECESSÁRIA
Divergência de percentual entre páginas (fora do escopo desta alteração):
- `src/pages/produtos/consorcio-bc-energia/data.tsx` (2 ocorrências) — "até 26%"
- `src/pages/produtos/consorcio-bc-energia/page.tsx` (1 ocorrência) — "até 26%"
- `src/pages/home/Sliders/Sliders.data.tsx` — "26% na energia"
- `src/pages/produtos/gestao-de-energia/page.tsx` — "26%"
Não foram alteradas por estarem fora da seção solicitada; aguardando autorização.

Condições comerciais sem fonte central no projeto: conta mínima do Consórcio
R$ 700,00, baixa tensão (Grupo B), lista de estados atendidos,
ausência de pagamento inicial/taxa administrativa.
