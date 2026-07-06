import Image from '@/components/Image'

type Props = {
  data: string
  local: string
}

const Local = ({ data, local }: Props) => (
  <>
    <div className="whitespace-pre-line">{data}</div>
    <div className="mt-4 flex flex-row justify-center gap-2">
      <Image src="/img/icons/pin.svg" alt="Local" width={12} height={16} /> <strong>{local}</strong>
    </div>
  </>
)

export default Local
