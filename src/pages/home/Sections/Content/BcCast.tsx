import { ButtonLink, Heading } from '@/components'
import { bcCast } from '@/mooks/content'
const Cta = () => (
  <div className="mx-auto flex flex-col gap-12 px-6 text-center">
    <Heading subtitle="BC Cast">
      Insights valiosos sobre energia e muito mais em nosso Podcast
    </Heading>

    <div className="grid grid-cols-1 justify-center gap-6 lg:grid-cols-2">
      {bcCast.map((item) => (
        <iframe
          key={item.id}
          className="w-full"
          height="400"
          src={item.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ))}
    </div>
    <ButtonLink
      href={`https://www.youtube.com/@grupobcenergia/videos`}
      variant="link"
      target="_blank"
    >
      Ver todos episódios →
    </ButtonLink>
  </div>
)

export default Cta
