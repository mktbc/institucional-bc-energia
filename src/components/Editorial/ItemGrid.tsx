import { ReactNode } from 'react'

export type ItemGridItem = { title: ReactNode; description?: ReactNode; key?: string }

/**
 * Itens numerados com filete superior — mesma grade dos pilares da Home.
 * Usada por benefícios, desafios, perfis e aspectos em todas as rotas.
 */
export const ItemGrid = ({ items, columns = 3 }: { items: Array<ItemGridItem>; columns?: 2 | 3 }) => (
  <ul className={`bc-item-grid bc-item-grid--${columns}`}>
    {items.map((item, index) => (
      <li key={item.key ?? (typeof item.title === 'string' ? item.title : index)}>
        <span aria-hidden="true" className="bc-item-n">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3>{item.title}</h3>
        {item.description ? <p>{item.description}</p> : null}
      </li>
    ))}
  </ul>
)

const Check = () => (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    className="mt-[0.28rem] h-4 w-4 shrink-0 text-bc-primary"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 8.5 6.2 12 13 4.5" />
  </svg>
)

/** Lista de critérios com marca de verificação; `grid` = duas colunas com filetes. */
export const CheckList = ({ items, grid = false }: { items: Array<string>; grid?: boolean }) => (
  <ul className={`bc-check-list${grid ? ' bc-check-list--grid' : ''}`}>
    {items.map((item) => (
      <li key={item}>
        <Check />
        {item}
      </li>
    ))}
  </ul>
)
