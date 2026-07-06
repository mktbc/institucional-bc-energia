import { ReactElement } from 'react'

export type WrapperProps = {
  id: string
  bgImage: string
  title: string | ReactElement
  description: string
  textLink: string
  link: string
  target?: '_self' | '_blank'
}
