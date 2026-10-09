import { useState } from 'react'

import Link from '@/components/Link'
import Reveal from '@/components/Reveal/Reveal'
import type { PowerPlant } from '@/data/powerPlants'
import PlantCard from './PlantCard'

/**
 * Home — estrutura própria. O fundo é a foto aérea real do complexo exibido
 * na ficha: ao navegar entre os complexos, a foto troca junto (fusão). Só as
 * fotos já visitadas e as vizinhas são carregadas.
 */
export default function PlantPanorama({ plants }: { plants: Array<PowerPlant> }) {
  const [current, setCurrent] = useState(0)
  const [seen, setSeen] = useState(() => new Set([0]))
  const total = plants.length

  const change = (index: number) => {
    setCurrent(index)
    setSeen((prev) => new Set(prev).add(index))
  }
  const near = (index: number) =>
    seen.has(index) || index === (current + 1) % total || index === (current - 1 + total) % total

  return (
    <section className="hx-panorama" aria-labelledby="be-field-title">
      <div className="hx-panorama-media" aria-hidden="true">
        {plants.map((plant, index) => (
          <div key={plant.id} className={`hx-ph${index === current ? ' is-on' : ''}`}>
            {near(index) && (
              <img src={plant.image} alt="" width={500} height={300} loading="lazy" decoding="async" />
            )}
          </div>
        ))}
      </div>
      <div className="hx-wrap hx-panorama-grid">
        <Reveal>
          <p className="hx-eyebrow">Estrutura própria</p>
          <h2 id="be-field-title" className="hx-h2">Energia <em>acontecendo</em></h2>
          <p className="hx-lead">A energia que comercializamos vem de usinas próprias de fonte renovável. Estrutura, operação e certificação I-REC garantem economia com origem limpa e comprovável.</p>
          <div className="hx-big">
            <span className="hx-big-n">{total}</span>
            <div><b>Complexos de geração</b><p>Usinas solares e hidrelétricas próprias no Centro-Oeste e Sudeste.</p></div>
          </div>
          <Link className="hx-link hx-link--light" href="/sobre/nossas-usinas" data-cta-name="home_sustentabilidade_usinas">Conhecer nossas usinas</Link>
        </Reveal>
        <Reveal delay={0.15}>
          <PlantCard plants={plants} current={current} onChange={change} />
        </Reveal>
      </div>
    </section>
  )
}
