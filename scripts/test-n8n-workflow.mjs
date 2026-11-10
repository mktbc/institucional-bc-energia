// Testes com mocks do workflow do simulador (nenhuma chamada real ao n8n,
// ao Google Drive ou ao Salesforce). Uso: npm run test:n8n
//
// Executa o JSON gerado (n8n/BC-Energia-Simulador-Institucional-n8n.json)
// num motor mínimo que segue as conexões, roda os nós Code com os mesmos
// códigos que vão para o n8n e simula Drive e Salesforce. Cobre: envio sem e
// com fatura, payload inválido, falha no Drive, falha no Salesforce, UTMs,
// origem institucional, duplicidade, formato da resposta e credenciais.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { workflow as built, WEBHOOK_PATH } from './build-n8n-workflow.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const wf = JSON.parse(readFileSync(join(root, 'n8n/BC-Energia-Simulador-Institucional-n8n.json'), 'utf8'))
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

// ---------- motor mínimo ----------
function evalExpr(expr, $json, $) {
  if (typeof expr !== 'string' || !expr.startsWith('=')) return expr
  const body = expr.slice(1)
  if (!body.includes('{{')) return body
  const only = body.match(/^\{\{([\s\S]*)\}\}$/)
  const run = (code) => new Function('$json', '$', '$now', `return (${code})`)($json, $, { toFormat: () => '2026-11-05 10-00' })
  if (only && !only[1].includes('}}')) return run(only[1])
  return body.replace(/\{\{([\s\S]*?)\}\}/g, (_, c) => String(run(c) ?? ''))
}

async function runWorkflow(body, mocks = {}, staticData = {}, item = { json: { body } }) {
  const nodes = Object.fromEntries(wf.nodes.map((n) => [n.name, n]))
  const results = {}
  const calls = { drive: [], salesforce: [], erroExecucao: null }
  const $ = (name) => {
    if (!results[name]) throw new Error(`nó ${name} não executou`)
    return { first: () => results[name][0], all: () => results[name] }
  }
  let response = null
  const queue = [[wf.nodes.find((n) => n.type.endsWith('.webhook')).name, [item]]]
  while (queue.length) {
    const [name, input] = queue.shift()
    const node = nodes[name]
    let outputs
    try {
      outputs = await execNode(node, input)
    } catch (err) {
      if (node.onError !== 'continueErrorOutput') throw err
      outputs = [[], [{ json: { error: err.message } }]]
    }
    results[name] = outputs.find((o) => o && o.length) || []
    const conns = wf.connections[name]?.main || []
    outputs.forEach((items, i) => {
      if (!items || !items.length) return
      for (const c of conns[i] || []) queue.push([c.node, items])
    })
  }
  return { response, results, calls }

  async function execNode(node, input) {
    const $json = input[0].json
    switch (node.type) {
      case 'n8n-nodes-base.webhook':
        return [input]
      case 'n8n-nodes-base.code': {
        const fn = new AsyncFunction('$input', '$', '$getWorkflowStaticData', 'Buffer', node.parameters.jsCode)
        const out = await fn.call({}, { first: () => input[0], all: () => input }, $, () => staticData, Buffer)
        return [out]
      }
      case 'n8n-nodes-base.convertToFile': {
        const p = node.parameters
        const b64 = p.sourceProperty.split('.').reduce((o, k) => o?.[k], $json)
        const buf = Buffer.from(String(b64 || ''), 'base64')
        if (!buf.length) throw new Error('sourceProperty vazio')
        return [[{ json: $json, binary: { [p.binaryPropertyName]: { fileName: evalExpr(p.options.fileName, $json, $), mimeType: evalExpr(p.options.mimeType, $json, $), data: buf.toString('base64') } } }]]
      }
      case 'n8n-nodes-base.if': {
        const ok = Boolean(evalExpr(node.parameters.conditions.conditions[0].leftValue, $json, $))
        return ok ? [input, []] : [[], input]
      }
      case 'n8n-nodes-base.googleDrive': {
        const p = node.parameters
        const call = { resource: p.resource || 'file', name: evalExpr(p.name, $json, $), folderId: evalExpr(p.folderId.value, $json, $), binary: input[0].binary?.[p.inputDataFieldName] }
        calls.drive.push(call)
        const fail = mocks.drive?.(call)
        if (fail) throw new Error(fail)
        return [[{ json: { id: call.resource === 'folder' ? 'pasta123' : 'arquivo456', name: call.name } }]]
      }
      case 'n8n-nodes-base.salesforce': {
        const p = node.parameters
        const rec = { Company: evalExpr(p.company, $json, $), LastName: evalExpr(p.lastname, $json, $) }
        for (const [k, v] of Object.entries(p.additionalFields)) if (k !== 'customFieldsUi') rec[k] = evalExpr(v, $json, $)
        for (const f of p.additionalFields.customFieldsUi.customFieldsValues) rec[f.fieldId] = evalExpr(f.value, $json, $)
        calls.salesforce.push(rec)
        const fail = mocks.salesforce?.(rec)
        if (fail) throw new Error(fail)
        return [[{ json: { id: '00Q000000000001AAA', success: true } }]]
      }
      case 'n8n-nodes-base.stopAndError':
        calls.erroExecucao = evalExpr(node.parameters.errorMessage, $json, $)
        return [[]]
      case 'n8n-nodes-base.respondToWebhook':
        response = { status: node.parameters.options.responseCode, body: evalExpr(node.parameters.responseBody, $json, $), headers: node.parameters.options.responseHeaders }
        return [input]
      default:
        throw new Error(`tipo de nó sem mock: ${node.type}`)
    }
  }
}

// ---------- fixtures ----------
const PDF = Buffer.from('%PDF-1.4\n1 0 obj << >> endobj\ntrailer << >>\n%%EOF\n').toString('base64')
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]).toString('base64')
const base = () => ({
  nome: 'Maria Teste', whatsapp: '(62) 99999-8888', telefone_sf: '(62) 99999-8888',
  email: 'Maria@Exemplo.com', email_sf: 'Maria@Exemplo.com', estado: 'GO', cidade: '',
  valor_conta: 'De R$ 700 a R$ 1.200', tipo: 'Comercial', titular: 'Sim', lgpd: 'true',
  fatura: '', fatura_base64: '', fatura_anexada: 'false', fatura_nome: '', fatura_tipo: '', fatura_tamanho: '',
  utm_source: 'SEO', utm_medium: 'organic', utm_font: 'marketing', utm_channel: 'Site', utm_campaign_code: 'BCCAMPMKT033',
  utm_product: 'GD', utm_segment: 'B2B B2C', utm_contract: 'sem fidelidade', utm_lp: 'grupobcenergia-com-br',
  utm_state: 'GO', utm_region: 'Goias', lead_source: 'SEO', page_url: 'https://grupobcenergia.com.br/simulador-de-economia',
  page_path: '/simulador-de-economia', origem_site: 'site_institucional', origem_pagina: '/simulador-de-economia',
  origem_formulario: 'simulador_institucional', form_name: 'simulador_institucional', created_at: '2026-11-05T13:00:00.000Z'
})
const comFatura = (b64 = PDF, tipo = 'application/pdf', nome = 'conta-out.pdf') => ({
  ...base(), fatura: b64, fatura_base64: b64, fatura_anexada: 'true', fatura_nome: nome, fatura_tipo: tipo, fatura_tamanho: String(Buffer.from(b64, 'base64').length)
})

const testes = []
const test = (nome, fn) => testes.push([nome, fn])

test('1. envio sem fatura: cria o lead sem link e responde 200', async () => {
  const r = await runWorkflow(base())
  assert.equal(r.calls.drive.length, 0)
  assert.equal(r.calls.salesforce.length, 1)
  assert.equal(r.calls.salesforce[0].Link_da_fatura__c, '')
  assert.match(r.calls.salesforce[0].description, /Fatura: não enviada/)
  assert.deepEqual(r.response.body, { success: true, lead_id: '00Q000000000001AAA' })
  assert.equal(r.response.status, 200)
})

test('2. envio com fatura válida: pasta, upload e link no Salesforce', async () => {
  const r = await runWorkflow(comFatura())
  assert.equal(r.calls.drive.length, 2)
  assert.equal(r.calls.drive[0].resource, 'folder')
  assert.equal(r.calls.drive[0].folderId, 'CONFIGURAR_ID_DA_PASTA_DAS_FATURAS')
  assert.equal(r.calls.drive[1].folderId, 'pasta123')
  assert.equal(r.calls.drive[1].name, 'Maria Teste - fatura.pdf')
  assert.equal(r.calls.drive[1].binary.mimeType, 'application/pdf')
  assert.equal(Buffer.from(r.calls.drive[1].binary.data, 'base64').toString('latin1').slice(0, 4), '%PDF')
  assert.equal(r.calls.salesforce[0].Link_da_fatura__c, 'https://drive.google.com/file/d/arquivo456/view')
  assert.equal(r.response.status, 200)
})

test('3. payload inválido: 400 genérico, sem Drive nem Salesforce', async () => {
  const casos = [null, { ...base(), nome: '' }, { ...base(), whatsapp: '123', telefone_sf: '' }, { ...base(), estado: 'SP' },
    { ...base(), lgpd: 'false' }, { ...base(), email: 'sem-arroba' }, { ...base(), tipo: 'Outro' }]
  for (const c of casos) {
    const r = await runWorkflow(c)
    assert.equal(r.response.status, 400)
    assert.deepEqual(r.response.body, { success: false, error: 'payload_invalido' })
    assert.equal(r.calls.salesforce.length + r.calls.drive.length, 0)
    assert.ok(!JSON.stringify(r.response.body).includes('Maria'))
  }
})

test('3b. fatura inválida (não é PDF/JPG/PNG, base64 quebrado, acima de 10 MB): 400', async () => {
  const txt = Buffer.from('<html>oi</html>').toString('base64')
  for (const c of [comFatura(txt, 'application/pdf'), comFatura('@@@@'), comFatura(PNG, 'application/pdf'),
    { ...comFatura(), fatura_base64: 'A'.repeat(14 * 1024 * 1024), fatura: '' }]) {
    const r = await runWorkflow(c)
    assert.equal(r.response.status, 400)
    assert.equal(r.response.body.error, 'fatura_invalida')
  }
  const png = await runWorkflow(comFatura(PNG, 'image/png', 'conta.png'))
  assert.equal(png.response.status, 200)
})

test('4. falha no upload do Drive: lead criado, sem link, falha registrada', async () => {
  for (const alvo of ['folder', 'file']) {
    const r = await runWorkflow(comFatura(), { drive: (c) => (c.resource === alvo ? 'drive indisponível' : null) })
    assert.equal(r.calls.salesforce.length, 1)
    assert.equal(r.calls.salesforce[0].Link_da_fatura__c, '')
    assert.match(r.calls.salesforce[0].description, /upload no Drive falhou/)
    assert.equal(r.response.status, 200)
  }
})

test('5. falha no Salesforce: 502 genérico e envio não marcado como repetido', async () => {
  const sd = {}
  const r = await runWorkflow(base(), { salesforce: () => 'REQUIRED_FIELD_MISSING' }, sd)
  assert.equal(r.response.status, 502)
  assert.deepEqual(r.response.body, { success: false, error: 'crm_indisponivel' })
  assert.ok(!JSON.stringify(r.response.body).includes('REQUIRED'))
  // A execução é marcada como erro (salva pelo n8n) com o código do Salesforce.
  assert.match(r.calls.erroExecucao, /^Salesforce recusou o lead: REQUIRED_FIELD_MISSING/)
  const ok = await runWorkflow(base())
  assert.equal(ok.calls.erroExecucao, null)
  const retry = await runWorkflow(base(), {}, sd)
  assert.equal(retry.response.status, 200)
  assert.equal(retry.calls.salesforce.length, 1)
})

test('6. UTMs de campanha preservadas e fallbacks históricos', async () => {
  const r = await runWorkflow({
    ...base(), utm_source: 'GoogleAds', utm_medium: 'cpc', utm_campaign_code: '', utm_project_id: 'BCCAMPMKT031',
    utm_adset: '', utm_adgroup: 'grupo-goiania', utm_adset_id: '', utm_adgroup_id: '123', utm_term: 'energia solar',
    utm_content: '{{ad.name}}', utm_adcampaign: '{campaignname}', utm_lp: 'pageconv-ads', gclid: 'abc'
  })
  const sf = r.calls.salesforce[0]
  assert.equal(sf.Origem_do_Lead__c, 'GoogleAds')
  assert.equal(sf.Tipo_de_Trafego__c, 'cpc')
  assert.equal(sf.ID_Campanha_Portal__c, 'BCCAMPMKT031')
  assert.equal(sf.Conjunto_Publico_de_Conversao__c, 'grupo-goiania')
  assert.equal(sf.Id_do_Conjunto_Publico_Ads__c, '123')
  assert.equal(sf.Evento_Identificador__c, 'grupo-goiania')
  assert.equal(sf.Qual_palavra_pesquisou__c, 'energia solar')
  assert.equal(sf.Pagina_de_Conversao__c, 'pageconv-ads')
  assert.equal(sf.Anuncio_de_Conversao__c, '', 'macro {{ad.name}} não resolvida não vai ao CRM')
  assert.equal(sf.Campanha_de_Conversao__c, '', 'macro {campaignname} não resolvida não vai ao CRM')
  assert.equal(sf.UF__c, 'GO')
  assert.equal(sf.Estado_Regiao__c, 'Goias')
  assert.equal(sf.IdeFai__c, 'De R$ 700 a R$ 1.200')
  assert.equal(sf.Meio_de_Conversao_Ads__c, 'Formulário Pagina Web')
})

test('6b. cada faixa do formulário chega sem alteração ao IdeFai__c', async () => {
  // Mesmas opções de VALOR_OPTIONS em LeadForm.tsx.
  for (const faixa of ['A partir de R$ 700', 'De R$ 700 a R$ 1.200', 'De R$ 1.200 a R$ 2.000', 'De R$ 2.000 a R$ 5.000', 'Acima de R$ 5.000']) {
    const r = await runWorkflow({ ...base(), valor_conta: faixa, whatsapp: `(62) 9${faixa.length}999-0000` })
    assert.equal(r.calls.salesforce.length, 1, faixa)
    assert.equal(r.calls.salesforce[0].IdeFai__c, faixa)
  }
})

test('7. origem institucional identificada sem sobrescrever a campanha', async () => {
  const r = await runWorkflow({ ...base(), utm_source: 'MetaAds' })
  const prep = r.results['Preparar Lead'][0].json
  assert.equal(prep.lead_origin, 'site_institucional')
  assert.equal(prep.lead_form, 'simulador_institucional')
  assert.equal(prep.page_path, '/simulador-de-economia')
  assert.equal(r.calls.salesforce[0].Origem_do_Lead__c, 'MetaAds')
  assert.match(r.calls.salesforce[0].description, /site_institucional · formulário simulador_institucional · página \/simulador-de-economia/)
  assert.match(r.calls.salesforce[0].description, /Tipo de conta: Comercial/)
  assert.match(r.calls.salesforce[0].description, /Titular da conta: Sim/)
  assert.match(r.calls.salesforce[0].description, /Consentimento LGPD: sim/)
})

test('8. envio repetido em até 10 min: 200 sem criar outro lead', async () => {
  const sd = {}
  const a = await runWorkflow(comFatura(), {}, sd)
  const b = await runWorkflow(comFatura(), {}, sd)
  assert.equal(a.calls.salesforce.length, 1)
  assert.equal(b.calls.salesforce.length + b.calls.drive.length, 0)
  assert.deepEqual(b.response.body, { success: true, duplicate: true })
  assert.ok(!JSON.stringify(sd).includes('99999'), 'staticData guarda só hash')
  const outro = await runWorkflow({ ...comFatura(), whatsapp: '(62) 98888-7777', telefone_sf: '(62) 98888-7777' }, {}, sd)
  assert.equal(outro.calls.salesforce.length, 1)
})

test('9. formato da resposta e campos obrigatórios do Salesforce', async () => {
  const r = await runWorkflow(base())
  const sf = r.calls.salesforce[0]
  assert.equal(sf.Company, 'Maria Teste', 'company preenchido (antes era "=")')
  assert.equal(sf.LastName, 'Maria Teste')
  assert.equal(sf.email, 'maria@exemplo.com')
  assert.equal(sf.Email_de_contato__c, 'maria@exemplo.com')
  assert.equal(sf.mobilePhone, '(62) 99999-8888')
  assert.equal(r.response.headers.entries[0].value, 'no-store')
  for (const k of Object.keys(sf)) assert.ok(typeof sf[k] !== 'string' || sf[k].length <= 32000)
})

test('11. execução sem requisição ([{}]) e body como texto JSON', async () => {
  // Item vazio = execução manual sem evento ou dados fixados/simulados.
  const vazio = await runWorkflow(null, {}, {}, { json: {} })
  assert.equal(vazio.response.status, 400)
  assert.deepEqual(vazio.response.body, { success: false, error: 'sem_dados' })
  assert.equal(vazio.calls.salesforce.length + vazio.calls.drive.length, 0)
  // Body que chega como string (content-type alterado no caminho) é aceito.
  const texto = await runWorkflow(null, {}, {}, { json: { headers: {}, body: JSON.stringify(comFatura()) } })
  assert.equal(texto.response.status, 200)
  assert.equal(texto.calls.drive.length, 2)
  assert.equal(texto.calls.salesforce[0].ID_Campanha_Portal__c, 'BCCAMPMKT033')
  assert.equal(texto.calls.salesforce[0].Origem_do_Lead__c, 'SEO')
})

test('10. JSON importável, independente e sem credenciais', async () => {
  assert.deepEqual(wf, JSON.parse(JSON.stringify(built)), 'JSON gerado está atualizado (rode npm run n8n:build)')
  assert.equal(wf.name, 'BC Energia | Simulador Institucional | Leads Salesforce')
  const hook = wf.nodes.find((n) => n.type.endsWith('.webhook'))
  assert.equal(hook.parameters.path, WEBHOOK_PATH)
  assert.notEqual(hook.parameters.path, 'capture-fatura')
  assert.equal(hook.parameters.httpMethod, 'POST')
  assert.equal(hook.parameters.responseMode, 'responseNode')
  assert.match(hook.parameters.options.allowedOrigins, /^https:\/\/grupobcenergia\.com\.br,https:\/\/www\.grupobcenergia\.com\.br$/)
  const raw = JSON.stringify(wf)
  assert.ok(!/"credentials"\s*:/.test(raw), 'sem bloco de credenciais')
  assert.ok(!/hook-gd\.grupobcenergia|capture-fatura|Bearer |access_token|client_secret/i.test(raw))
  const names = new Set(wf.nodes.map((n) => n.name))
  assert.equal(names.size, wf.nodes.length)
  assert.equal(new Set(wf.nodes.map((n) => n.id)).size, wf.nodes.length)
  for (const [from, c] of Object.entries(wf.connections)) {
    assert.ok(names.has(from), from)
    for (const out of c.main) for (const t of out) assert.ok(names.has(t.node), t.node)
  }
  assert.equal(wf.settings.saveDataSuccessExecution, 'none')
})

let falhas = 0
for (const [nome, fn] of testes) {
  try {
    await fn()
    console.log(`ok   ${nome}`)
  } catch (err) {
    falhas++
    console.log(`FAIL ${nome}\n     ${err.message}`)
  }
}
console.log(`\n${testes.length - falhas}/${testes.length} testes passaram`)
process.exit(falhas ? 1 : 0)
