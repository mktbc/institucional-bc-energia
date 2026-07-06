import { tv } from 'tailwind-variants'

export const subItemsContainer = tv({
  base: 'left-0 left-0 right-0 z-50 mx-auto mt-2 w-full -translate-y-3 transform grid-cols-4 p-0 px-4 transition-all duration-300 group-hover:translate-y-0',
  variants: {
    isMenuOpen: {
      true: 'visible relative w-full opacity-100',
      false: 'invisible absolute w-full opacity-0'
    }
  }
})

export const subItemsWrap = tv({
  base: 'mt-0 flex cursor-default flex-col gap-x-3 overflow-hidden rounded-lg bg-teal-600 text-gray-800 shadow-xl',
  variants: {
    column: {
      2: 'grid-cols-2',
      undefined: 'grid-cols-1'
    }
  }
})

export const subItemStyles = tv({
  base: 'text-base font-normal capitalize',
  variants: {
    border: {
      true: 'border-b border-b-teal-500/50'
    },
    size: {
      lg: 'leading-[2rem]',
      undefined: 'leading-[1.2rem]'
    }
  }
})
