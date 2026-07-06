import { ButtonLink, Carousel, Heading, Loading } from '@/components'
import { useGetBlogPosts } from '@/hooks'
import { RequestStatus } from '@/types'
import Link from '@/components/Link'

const Cta = () => {
  const { data, status } = useGetBlogPosts()

  return (
    <div className="mx-auto flex flex-col gap-12 text-center">
      <Heading subtitle="Blog">
        Fique por dentro das últimas tendências e notícias do setor elétrico
      </Heading>

      <div className="lg-px-0 flex justify-center gap-6 px-6">
        {status === RequestStatus.Pending && (
          <div className="flex flex-col items-center justify-center gap-3">
            <span className="font-semibold">Carregando as últimas postagens</span>
            <Loading />
          </div>
        )}
        {status === RequestStatus.Resolved && !data?.length ? (
          <p>Nenhum artigo publicado.</p>
        ) : null}
        {status === RequestStatus.Resolved && data?.length ? (
          <Carousel
            dots
            slidesPerView={1}
            space={30}
            slides={data.map((item) => (
              <div key={item.id} className="group flex flex-col rounded-lg bg-white">
                <div
                  className="relative flex h-60 w-full flex-col items-center justify-center overflow-hidden rounded-t-lg bg-[length:100%_100%] bg-center transition-all duration-1000 ease-in-out after:absolute after:left-0 after:h-full after:w-full after:bg-teal-600/50 group-hover:bg-[length:120%_120%]"
                  style={{ backgroundImage: `url(${item.yoast_head_json.og_image[0]?.url})` }}
                ></div>
                <div className="flex flex-col gap-4 px-10 py-6">
                  <Link href={item.link} className="z-10 mx-auto">
                    <h3 className="text-2xl uppercase text-teal-900">{item.title.rendered}</h3>
                  </Link>
                  {item.yoast_head_json.description}
                </div>
              </div>
            ))}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 40
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 40
              }
            }}
          />
        ) : null}
      </div>

      {status === RequestStatus.Resolved && data?.length ? (
        <ButtonLink href="https://blog.grupobcenergia.com.br/" variant="link">
          Ver todos artigos →
        </ButtonLink>
      ) : null}
    </div>
  )
}

export default Cta
