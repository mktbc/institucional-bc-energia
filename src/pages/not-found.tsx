import Link from '@/components/Link'

const NotFound = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-teal-600 text-center align-middle">
    <div>
      <h1 className="mb-2 text-9xl text-gray-200">404</h1>
      <h2 className="mb-2 text-3xl text-white">Não encontrado</h2>
      <p className="text-white">Não foi possível encontrar o recurso solicitado.</p>
      <Link
        className="mt-3 inline-block rounded bg-gray-200 px-4 py-2 transition-all hover:bg-gray-100"
        href="/"
      >
        Retornar para home
      </Link>
    </div>
  </div>
)

export default NotFound
