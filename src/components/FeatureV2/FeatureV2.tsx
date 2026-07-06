import Image from '@/components/Image'

import { FeatureV2Props } from './FeatureV2.type'

const FeatureV2 = ({ icon, title, description }: FeatureV2Props) => (
  <div className="flex flex-col items-center gap-8 lg:flex-row">
    <div className="mb-4 flex h-full items-center justify-center bg-yellow-500 px-5 py-3 text-center align-middle text-2xl font-bold lg:mb-0 lg:px-6 lg:py-4 lg:text-3xl xl:px-3 xl:py-2 xl:text-3xl">
      <Image
        className="mx-auto h-20 lg:p-2"
        src={icon}
        alt="Grupo BC Energia"
        width={60}
        height={60}
      />
    </div>
    <h4 className="text-lg font-bold uppercase text-teal-900 lg:text-2xl xl:text-3xl">
      {title}
      <p className="text-lg">{description}</p>
    </h4>
  </div>
)

export default FeatureV2
