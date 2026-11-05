import { useEffect } from 'react'

type Props = { file: string }

/**
 * Preserva as URLs `/documentos/<slug>` do site antigo (Next.js),
 * redirecionando para o PDF estático correspondente em `/docs/`. Na Vercel o
 * redirect é 301 no servidor (vercel.json); este componente é o fallback da SPA.
 * Usa <div>: o layout já fornece o <main>.
 */
const PdfRedirect = ({ file }: Props) => {
  useEffect(() => {
    window.location.replace(`/docs/${file}`)
  }, [file])

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>
        Redirecionando para o documento…{' '}
        <a href={`/docs/${file}`}>Abrir o documento em PDF</a> se não for redirecionado
        automaticamente.
      </p>
    </div>
  )
}

export default PdfRedirect
