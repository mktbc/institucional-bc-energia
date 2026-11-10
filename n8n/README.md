# n8n — Simulador institucional → Google Drive → Salesforce

Arquivo para importar: `BC-Energia-Simulador-Institucional-n8n.json`
(workflow **BC Energia | Simulador Institucional | Leads Salesforce**). Contrato de campos e
mapeamento do Salesforce: `docs/SIMULADOR-N8N.md`.

O JSON é gerado a partir de `n8n/src/*.js` (`npm run n8n:build`) e testado com mocks
(`npm run test:n8n`). Edite os `.js`, não o JSON.

## Fluxo

```
Webhook Simulador → Validar payload → Payload válido? ──não──→ 400
                                         │ sim
                                    Envio repetido? ──sim──→ 200 duplicate
                                         │ não
                                    Enviou fatura? ──não──────────────┐
                                         │ sim                         │
              Criar pasta da fatura → Juntar pasta e fatura →          │
              Base64 → Arquivo → Upload da fatura ─(sucesso ou falha)─→ Preparar Lead
                                                                        │
                                       Criar Lead no Salesforce ─falha─→ 502
                                                                        │
                                              Registrar envio → 200 {lead_id}
```

Diferenças em relação à PageConv: validação antes de gravar; resposta só depois do Salesforce
confirmar; falha no Drive não perde o lead (vai sem link e com aviso na descrição); `company`
preenchido; macros não resolvidas descartadas; envios repetidos bloqueados por 10 min; sem
"Merge" (a pasta e o arquivo seguem em sequência); execuções com sucesso não ficam salvas (LGPD).

## Credenciais (configurar no n8n, nunca no JSON nem no site)

| Credencial | Onde | Permissão mínima |
| --- | --- | --- |
| Google Drive OAuth2 | nós "Criar pasta da fatura" e "Upload da fatura" | conta com acesso de edição à pasta das faturas |
| Salesforce OAuth2 (ou JWT) | nó "Criar Lead no Salesforce" | criar Lead e gravar os campos do mapeamento |

Não reutilize as credenciais da conta antiga. O JSON não traz nenhuma: o n8n pede para escolher
ao abrir cada nó.

## Passo a passo

1. **Importar.** n8n → *Workflows* → *Import from File* → `BC-Energia-Simulador-Institucional-n8n.json`.
   O workflow entra desativado.
2. **Google Drive.** Crie (ou escolha) uma pasta restrita ao time comercial, sem link público.
   Abra "Criar pasta da fatura", selecione a credencial e troque `CONFIGURAR_ID_DA_PASTA_DAS_FATURAS`
   pelo ID da pasta (o trecho da URL depois de `/folders/`). Se a pasta estiver num Drive
   compartilhado, troque também *Drive* de `My Drive` para ele, nos dois nós do Drive.
   Selecione a mesma credencial em "Upload da fatura".
3. **Salesforce.** Em "Criar Lead no Salesforce", selecione a credencial. Para testes, use um
   sandbox (ao criar a credencial, *Environment: Sandbox*).
4. **CORS.** No "Webhook Simulador" → *Options* → *Allowed Origins* já estão os dois domínios
   oficiais. Para testar na homologação da Vercel, acrescente o domínio do preview (separado por
   vírgula) e remova depois.
5. **URLs do webhook.** O caminho é `simulador-institucional-leads`. O n8n mostra duas URLs no nó:
   - teste: `https://<seu-n8n>/webhook-test/simulador-institucional-leads` (só funciona com
     *Listen for test event* aberto no editor);
   - produção: `https://<seu-n8n>/webhook/simulador-institucional-leads` (só com o workflow ativo).
6. **Teste controlado** (sandbox ou registro de teste), com o *Listen for test event* aberto:

   ```bash
   curl -sS -X POST 'https://<seu-n8n>/webhook-test/simulador-institucional-leads' \
     -H 'Content-Type: application/json' \
     -d '{"nome":"Teste Integracao","whatsapp":"(62) 90000-0000","email":"teste@exemplo.com",
          "estado":"GO","valor_conta":"De R$ 700,00 a R$ 1.200,00","tipo":"Residencial","titular":"Sim",
          "lgpd":"true","utm_source":"SEO","utm_medium":"organic","utm_campaign_code":"BCCAMPMKT033",
          "origem_site":"site_institucional","form_name":"simulador_institucional",
          "page_path":"/simulador-de-economia"}'
   ```

   Esperado: `{"success":true,"lead_id":"00Q…"}` e o lead no Salesforce com `Company`, UTMs e a
   descrição. Repita com uma fatura de teste pelo formulário de homologação: confira a pasta no
   Drive e o campo *Link da fatura*. Depois apague os registros de teste.
7. **Ligar o site.**
   - Homologação (Vercel, *Preview*): variável `VITE_SIMULADOR_WEBHOOK_URL` = URL de teste ou de
     produção do n8n; faça um novo deploy.
   - Produção: ative o workflow e grave a URL de produção em `app_config.SIMULADOR_WEBHOOK_URL`
     (Supabase), ou em `VITE_SIMULADOR_WEBHOOK_URL` no ambiente *Production* da Vercel.
     Atenção: `app_config` vale para todos os ambientes que usam o mesmo Supabase.
8. **Ativar** o workflow (*Active*) só depois do teste do passo 6.

## Ajustes opcionais

- `EXIGIR_FATURA` (em "Validar payload"): `true` recusa lead sem fatura (o formulário já exige).
- `LIMPAR_MACROS` (em "Preparar Lead"): `false` só para depurar o mapeamento de UTMs.
- *Settings* → *Error workflow*: aponte para um workflow de alerta (e-mail/Slack) para saber de
  falhas no Salesforce; as execuções com erro ficam salvas e permitem recriar o lead.
- Se o servidor n8n tiver `N8N_PAYLOAD_SIZE_MAX` menor que 16 MB, faturas grandes darão erro 413.

## Segurança e dados pessoais

- Nenhuma credencial ou token no JSON, no repositório ou no front-end.
- Respostas de erro só trazem um código (`payload_invalido`, `fatura_invalida`, `crm_indisponivel`, `sem_dados`). `sem_dados` = execução sem requisição HTTP (Webhook com saída `[{}]`: execução manual sem evento ou dados fixados).
- A fatura é conferida pelo conteúdo (PDF/JPG/PNG), limitada a 10 MB e gravada na pasta restrita;
  o link enviado ao Salesforce só abre para quem tem acesso à pasta.
- Execuções com sucesso não são salvas no n8n (`saveDataSuccessExecution: none`); as com erro
  ficam (defina a retenção em *Settings* → *Executions* conforme a política da empresa).
- A trava de duplicidade guarda só um hash do envio, por 10 min.

## Falha no Salesforce: onde ver o erro

Quando o Salesforce recusa o lead, o formulário recebe `502 crm_indisponivel` e mantém os dados. Em seguida, "Registrar falha no CRM" extrai o código (ex.: `REQUIRED_FIELD_MISSING`, `INVALID_FIELD`, `INVALID_OR_NULL_FOR_RESTRICTED_PICKLIST`) e "Marcar execução com erro" faz o n8n salvar a execução como erro. Em **Executions → filtro Error**, a mensagem aparece como `Salesforce recusou o lead: <CÓDIGO> — <mensagem>`, e o lead completo fica salvo para reprocessar. Antes dessa mudança, a execução terminava como "sucesso" e não era salva (`saveDataSuccessExecution: none`).
