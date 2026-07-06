import { tv } from 'tailwind-variants'

export const navbarStyles = tv({
  base: 'bg-background fixed inset-x-0 top-0 z-50 mx-6 flex justify-center transition-all duration-700 lg:mx-auto',
  variants: {
    scroll: {
      true: 'mt-2',
      false: 'mt-4'
    }
  }
})

export const navbarContainerStyles = tv({
  base: 'container flex items-center justify-between rounded-lg px-5 py-3 backdrop-blur-lg transition-all duration-700 ease-in-out md:flex lg:px-8 lg:py-4',
  variants: {
    scroll: {
      true: 'bg-teal-800 bg-opacity-80',
      false: 'bg-white bg-opacity-30 text-xs lg:text-base'
    }
  }
})

export const navbarItemsStyles = tv({
  base: 'hidden font-bold uppercase lg:flex lg:space-x-3 xl:space-x-6 2xl:space-x-10'
})

export const navbarBtnItemsStyles = tv({
  base: 'hidden lg:flex lg:gap-2 xl:gap-4'
})

export const navbarBtnMobileStyles = tv({
  base: 'flex w-5 gap-4 opacity-80 lg:hidden'
})
