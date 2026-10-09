import { ReactNode } from 'react'

/** Preposições/conjunções que abrem o trecho de destaque do título. */
const CONNECTORS = new Set(['de', 'da', 'do', 'das', 'dos', 'para', 'com', 'em', 'no', 'na', 'nos', 'nas', 'e', 'por', 'pela', 'pelo', 'sem', 'sobre'])

/**
 * Destaca em cor o complemento de um título (o trecho curto depois de uma
 * preposição, ou depois de dois-pontos), como os títulos da Home fazem com
 * `<span>`/`<em>`. O texto não muda — só ganha um `<span>` de cor — e títulos
 * de uma palavra, ou que já vêm compostos (ReactNode), passam intactos.
 */
export const accentTitle = (title: ReactNode): ReactNode => {
  if (typeof title !== 'string') return title
  const text = title.trim()
  if (/[|—]/.test(text)) return title

  const colon = text.indexOf(':')
  if (colon > 0 && colon < text.length - 1) {
    return (
      <>
        {text.slice(0, colon + 1)} <span className="bc-title-accent">{text.slice(colon + 1).trim()}</span>
      </>
    )
  }

  const words = text.split(/\s+/)
  if (words.length < 2) return title
  // Primeira preposição cujo complemento seja curto (até 4 palavras): em
  // frases longas o destaque fica no fecho, não na frase inteira.
  let start = words.length - 1
  for (let i = 1; i < words.length - 1; i += 1) {
    if (CONNECTORS.has(words[i].toLowerCase()) && words.length - (i + 1) <= 4) {
      start = i + 1
      break
    }
  }
  // Não parte o nome da marca ("Grupo BC Energia", "BC Cast").
  while (start > 0 && /^(BC|Grupo)$/.test(words[start - 1])) start -= 1
  if (start === 0) return title
  return (
    <>
      {words.slice(0, start).join(' ')} <span className="bc-title-accent">{words.slice(start).join(' ')}</span>
    </>
  )
}
