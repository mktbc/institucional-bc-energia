import { tv } from 'tailwind-variants'

export const menuItemStyle = tv({
  base: 'group text-white transition-colors duration-200 hover:text-gray-200',
  variants: {
    active: {
      true: 'after:bg-yellow-500'
    }
  }
})
