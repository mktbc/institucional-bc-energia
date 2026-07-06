/**
 * MOCK — substitui a busca de posts do blog (`getBlogPosts`).
 *
 * ⚠️  TODO: TI reconectar API do blog.
 * Origem: rota Next `/api/blog` → `${BLOG_API}/posts` (WordPress/Yoast).
 * A UI (carrossel de posts na home) permanece intacta; retornar um array vazio
 * faz o componente exibir o estado "Nenhum artigo publicado.".
 */
export const getBlogPosts = async (): Promise<any[]> => {
  // TODO: TI reconectar — retornar os posts reais do blog.
  return []
}
