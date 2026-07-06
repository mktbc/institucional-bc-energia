import { ButtonHTMLAttributes } from 'react'

import { type VariantProps } from 'tailwind-variants'

import { buttonStyles } from './Button.style'

export type ButtonProps = VariantProps<typeof buttonStyles> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    block?: boolean
    loading?: boolean
    children?: string
    size?: 'sm' | 'md' | 'lg'
  }
