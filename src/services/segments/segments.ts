import { getSegmentData } from '@/data/segments'

/**
 * MOCK/LOCAL — substitui a busca de dados de segmentos (`getSegment`).
 *
 * Origem: `${API}/segments?segment=<slug>` (rota Next `/api/segments`, que lia
 * arquivos JSON do disco). Na migração, os 11 JSONs foram empacotados em
 * `src/data/segments`, então a rota `/segmentos/:segmento` funciona 100% offline.
 *
 * ⚠️  TODO: TI reconectar — opcional. Se quiserem voltar a servir os segmentos
 * a partir de uma API externa, substituir a linha abaixo por um fetch.
 */
export const getSegment = async (segment?: string) => getSegmentData(segment)
