import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { CtaButton } from "@pageconv/components/CtaButton";

type VideoItem = {
  id: string;
  short: boolean;
};

// URLs originais (tradicionais e Shorts) — o ID é extraído de forma segura.
const SOURCES = [
  "https://youtube.com/shorts/waOrWkghcLQ",
  "https://youtube.com/shorts/H9SxozW1cWQ",
  "https://youtube.com/shorts/mQsbhLD4Leg?feature=share",
  "https://youtube.com/shorts/wKLlwYfpLFw?feature=share",
  "https://youtube.com/shorts/RHuzwCrTTvc?feature=share",
  "https://youtube.com/shorts/Jq_EACWE1IE",
];


function parseYouTube(url: string): { id: string; short: boolean } | null {
  const clean = url.split("?")[0].replace(/\/$/, "");
  const shortsMatch = clean.match(/\/shorts\/([A-Za-z0-9_-]{6,})$/);
  if (shortsMatch) return { id: shortsMatch[1], short: true };
  const shareMatch = clean.match(/youtu\.be\/([A-Za-z0-9_-]{6,})$/);
  if (shareMatch) return { id: shareMatch[1], short: false };
  const watchMatch = url.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
  if (watchMatch) return { id: watchMatch[1], short: false };
  const embedMatch = clean.match(/\/embed\/([A-Za-z0-9_-]{6,})$/);
  if (embedMatch) return { id: embedMatch[1], short: false };
  return null;
}

const VIDEOS: VideoItem[] = SOURCES.map((src) => parseYouTube(src)).filter(Boolean) as VideoItem[];


export function VideoExplainer() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", containScroll: "trimSnaps" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playing, setPlaying] = useState<Record<string, boolean>>({});
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="overflow-hidden bg-background pt-16 pb-10 sm:pt-20 sm:pb-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-[1200px]">
          {/* Título + subtítulo */}
          <h2 className="text-center font-display text-4xl font-bold uppercase tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
            Como funciona a Geração Distribuída?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
            Entenda em poucos minutos como você pode economizar na conta de energia sem instalar
            placas solares, fazer obras ou trocar de distribuidora.
          </p>

          {/* Chamada dos vídeos */}
          <div className="mt-10 text-center">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-brand-teal sm:text-2xl">
              Assista e entenda na prática
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Veja nos vídeos como funciona a solução, quais são os principais benefícios e tire suas
              principais dúvidas.
            </p>
          </div>

          {/* Carrossel de vídeos */}
          <div className="relative mx-auto mt-6 max-w-[1050px] px-10 sm:px-14">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex items-start gap-3 sm:gap-4">
                {VIDEOS.map((v, i) => {
                  const isActive = i === selectedIndex;
                  return (
                    <div
                      key={v.id}
                      className={
                        v.short
                          ? "min-w-0 flex-[0_0_86%] sm:flex-[0_0_340px]"
                          : "min-w-0 flex-[0_0_92%] sm:flex-[0_0_80%] lg:flex-[0_0_720px]"
                      }
                    >
                      <div
                        className={`rounded-[18px] border border-brand-gray bg-white p-2 shadow-sm transition-opacity duration-300 sm:p-3 ${
                          isActive ? "opacity-100" : "opacity-60"
                        }`}
                      >
                        <div
                          className={
                            v.short
                              ? "mx-auto w-full max-w-full overflow-hidden rounded-[14px] bg-brand-navy/5 sm:h-[520px] sm:w-auto"
                              : "mx-auto w-full overflow-hidden rounded-[14px] bg-brand-navy/5"
                          }
                          style={{ aspectRatio: v.short ? "9 / 16" : "16 / 9" }}
                        >
                          {playing[v.id] ? (
                            <iframe
                              className="h-full w-full"
                              src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&autoplay=1`}
                              title={`Vídeo ${i + 1} de ${VIDEOS.length} sobre Geração Distribuída do Grupo BC Energia`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => setPlaying((p) => ({ ...p, [v.id]: true }))}
                              aria-label={`Assistir vídeo ${i + 1} de ${VIDEOS.length} sobre Geração Distribuída`}
                              className="group relative block h-full w-full"
                            >
                              <img
                                src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                                alt={`Capa do vídeo ${i + 1} sobre Geração Distribuída do Grupo BC Energia`}
                                width={480}
                                height={360}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                              />
                              <span className="absolute inset-0 flex items-center justify-center">
                                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal text-white shadow-lg transition-transform group-hover:scale-105">
                                  <Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true" />
                                </span>
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              aria-label="Vídeo anterior"
              aria-hidden={!canPrev}
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-brand-teal text-white shadow-md transition-all hover:bg-brand-teal-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal disabled:pointer-events-none disabled:opacity-0 sm:left-3 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Próximo vídeo"
              aria-hidden={!canNext}
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-brand-teal text-white shadow-md transition-all hover:bg-brand-teal-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal disabled:pointer-events-none disabled:opacity-0 sm:right-3 sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Indicadores */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {VIDEOS.map((v, i) => (
              <button
                key={v.id}
                type="button"
                aria-label={`Ir para o vídeo ${i + 1}`}
                aria-current={i === selectedIndex}
                onClick={() => emblaApi?.scrollTo(i)}
                className="flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    i === selectedIndex ? "w-7 bg-brand-teal" : "w-2.5 bg-brand-gray"
                  }`}
                />
              </button>
            ))}
          </div>



          {/* CTA */}
          <div className="mt-10 text-center">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-brand-navy sm:text-3xl">
              QUER DESCOBRIR QUANTO VOCÊ PODE ECONOMIZAR?
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Envie sua fatura para uma análise gratuita e descubra a condição disponível para a sua
              unidade.
            </p>
            <div className="mt-6 flex justify-center">
              <CtaButton size="lg" href="#lead-form" className="w-full sm:w-auto">
                Analisar minha conta
              </CtaButton>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              A análise é gratuita e não obriga você a contratar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
