import type { CSSProperties, ImgHTMLAttributes } from 'react'

/**
 * Substituto (shim) de `next/image` para React + Vite.
 *
 * Mantém a mesma API usada no projeto (src, alt, width, height, fill, priority…)
 * e renderiza um `<img>` nativo. Props específicas do Next (priority, quality,
 * sizes, placeholder) são absorvidas e não repassadas ao DOM.
 *
 * Isso permite que os componentes continuem importando `Image` sem alterações,
 * preservando a fidelidade visual da migração.
 */
export type ImageProps = {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  fill?: boolean
  priority?: boolean
  quality?: number
  sizes?: string
  placeholder?: string
  className?: string
  style?: CSSProperties
} & Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height' | 'placeholder'
>

const Image = ({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  quality,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sizes,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  placeholder,
  className,
  style,
  loading,
  ...rest
}: ImageProps) => {
  const fillStyle: CSSProperties = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
    : {}

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      className={className}
      style={{ ...fillStyle, ...style }}
      {...rest}
    />
  )
}

export default Image
