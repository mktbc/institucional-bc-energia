import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CheckCircle2, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";

// Imagens hospedadas no CDN da BC Energia (URLs validadas, carregam em qualquer projeto)
const BASE = "https://page.grupobcenergia.com.br";
const lifeboxImg = `${BASE}/__l5e/assets-v1/c602a98d-f1bc-4eba-9116-5aed1b54663a/lifebox.png`;
const grupoCerealFabrica = `${BASE}/__l5e/assets-v1/fc643ea2-d1df-4c09-bd23-09032a80b36e/grupo-cereal-fabrica.jpg`;
const grupoCerealLogo = `${BASE}/__l5e/assets-v1/467fd3df-0cda-45ee-b1e9-54a2c5c26d5c/grupo-cereal-logo.png`;
const cocoBambuImg = `${BASE}/__l5e/assets-v1/756d697d-d5ac-49ec-b437-c706f3fa1d0b/coco-bambu.jpg`;

interface Props {
  scrollToForm: () => void;
}

const SocialProofCarousel = ({ scrollToForm }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const cases = [
    {
      key: "lifebox",
      empresa: "LifeBox",
      image: lifeboxImg,
      imageAlt: "Restaurante LifeBox - cliente BC Energia",
      logo: null as string | null,
      descricao:
        "A LifeBox reduziu drasticamente seus custos com energia sem instalar placas solares ou realizar obras — com o modelo de assinatura do Grupo BC Energia.",
      economia: [
        { label: "Economia Anual", value: "+R$ 400.000" },
        { label: "Resultado", value: "Comprovado" },
      ],
      cta: "Quero economizar",
    },
    {
      key: "cereal",
      empresa: "Grupo Cereal",
      image: grupoCerealFabrica,
      imageAlt: "Fábrica do Grupo Cereal - Cliente BC Energia",
      logo: grupoCerealLogo,
      descricao:
        "Uma das maiores empresas do agronegócio brasileiro confia no Grupo BC Energia para reduzir drasticamente seus custos com energia — com economia que supera quase R$ 1 milhão por ano.",
      economia: [
        { label: "Economia Anual", value: "R$ 997.450" },
        { label: "Economia Média Mensal", value: "R$ 83.120" },
      ],
      cta: "Quero economizar",
    },
    {
      key: "cocobambu",
      empresa: "Coco Bambu",
      image: cocoBambuImg,
      imageAlt: "Coco Bambu - Cliente BC Energia",
      logo: null,
      descricao:
        "Uma das maiores redes de restaurantes do Brasil confia no Grupo BC Energia para reduzir seus custos com energia — com economia comprovada de fevereiro de 2025 a fevereiro de 2026.",
      economia: [{ label: "Economia Total", value: "R$ 338.881,76" }],
      cta: "Quero economizar",
    },
  ];

  const slides = cases.map((c) => (
    <div
      key={c.key}
      className="w-full rounded-[2.5rem] overflow-hidden border border-brand-teal/20 bg-gradient-to-br from-brand-teal/5 via-card to-brand-cyan/5 backdrop-blur-xl"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[500px] group">
          <img
            src={c.image}
            alt={c.imageAlt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-brand-navy/10" />
          {c.logo && (
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
              <img src={c.logo} loading="lazy" decoding="async" alt={`${c.empresa} logo`} className="h-12 sm:h-14 w-auto" />
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-10 lg:p-12 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal w-fit">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Cliente Satisfeito</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-brand-navy leading-tight">
            {c.empresa}
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">{c.descricao}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            {c.economia.map((e) => (
              <div
                key={e.label}
                className="bg-brand-teal/5 border border-brand-teal/10 rounded-2xl px-6 py-4 text-center"
              >
                <p className="text-muted-foreground text-xs font-medium mb-1">{e.label}</p>
                <p className="font-display text-brand-teal font-black text-2xl sm:text-3xl whitespace-nowrap">
                  {e.value}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={scrollToForm}
            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-yellow px-10 py-4 font-sans text-base font-semibold tracking-normal text-brand-navy transition-all hover:brightness-[0.96] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-navy active:scale-[0.98] sm:w-auto"
          >
            {c.cta}
            <ArrowUp className="h-5 w-5 rotate-90 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="relative bg-brand-ice pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24 px-4 sm:px-6 lg:px-20">
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-teal/20 bg-brand-teal/10 px-4 py-1.5 text-brand-teal">
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Caso Real</span>
        </div>

        <h2 className="mb-6 max-w-4xl text-center font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-brand-navy sm:text-4xl">
          Economia que aparece todos os meses
        </h2>

        <p className="mb-12 max-w-2xl text-center text-lg font-light text-muted-foreground md:text-xl">
          Veja como empresas já reduziram custos com energia usando as soluções do Grupo BC Energia.
        </p>

        {/* Carousel */}
        <div className="relative w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide, i) => (
                <div key={i} className="min-w-0 flex-[0_0_100%]">
                  {slide}
                </div>
              ))}
            </div>
          </div>

          <button
            aria-label="Anterior"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-lg transition-colors hover:bg-brand-teal hover:text-white disabled:opacity-30 lg:-translate-x-6"
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Próximo"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 translate-x-2 items-center justify-center rounded-full border border-border bg-card shadow-lg transition-colors hover:bg-brand-teal hover:text-white disabled:opacity-30 lg:translate-x-6"
            disabled={!canScrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para o caso ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "w-8 bg-brand-teal" : "w-3 bg-brand-teal/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofCarousel;
