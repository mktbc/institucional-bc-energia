import { tv } from 'tailwind-variants'

export const navbarStyles = tv({
  base: 'bg-background fixed inset-x-0 top-0 z-50 mx-6 flex flex-col justify-center transition-all duration-700 lg:mx-auto',
  variants: {
    scroll: {
      true: 'mt-2',
      false: 'mt-8'
    }
  }
})

export const navbarContainerStyles = tv({
  base: 'container flex w-full max-w-full items-center justify-between rounded-lg px-5 py-3 backdrop-blur-lg transition-all duration-700 ease-in-out md:flex lg:px-8 lg:py-4',
  variants: {
    scroll: {
      true: 'bg-teal-800 bg-opacity-80',
      false: 'bg-white bg-opacity-30 text-xs lg:text-base'
    }
  }
})

export const navbarItemsStyles = tv({
  base: 'mt-3 flex h-[calc(100vh_-_9rem)] transform flex-col overflow-auto rounded-lg bg-teal-800 bg-opacity-30 py-5 text-center font-bold uppercase leading-[3rem] backdrop-blur-lg transition-all duration-300 lg:flex lg:space-x-4 xl:space-x-6 2xl:space-x-10',
  variants: {
    open: {
      true: 'visible visible translate-y-0 opacity-100',
      false: 'invisible -translate-y-3 opacity-0'
    }
  }
})

export const navbarBtnItemsStyles = tv({
  base: 'mb-3 mt-4 flex w-full flex-col gap-4 px-4'
})

export const navbarBtnMobileStyles = tv({
  base: 'flex w-5 gap-4 opacity-80 lg:hidden'
})
