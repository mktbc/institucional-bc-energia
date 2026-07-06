import { tv } from 'tailwind-variants'

export const subItemsContainer = tv({
  base: 'absolute left-0 z-50 mt-4 grid w-max -translate-y-3 transform grid-cols-4 transition-all duration-300 before:absolute before:-mt-8 before:h-10 before:w-24 group-hover:translate-y-0',
  variants: {
    isMenuOpen: {
      true: 'visible opacity-100',
      false: 'invisible opacity-0 '
    }
  }
})

export const subItemsWrap = tv({
  base: 'mt-8 grid cursor-default gap-x-3 overflow-hidden rounded-lg bg-teal-600 text-gray-800 shadow-xl',
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
