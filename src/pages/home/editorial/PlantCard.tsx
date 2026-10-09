import type { KeyboardEvent } from 'react'

import type { PowerPlant } from '@/data/powerPlants'

type PlantCardProps = {
  plants: Array<PowerPlant>
  current: number
  onChange: (index: number) => void
}

/**
 * Ficha técnica dos complexos de geração sobre o panorama da seção de
 * estrutura própria. Um complexo por vez, com navegação por botões ou setas
 * do teclado; a troca é anunciada em região viva. O índice ativo vem do
 * panorama, que troca a foto de fundo junto.
 */
export default function PlantCard({ plants, current, onChange }: PlantCardProps) {
  if (!plants.length) return null

  const total = plants.length
  const go = (index: number) => onChange((index + total) % total)
  const plant = plants[current]
  const spec = (match: (label: string) => boolean) => plant.specs.find((item) => match(item.label))
  const rows = [
    spec((label) => label.startsWith('Usinas')),
    spec((label) => label === 'Potência total'),
    spec((label) => label === 'Tipo de estrutura'),
    spec((label) => label === 'Geração anual média')
  ].filter((item): item is NonNullable<typeof item> => Boolean(item))

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    go(current + (event.key === 'ArrowLeft' ? -1 : 1))
  }

  return (
    <aside
      className="hx-plant"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Complexos de geração do Grupo BC Energia"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="hx-plant-head" aria-live="polite">
        <h3>{plant.title}</h3>
        <span>{plant.location}</span>
      </div>
      <dl>
        {rows.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      {total > 1 && (
        <div className="hx-plant-pager">
          <div>
            <button type="button" onClick={() => go(current - 1)} aria-label="Complexo anterior">
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" onClick={() => go(current + 1)} aria-label="Próximo complexo">
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <span>Complexo {current + 1} de {total}</span>
        </div>
      )}
    </aside>
  )
}
