# Simulador de economia → n8n

Formulário de `/simulador-de-economia` (PageConv migrada). Código:
`src/pages/simulador-de-economia/pageconv/components/LeadForm.tsx` e
`src/pages/simulador-de-economia/pageconv/lib/lead-config.ts`.

## Configuração do frontend

A URL do webhook não está no código. Ordem de leitura:

1. `VITE_SIMULADOR_WEBHOOK_URL`: variável de build (só vale se o build tiver acesso a ela).
2. Chave `SIMULADOR_WEBHOOK_URL` na tabela `public.app_config` do Supabase
   (`ufbkblkahyzfsjsoqmzg`), lida em tempo de execução; muda sem novo build.

A URL precisa começar com `https://`. Sem URL válida:

- em `npm run dev`: modo de teste, que só registra o payload no console e mostra sucesso;
- no build publicado: o envio é bloqueado, aparece a mensagem de "envio indisponível"
  e os dados digitados ficam no formulário. Nenhum lead é enviado ao webhook antigo
  da PageConv.

Não use tokens na URL nem no código: tudo que o frontend lê é público.

## Requisição

- `POST` com `Content-Type: application/json`. Esse tipo dispara um *preflight*
  `OPTIONS` no navegador, então o nó Webhook precisa responder CORS para
  `https://grupobcenergia.com.br` e `https://www.grupobcenergia.com.br`
  (e para o domínio de preview do Lovable, se for testar por lá). No nó Webhook:
  Options → Allowed Origins (CORS).
- Tamanho: a fatura vai até 10 MB, o que dá cerca de 13,4 MB em base64. O limite
  padrão do n8n é 16 MB (`N8N_PAYLOAD_SIZE_MAX`).
- Resposta: qualquer 2xx conta como sucesso. Um JSON `{"lead_id": "..."}` é opcional
  (só aparece no console). Respostas 4xx ou 5xx mostram erro ao visitante e mantêm
  os dados preenchidos; o texto da resposta nunca é exibido.

## Payload

Os nomes dos campos são os mesmos da PageConv, então o mapeamento do Salesforce
continua compatível.

| Campo | Conteúdo |
| --- | --- |
| `nome`, `whatsapp`, `telefone_sf` | Nome; WhatsApp no formato `(62) 99999-8888` (o mesmo valor nos dois campos) |
| `email`, `email_sf` | E-mail (opcional; vazio se não informado) |
| `estado` | `GO`, `TO`, `PR`, `MG` ou `MT` |
| `cidade` | Sempre vazio (o formulário não coleta) |
| `valor_conta` | Faixa: `A partir de R$ 800` … `Acima de R$ 5.000` |
| `tipo` | `Residencial`, `Comercial` ou `Industrial` |
| `titular` | `Sim` ou `Não` |
| `lgpd` | `"true"` |
| `fatura`, `fatura_base64` | Conteúdo do arquivo em base64, sem o prefixo `data:` (o mesmo valor nos dois campos) |
| `fatura_anexada` | `"true"` (o upload é obrigatório) |
| `fatura_nome`, `fatura_tipo`, `fatura_tamanho` | Nome do arquivo, MIME (`application/pdf`, `image/jpeg`, `image/png`) e bytes |
| `utm_*` | UTMs da URL: `utm_source`, `utm_medium`, `utm_font`, `utm_channel`, `utm_placement`, `utm_campaign_code`, `utm_campaign`, `utm_campaign_id`, `utm_link_id`, `utm_adcampaign(_id)`, `utm_adgroup(_id)`, `utm_adset(_id)`, `utm_content(_id)`, `utm_term`, `utm_originator`, `utm_seller`, `utm_project_id`, `utm_product`, `utm_segment`, `utm_public`, `utm_city`, `utm_offer`, `utm_objective`, `utm_contract`, `utm_lp`, `utm_id` |
| `utm_state`, `utm_region` | Derivados do estado escolhido (`GO` → `Goias`, `MT` → `Centro-Oeste` etc.) |
| `gclid` | Click ID do Google Ads, quando presente na URL |
| `lead_source` | `utm_source` real; sem ele, `SEO` |
| `page_url`, `page_url_full`, `page_path` | URL real da conversão (sem query, completa e só o caminho) |
| `origem_site` | `site_institucional` (novo) |
| `origem_pagina` | `/simulador-de-economia` (novo) |
| `origem_formulario` | `simulador_institucional` (na PageConv era `pageconv`) |
| `form_name` | `simulador_institucional` (novo) |
| `created_at` | ISO 8601 do envio |

### UTMs

- **Visita com UTMs:** os valores recebidos são enviados como estão (código de campanha
  incluso), e os UTMs vazios não recebem valor padrão.
- **Visita sem nenhuma UTM:** valem os padrões do site institucional (`src/helpers/utm.ts`):
  `utm_lp=grupobcenergia-com-br`, `utm_campaign_code=BCCAMPMKT033`, `utm_source=SEO`,
  `utm_medium=organic`, `utm_font=marketing`, `utm_channel=Site`, `utm_product=GD`,
  `utm_segment=B2B B2C`, `utm_contract=sem fidelidade`.
- **O que deixou de acontecer:** nenhum lead do simulador recebe `pageconv` ou `GoogleAds`
  como origem padrão. Antes, uma visita com qualquer UTM, mas sem `utm_source`, virava
  `lead_source=GoogleAds`.

## Workflow novo (a partir de "LP PageConv - Criação do SalesForce")

Webhook → Verificação de anexo → Conversão Base64 → Google Drive → Preparação do lead → Salesforce → Resposta.

1. **Webhook:** `POST`, caminho novo (não reutilize `capture-fatura`), CORS como acima,
   e "Respond: Using Respond to Webhook node".
2. **Verificação de anexo:** `{{$json.body.fatura_anexada}} === "true"` e `fatura_base64` não vazio.
3. **Conversão Base64:** "Convert to File" ou "Move Binary Data", a partir de
   `body.fatura_base64`, com nome `body.fatura_nome` e MIME `body.fatura_tipo`.
4. **Google Drive:** credencial da sua conta. Não use as credenciais da conta antiga.
5. **Preparação do lead:** mesmo mapeamento da PageConv. Para distinguir a origem,
   mapeie `origem_site`, `origem_pagina` e `origem_formulario` no Salesforce, se houver campo.
6. **Salesforce:** credencial da sua conta.
7. **Resposta:** 200 com `{"lead_id": "..."}`; em falha, 4xx ou 5xx.

Depois de ativar o workflow, cadastre a URL de produção em `app_config.SIMULADOR_WEBHOOK_URL`
(ou em `VITE_SIMULADOR_WEBHOOK_URL`) e faça um envio de teste controlado.

## Eventos de rastreamento

O sucesso dispara `form_submit` e `lead_generated` no `dataLayer`, com `form_name=simulador_institucional`
e o contexto de atribuição do site. A falha dispara `form_error` com `error_type=submission`.
O evento `pageconv_form_submit` da PageConv não é mais enviado por esta página. Se alguma
conversão do Google Ads no GTM dependia dele, ela precisa de um gatilho para `lead_generated`
com `form_name=simulador_institucional`.
