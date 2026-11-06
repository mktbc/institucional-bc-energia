// Gera n8n/BC-Energia-Simulador-Institucional-n8n.json a partir dos códigos
// em n8n/src (os mesmos que os testes executam). Uso: npm run n8n:build
//
// Base: workflow "LP PageConv - Criação do SalesForce" (referência sem
// credenciais). O mapeamento do nó do Salesforce é o original, com `company`
// preenchido e a descrição do lead. Nenhuma credencial é incluída: o n8n pede
// para escolher as credenciais da conta na primeira abertura dos nós.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = (f) => readFileSync(join(root, 'n8n/src', f), 'utf8')
const OUT = join(root, 'n8n/BC-Energia-Simulador-Institucional-n8n.json')

export const WEBHOOK_PATH = 'simulador-institucional-leads'
export const ALLOWED_ORIGINS = 'https://grupobcenergia.com.br,https://www.grupobcenergia.com.br'
const PASTA_RAIZ = 'CONFIGURAR_ID_DA_PASTA_DAS_FATURAS'

// Mapeamento do nó "Criar Lead no Salesforce" da PageConv (sem alteração).
const SF_CAMPOS = [
  ['Canal_RD__c', '={{ $json.utm_font }}'],
  ['Tipo_de_Trafego__c', '={{ $json.utm_medium }}'],
  ['Origem_do_Lead__c', '={{ $json.utm_source }}'],
  ['Evento_Identificador__c', '={{ $json.utm_adgroup }}'],
  ['Modalidade_de_Contrato__c', '={{ $json.utm_contract }}'],
  ['ID_Campanha_Portal__c', '={{ $json.utm_campaign_code }}'],
  ['Segmento_Publico_Alvo__c', '={{ $json.utm_segment }}'],
  ['Publico_Alvo__c', '={{ $json.utm_public }}'],
  ['Produto_Ofertado__c', '={{ $json.utm_product }}'],
  ['Cidade__c', '={{ $json.cidade }}'],
  ['Estado_Regiao__c', '={{ $json.utm_region }}'],
  ['Conjunto_Publico_de_Conversao__c', '={{ $json.utm_adset }}'],
  ['Meio_de_Conversao_Ads__c', '=Formulário Pagina Web'],
  ['Anuncio_de_Conversao__c', '={{ $json.utm_content }}'],
  ['IdeFai__c', '={{ $json.valor_conta }}'],
  ['UF__c', '={{ $json.utm_state }}'],
  ['Link_da_fatura__c', '={{ $json.fatura_url }}'],
  ['Email_de_contato__c', '={{ $json.email }}'],
  ['Meio_Conversao__c', '={{ $json.utm_channel }}'],
  ['UTM_Campanha__c', '={{ $json.utm_campaign }}'],
  ['ID_URL_da_Campanha_Portal__c', '={{ $json.utm_link_id }}'],
  ['Campanha_de_Conversao__c', '={{ $json.utm_adcampaign }}'],
  ['Id_da_Campanha_Ads__c', '={{ $json.utm_adcampaign_id }}'],
  ['Id_do_Conjunto_Publico_Ads__c', '={{ $json.utm_adset_id }}'],
  ['Id_do_Anuncio_Ads__c', '={{ $json.utm_content_id }}'],
  ['Qual_palavra_pesquisou__c', '={{ $json.utm_term }}'],
  ['Originador_Campanha__c', '={{ $json.utm_originator }}'],
  ['Originador_do_lead__c', '={{ $json.utm_seller }}'],
  ['Pagina_de_Conversao__c', '={{ $json.utm_lp }}']
]

const ifNode = (id, name, expr, position) => ({
  parameters: {
    conditions: {
      options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 2 },
      conditions: [{ id: `${id}-c1`, leftValue: expr, rightValue: true, operator: { type: 'boolean', operation: 'true', singleValue: true } }],
      combinator: 'and'
    },
    options: {}
  },
  type: 'n8n-nodes-base.if',
  typeVersion: 2.2,
  position,
  id,
  name
})

const respond = (id, name, body, code, position) => ({
  parameters: { respondWith: 'json', responseBody: body, options: { responseCode: code, responseHeaders: { entries: [{ name: 'Cache-Control', value: 'no-store' }] } } },
  type: 'n8n-nodes-base.respondToWebhook',
  typeVersion: 1.5,
  position,
  id,
  name
})

const code = (id, name, file, position, extra = {}) => ({
  parameters: { jsCode: src(file) },
  type: 'n8n-nodes-base.code',
  typeVersion: 2,
  position,
  id,
  name,
  ...extra
})

const nodes = [
  {
    parameters: {
      httpMethod: 'POST',
      path: WEBHOOK_PATH,
      responseMode: 'responseNode',
      options: { allowedOrigins: ALLOWED_ORIGINS }
    },
    type: 'n8n-nodes-base.webhook',
    typeVersion: 2.1,
    position: [0, 400],
    id: '7c1d2e3f-0001-4b6a-9c11-5e1a00000001',
    name: 'Webhook Simulador',
    webhookId: '0b9f6a2e-6f4d-4c7e-9a51-3d2c5b8e7f10'
  },
  code('7c1d2e3f-0002-4b6a-9c11-5e1a00000002', 'Validar payload', 'validar-payload.js', [220, 400]),
  ifNode('7c1d2e3f-0003-4b6a-9c11-5e1a00000003', 'Payload válido?', '={{ $json.valido }}', [440, 400]),
  respond('7c1d2e3f-0004-4b6a-9c11-5e1a00000004', 'Responder payload inválido',
    '={{ { "success": false, "error": $json.erro } }}', 400, [660, 620]),
  ifNode('7c1d2e3f-0005-4b6a-9c11-5e1a00000005', 'Envio repetido?', '={{ $json.duplicado }}', [660, 380]),
  respond('7c1d2e3f-0006-4b6a-9c11-5e1a00000006', 'Responder envio repetido',
    '={{ { "success": true, "duplicate": true } }}', 200, [880, 200]),
  ifNode('7c1d2e3f-0007-4b6a-9c11-5e1a00000007', 'Enviou fatura?', '={{ $json.fatura_presente }}', [880, 400]),
  {
    parameters: {
      resource: 'folder',
      name: "={{ $('Validar payload').first().json.body.nome }} - {{ $now.toFormat('yyyy-MM-dd HH-mm') }}",
      driveId: { __rl: true, value: 'My Drive', mode: 'list', cachedResultName: 'My Drive', cachedResultUrl: 'https://drive.google.com/drive/my-drive' },
      folderId: { __rl: true, value: PASTA_RAIZ, mode: 'id' },
      options: {}
    },
    type: 'n8n-nodes-base.googleDrive',
    typeVersion: 3,
    position: [1100, 260],
    id: '7c1d2e3f-0008-4b6a-9c11-5e1a00000008',
    name: 'Criar pasta da fatura',
    onError: 'continueErrorOutput',
    retryOnFail: true,
    maxTries: 2,
    waitBetweenTries: 1000
  },
  code('7c1d2e3f-0009-4b6a-9c11-5e1a00000009', 'Juntar pasta e fatura', 'juntar-pasta-e-fatura.js', [1320, 240], { onError: 'continueErrorOutput' }),
  {
    // Mesmo nó "Base64 → Arquivo" da PageConv.
    parameters: {
      operation: 'toBinary',
      sourceProperty: 'fatura_base64',
      binaryPropertyName: 'fatura0',
      options: { fileName: '={{ $json.fatura_nome }}', mimeType: '={{ $json.fatura_tipo }}' }
    },
    type: 'n8n-nodes-base.convertToFile',
    typeVersion: 1.1,
    position: [1540, 240],
    id: '7c1d2e3f-0016-4b6a-9c11-5e1a00000016',
    name: 'Base64 → Arquivo',
    onError: 'continueErrorOutput'
  },
  {
    parameters: {
      inputDataFieldName: 'fatura0',
      name: "={{ $('Validar payload').first().json.body.nome }} - fatura{{ (String($('Validar payload').first().json.body.fatura_nome || '').match(/\\.[a-z0-9]+$/i) || [''])[0] }}",
      driveId: { __rl: true, mode: 'list', value: 'My Drive' },
      folderId: { __rl: true, value: "={{ $('Juntar pasta e fatura').first().json.pasta_id }}", mode: 'id' },
      options: {}
    },
    type: 'n8n-nodes-base.googleDrive',
    typeVersion: 3,
    position: [1760, 240],
    id: '7c1d2e3f-0010-4b6a-9c11-5e1a00000010',
    name: 'Upload da fatura',
    onError: 'continueErrorOutput',
    retryOnFail: true,
    maxTries: 2,
    waitBetweenTries: 1000
  },
  code('7c1d2e3f-0011-4b6a-9c11-5e1a00000011', 'Preparar Lead', 'preparar-lead.js', [1980, 420]),
  {
    parameters: {
      company: '={{ $json.company }}',
      lastname: '={{ $json.nome }}',
      additionalFields: {
        customFieldsUi: { customFieldsValues: SF_CAMPOS.map(([fieldId, value]) => ({ fieldId, value })) },
        description: '={{ $json.descricao }}',
        email: '={{ $json.email }}',
        mobilePhone: '={{ $json.telefone_sf }}'
      }
    },
    type: 'n8n-nodes-base.salesforce',
    typeVersion: 1,
    position: [2200, 420],
    id: '7c1d2e3f-0012-4b6a-9c11-5e1a00000012',
    name: 'Criar Lead no Salesforce',
    onError: 'continueErrorOutput',
    retryOnFail: true,
    maxTries: 2,
    waitBetweenTries: 2000
  },
  code('7c1d2e3f-0013-4b6a-9c11-5e1a00000013', 'Registrar envio', 'registrar-envio.js', [2420, 400]),
  respond('7c1d2e3f-0014-4b6a-9c11-5e1a00000014', 'Responder sucesso',
    '={{ { "success": true, "lead_id": $json.lead_id } }}', 200, [2640, 400]),
  respond('7c1d2e3f-0015-4b6a-9c11-5e1a00000015', 'Responder falha no CRM',
    '={{ { "success": false, "error": "crm_indisponivel" } }}', 502, [2420, 620])
]

const to = (node, index = 0) => ({ node, type: 'main', index })
const connections = {
  'Webhook Simulador': { main: [[to('Validar payload')]] },
  'Validar payload': { main: [[to('Payload válido?')]] },
  'Payload válido?': { main: [[to('Envio repetido?')], [to('Responder payload inválido')]] },
  'Envio repetido?': { main: [[to('Responder envio repetido')], [to('Enviou fatura?')]] },
  'Enviou fatura?': { main: [[to('Criar pasta da fatura')], [to('Preparar Lead')]] },
  'Criar pasta da fatura': { main: [[to('Juntar pasta e fatura')], [to('Preparar Lead')]] },
  'Juntar pasta e fatura': { main: [[to('Base64 → Arquivo')], [to('Preparar Lead')]] },
  'Base64 → Arquivo': { main: [[to('Upload da fatura')], [to('Preparar Lead')]] },
  'Upload da fatura': { main: [[to('Preparar Lead')], [to('Preparar Lead')]] },
  'Preparar Lead': { main: [[to('Criar Lead no Salesforce')]] },
  'Criar Lead no Salesforce': { main: [[to('Registrar envio')], [to('Responder falha no CRM')]] },
  'Registrar envio': { main: [[to('Responder sucesso')]] }
}

export const workflow = {
  name: 'BC Energia | Simulador Institucional | Leads Salesforce',
  nodes,
  pinData: {},
  connections,
  active: false,
  settings: {
    executionOrder: 'v1',
    // LGPD: execuções com sucesso não ficam salvas (têm dados pessoais e a
    // fatura em base64); as com erro ficam, para recuperar o lead.
    saveDataSuccessExecution: 'none',
    saveDataErrorExecution: 'all',
    saveManualExecutions: true,
    saveExecutionProgress: false
  },
  tags: []
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeFileSync(OUT, JSON.stringify(workflow, null, 2) + '\n')
  console.log(`gerado: ${OUT.replace(root + '/', '')} (${nodes.length} nós)`)
}
