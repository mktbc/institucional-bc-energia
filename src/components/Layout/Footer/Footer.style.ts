import { tv } from 'tailwind-variants'

export const menuItemFooterStyle = tv({
  base: 'text-white transition-colors duration-200 hover:text-amber-400',
  variants: {
    active: {
      true: 'font-bold text-amber-400'
    }
  }
})
