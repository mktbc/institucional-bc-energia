import { ButtonLink } from '@/components'
import Image from '@/components/Image'

import { ProductCardProps } from './ProductCard.type'

const ProductCard = ({
  img,
  icon,
  iconSize,
  title,
  description,
  btnText = 'Saiba mais',
  url,
  target
}: ProductCardProps) => (
  <div className="group flex flex-col overflow-hidden rounded-lg bg-teal-600/95 text-center">
    <div
      style={{
        backgroundImage: `url(${img})`
      }}
      className="flex h-60 justify-center bg-[length:100%_100%] bg-center transition-all duration-1000 ease-in-out group-hover:bg-[length:120%_120%]"
    >
      {icon && (
        <Image
          src={`${icon}`}
          alt="Icone"
          width={iconSize?.length ? iconSize[0] : 0}
          height={iconSize?.length ? iconSize[1] : 0}
        />
      )}
    </div>
    <div className="flex flex-col gap-6 px-12 pb-12 pt-8 text-white">
      <h4 className="m-auto w-full text-2xl leading-tight lg:w-3/4 lg:text-3xl">{title}</h4>
      <p>{description}</p>
      {url && (
        <ButtonLink href={url} variant="primary" target={target || '_self'}>
          {btnText}
        </ButtonLink>
      )}
    </div>
  </div>
)

export default ProductCard
