/**
 * Gera src/pages/simulador-de-economia/pageconv/pageconv.css a partir do
 * styles.css original da PageConv (Tailwind 4), escopado em `.pageconv-root`.
 *
 * O site usa Tailwind 3; a PageConv usa Tailwind 4. Em vez de converter as
 * classes, o CSS da PageConv é compilado com o próprio Tailwind 4 (instalado
 * em um diretório temporário) e todas as regras passam a valer só dentro de
 * `.pageconv-root`. As camadas (@layer) são removidas para que o CSS escopado
 * não perca para o CSS global do site, que não usa camadas.
 *
 * Uso (rodar de novo sempre que um componente da PageConv mudar de classes):
 *   node scripts/build-pageconv-css.mjs
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import postcss from 'postcss'

const ROOT = '.pageconv-root'
const PAGECONV_DIR = resolve('src/pages/simulador-de-economia/pageconv')
const SOURCE_CSS = join(PAGECONV_DIR, 'pageconv.source.css')
const OUTPUT_CSS = join(PAGECONV_DIR, 'pageconv.css')

const work = mkdtempSync(join(tmpdir(), 'pageconv-css-'))
try {
  execFileSync(
    'npm',
    ['install', '--no-save', '--no-audit', '--no-fund', 'tailwindcss@4.2.4', '@tailwindcss/cli@4.2.4', 'tw-animate-css@1.4.0'],
    { cwd: work, stdio: 'inherit' }
  )

  // Único ajuste no CSS original: as classes são lidas dos componentes portados.
  const source = readFileSync(SOURCE_CSS, 'utf8').replace(/@source\s+"[^"]*";/, `@source "${PAGECONV_DIR}";`)
  const input = join(work, 'input.css')
  const compiled = join(work, 'compiled.css')
  writeFileSync(input, source)
  execFileSync(join(work, 'node_modules/.bin/tailwindcss'), ['-i', input, '-o', compiled, '--optimize'], {
    cwd: work,
    stdio: 'inherit'
  })

  const scopeSelector = (selector) => {
    const s = selector.trim()
    const global = s.match(/^(:root|:host|html|body)(?![\w-])(.*)$/)
    if (global) return `${ROOT}${global[2]}`
    return `${ROOT} ${s}`
  }

  const scope = {
    postcssPlugin: 'pageconv-scope',
    Once(root) {
      root.walkAtRules('layer', (atRule) => {
        if (atRule.nodes) atRule.replaceWith(atRule.nodes)
        else atRule.remove()
      })
      root.walkRules((rule) => {
        if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return
        rule.selectors = [...new Set(rule.selectors.map(scopeSelector))]
      })
    }
  }

  const css = readFileSync(compiled, 'utf8')
  const result = await postcss([scope]).process(css, { from: undefined })
  writeFileSync(
    OUTPUT_CSS,
    `/* Gerado por scripts/build-pageconv-css.mjs a partir de pageconv.source.css. Não editar à mão. */\n${result.css}`
  )
  console.log(`pageconv.css gerado (${(result.css.length / 1024).toFixed(1)} KB)`)
} finally {
  rmSync(work, { recursive: true, force: true })
}
