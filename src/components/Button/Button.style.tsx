import { tv } from 'tailwind-variants'

export const buttonWrapperStyles = tv({
  base: 'flex',
  variants: {
    center: {
      true: 'justify-center'
    }
  },
  defaultVariants: {
    center: true
  }
})

export const buttonStyles = tv({
  base: 'font-bold uppercase transition-all',
  variants: {
    variant: {
      primary: 'border border-amber-400 bg-amber-400 text-teal-900 hover:bg-amber-500',
      secondary: 'border border-white bg-white text-teal-900 hover:bg-white/80',
      green: 'border border-teal-600 bg-teal-600 text-white hover:bg-teal-600/80',
      light: 'bg-transparent text-white hover:bg-white/20',
      link: 'bg-transparent text-teal-600 hover:text-teal-600/70',
      gray: 'bg-gray-200 text-teal-900 hover:bg-gray-300/80'
    },
    outline: {
      true: 'border border-white'
    },
    block: {
      true: 'block w-full text-center'
    },
    size: {
      sm: 'px-3 py-1',
      md: 'px-4 py-2',
      lg: 'px-5 py-3',
      xl: 'px-5 py-4 text-lg'
    },
    rounded: {
      true: 'rounded-lg'
    },
    disabled: {
      true: 'cursor-not-allowed opacity-70 hover:bg-amber-400'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})
