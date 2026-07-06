import { tv } from 'tailwind-variants'

export const menuItemStyle = tv({
  base: 'group relative text-white transition-colors duration-200 after:absolute after:-bottom-8 after:left-0 after:h-1 after:w-full after:bg-yellow-500/0 after:duration-500 hover:text-gray-200 hover:after:bg-yellow-500/100 hover:after:transition-colors hover:after:duration-500 lg:text-sm xl:text-base',
  variants: {
    active: {
      true: 'after:bg-yellow-500'
    }
  }
})
