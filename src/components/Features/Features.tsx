import Image from '@/components/Image'

import { FeaturesProps } from './Features.type'

const Features = ({ ...feature }: FeaturesProps) => (
  <div className="flex items-center gap-8 lg:flex-col xl:flex-row">
    <div className="mb-4 flex h-full items-center justify-center bg-yellow-500 px-5 py-3 text-center align-middle text-2xl font-bold lg:px-6 lg:py-4 lg:text-3xl xl:px-3 xl:py-1 xl:text-3xl">
      {typeof feature.icon === 'object' ? (
        <Image
          className="mx-auto"
          src={feature.icon.url}
          alt="Grupo BC Energia"
          width={feature.icon.size[0]}
          height={feature.icon.size[0]}
        />
      ) : (
        feature.icon
      )}
    </div>
    <h4 className="text-lg font-bold uppercase text-teal-900 lg:text-2xl xl:text-[1.3rem]">
      {feature.title}
    </h4>
  </div>
)

export default Features
