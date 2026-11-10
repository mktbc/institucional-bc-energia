# Simulador de economia → n8n → Salesforce: contrato

Formulário de `/simulador-de-economia` (PageConv migrada). Código:
`src/pages/simulador-de-economia/pageconv/components/LeadForm.tsx` e
`src/pages/simulador-de-economia/pageconv/lib/lead-config.ts`.
Workflow: `n8n/BC-Energia-Simulador-Institucional-n8n.json` (guia em `n8n/README.md`).

## Endpoint

- URL pública de produção em `SIMULADOR_WEBHOOK_PRODUCAO` (`pageconv/lib/lead-config.ts`):
  `https://automacao-gd.grupobcenergia.com.br/webhook/simulador-institucional-leads`.
  `VITE_SIMULADOR_WEBHOOK_URL` (build), se definida, tem prioridade. O Supabase (`app_config`)
  não é mais consultado para o simulador. Em `npm run dev` sem a variável, só registra o payload
  no console (nenhum envio local vira lead).
- `POST`, `Content-Type: application/json` (dispara preflight `OPTIONS`; CORS no nó Webhook).
- Corpo de até ~14 MB (fatura de 10 MB em base64). Limite padrão do n8n: 16 MB (`N8N_PAYLOAD_SIZE_MAX`).

## Campos

Obrigatório = o workflow responde 400 sem ele.

| Campo | Tipo | Obrigatório | Valores / regra |
| --- | --- | --- | --- |
| `nome` | string | sim | 2 a 120 caracteres |
| `whatsapp`, `telefone_sf` | string | sim (um dos dois) | `(62) 99999-8888`; 10 a 13 dígitos |
| `email`, `email_sf` | string | não | formato de e-mail quando preenchido |
| `estado` | string | sim | `GO`, `TO`, `PR`, `MG`, `MT` |
| `cidade` | string | não | vazio (o formulário não coleta); cai para `utm_city` |
| `valor_conta` | string | sim | faixa, ex.: `700 a 1.200` |
| `tipo` | string | sim | `Residencial`, `Comercial`, `Industrial` |
| `titular` | string | sim | `Sim` ou `Não` |
| `lgpd` | string | sim | `"true"` |
| `fatura_base64` | string | não* | base64 sem `data:`; PDF, JPG ou PNG conferidos pelo conteúdo; até 10 MB |
| `fatura` | string | não | mantido por compatibilidade; o site envia vazio. Aceito como base64 se `fatura_base64` vier vazio |
| `fatura_anexada` | string | não | `"true"` / `"false"` |
| `fatura_nome`, `fatura_tipo`, `fatura_tamanho` | string | não | nome do arquivo, MIME e bytes |
| `utm_*`, `gclid` | string | não | UTMs da URL ou os padrões do site (ver abaixo) |
| `utm_state`, `utm_region` | string | não | derivados do estado (`GO` → `Goias`) |
| `lead_source` | string | não | `utm_source` real; sem ele, `SEO` |
| `page_url`, `page_url_full`, `page_path` | string | não | URL da conversão |
| `origem_site`, `origem_pagina`, `origem_formulario`, `form_name` | string | não | `site_institucional`, `/simulador-de-economia`, `simulador_institucional` |
| `created_at` | string | não | ISO 8601 |

\* A fatura é obrigatória no formulário. O workflow aceita lead sem fatura para nunca perder o
contato (`EXIGIR_FATURA = false` em `n8n/src/validar-payload.js`).

UTMs: com qualquer `utm_*` na URL, os valores vão como estão. Sem nenhuma, valem os padrões de
`src/helpers/utm.ts` (`utm_lp=grupobcenergia-com-br`, `utm_campaign_code=BCCAMPMKT033`,
`utm_source=SEO`, `utm_medium=organic`, `utm_font=marketing`, `utm_channel=Site`, `utm_product=GD`,
`utm_segment=B2B B2C`, `utm_contract=sem fidelidade`). Fallbacks históricos aplicados no n8n:
`utm_project_id` → `utm_campaign_code`; `utm_adgroup(_id)` → `utm_adset(_id)`; `utm_city` → cidade.
Macros de anúncio não resolvidas (`{{ad.name}}`, `{campaignid}`, `__PLACEMENT__`) são descartadas.

## Respostas

| Situação | HTTP | Corpo |
| --- | --- | --- |
| Lead criado | 200 | `{"success": true, "lead_id": "00Q…"}` |
| Mesmo envio em até 10 min | 200 | `{"success": true, "duplicate": true}` (não cria outro lead) |
| Payload inválido | 400 | `{"success": false, "error": "payload_invalido"}` |
| Execução sem requisição (Webhook `[{}]`) | 400 | `{"success": false, "error": "sem_dados"}` |
| Fatura inválida | 400 | `{"success": false, "error": "fatura_invalida"}` |
| Salesforce indisponível | 502 | `{"success": false, "error": "crm_indisponivel"}` |

O formulário trata qualquer 2xx como sucesso e qualquer outro status como erro, mantendo os dados
digitados. O corpo da resposta nunca é exibido nem traz dados pessoais.

## Salesforce (Lead)

Mapeamento do workflow "LP PageConv - Criação do SalesForce", sem alteração, mais `Company` e `Description`.

| Campo Salesforce | Origem |
| --- | --- |
| `LastName` | `nome` |
| `Company` | `nome` (obrigatório no Lead; o formulário não coleta empresa) |
| `Email`, `Email_de_contato__c` | `email` em minúsculas |
| `MobilePhone` | WhatsApp no formato `(DD) 9XXXX-XXXX` |
| `Description` | tipo de conta, titularidade, consentimento LGPD, situação da fatura e origem institucional |
| `IdeFai__c` | `valor_conta` |
| `UF__c` | `utm_state` |
| `Cidade__c` | `cidade` (ou `utm_city`) |
| `Link_da_fatura__c` | link do arquivo no Drive (`https://drive.google.com/file/d/<id>/view`) |
| `Origem_do_Lead__c` | `utm_source` |
| `Tipo_de_Trafego__c` | `utm_medium` |
| `Canal_RD__c` | `utm_font` |
| `Meio_Conversao__c` | `utm_channel` |
| `ID_Campanha_Portal__c` | `utm_campaign_code` (ou `utm_project_id`) |
| `ID_URL_da_Campanha_Portal__c` | `utm_link_id` |
| `UTM_Campanha__c` | `utm_campaign` |
| `Campanha_de_Conversao__c`, `Id_da_Campanha_Ads__c` | `utm_adcampaign`, `utm_adcampaign_id` |
| `Conjunto_Publico_de_Conversao__c`, `Id_do_Conjunto_Publico_Ads__c` | `utm_adset`, `utm_adset_id` |
| `Evento_Identificador__c` | `utm_adgroup` |
| `Anuncio_de_Conversao__c`, `Id_do_Anuncio_Ads__c` | `utm_content`, `utm_content_id` |
| `Qual_palavra_pesquisou__c` | `utm_term` |
| `Originador_Campanha__c`, `Originador_do_lead__c` | `utm_originator`, `utm_seller` |
| `Produto_Ofertado__c`, `Segmento_Publico_Alvo__c`, `Publico_Alvo__c` | `utm_product`, `utm_segment`, `utm_public` |
| `Estado_Regiao__c` | `utm_region` |
| `Modalidade_de_Contrato__c` | `utm_contract` |
| `Pagina_de_Conversao__c` | `utm_lp` |
| `Meio_de_Conversao_Ads__c` | fixo `Formulário Pagina Web` |

Nenhum campo novo é criado no CRM. `tipo` e `titular` ficam na `Description` porque o mapeamento
original não os envia; se quiser em campo próprio, o candidato é `TipSeg__c` (picklist: conferir os
valores aceitos antes).

## Eventos de rastreamento

Sucesso: `form_submit` e `lead_generated` no `dataLayer`, com `form_name=simulador_institucional`.
Falha: `form_error` com `error_type=submission`. O evento `pageconv_form_submit` não é mais enviado;
uma conversão do Google Ads que dependia dele precisa de gatilho em `lead_generated`.

## Confirmação no formulário

O formulário só mostra sucesso com HTTP 2xx **e** `{"success": true, "lead_id": "..."}` (ou `{"success": true, "duplicate": true}`), respostas que o workflow só envia depois do Salesforce. Um 2xx sem isso aparece como "cadastro não confirmado", e os dados ficam no formulário.
