/**
 * Gera public/llms.txt (formato experimental de llmstxt.org) a partir das
 * mesmas fontes do sitemap e dos metadados: rotas indexáveis
 * (src/config/routes.ts), títulos/descrições (src/config/meta.ts) e dados
 * institucionais já publicados (src/data/company.ts, src/data/coverage.ts).
 *
 * Opcional e experimental: não há garantia de leitura ou citação por sistemas
 * de IA. Nenhuma informação nova é criada aqui — apenas um índice em texto das
 * páginas públicas, com as mesmas descrições do <meta name="description">.
 */
import { writeFileSync } from 'fs'
import { resolve } from 'path'

import { HOME_META, ROUTE_META } from '../src/config/meta'
import { INDEXABLE_ROUTES } from '../src/config/routes'
import { SITE_URL, SOCIAL_PROFILES } from '../src/config/site'
import { COMPANY, OFFICES } from '../src/data/company'
import { COVERAGE_TEXT } from '../src/data/coverage'

const clean = (title: string) => title.replace(/\s*\|\s*Grupo BC Energia$/, '')

const entry = (path: string) => {
  const meta = ROUTE_META[path]
  if (!meta) return null
  return `- [${clean(meta.title)}](${SITE_URL}${path}): ${meta.description}`
}

const group = (label: string, match: (path: string) => boolean) => {
  const lines = INDEXABLE_ROUTES.filter(match).map(entry).filter(Boolean)
  return lines.length ? [`## ${label}`, '', ...lines, ''] : []
}

const text = [
  `# ${COMPANY.name}`,
  '',
  `> ${HOME_META.description}`,
  '',
  `Razão social: ${COMPANY.legalName} (CNPJ ${COMPANY.taxId}). Estados de atuação: ${COVERAGE_TEXT}.`,
  `Escritórios: ${OFFICES.map((office) => `${office.label} — ${office.display}`).join('; ')}.`,
  `Site oficial: ${SITE_URL}/ · Perfis oficiais: ${SOCIAL_PROFILES.join(', ')}`,
  '',
  ...group('Soluções', (p) => p.startsWith('/produtos')),
  ...group('Segmentos atendidos', (p) => p.startsWith('/segmentos')),
  ...group('Atendimento regional', (p) => p.startsWith('/energia-solar')),
  ...group('Institucional', (p) => p.startsWith('/sobre')),
  ...group('Contato', (p) => p === '/contato'),
  ''
].join('\n')

writeFileSync(resolve('public/llms.txt'), text)
console.log('llms.txt gerado')
