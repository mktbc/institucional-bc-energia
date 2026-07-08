import { readFile } from 'node:fs/promises'

import path from 'node:path'




export const runtime = 'nodejs'




export async function GET() {

  const filePath = path.join(process.cwd(), 'public', 'docs', 'condicoes_gerais_gd_externo.pdf')




  try {

    const file = await readFile(filePath)

    const body = new Uint8Array(file)




    return new Response(body, {

      headers: {

        'Content-Type': 'application/pdf',

        'Content-Disposition': 'inline; filename="condicoes_gerais_gd_externo.pdf"'

      }

    })

  } catch {

    return new Response('Arquivo nao encontrado.', { status: 404 })

  }

}
