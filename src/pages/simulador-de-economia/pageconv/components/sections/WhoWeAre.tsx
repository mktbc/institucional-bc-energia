import { CtaButton } from "@pageconv/components/CtaButton";
import iconExpertise from "@pageconv/assets/icons/expertise.svg";
import iconSustentabilidade from "@pageconv/assets/icons/sustentabilidade.svg";
import iconPioneirismo from "@pageconv/assets/icons/pioneirismo.svg";

const pilares = [
  {
    icon: iconPioneirismo,
    label: "Economia",
    desc: "Encontramos soluções adequadas ao perfil de consumo de cada unidade.",
  },
  {
    icon: iconExpertise,
    label: "Eficiência",
    desc: "Combinamos conhecimento do setor energético, tecnologia e atendimento consultivo.",
  },
  {
    icon: iconSustentabilidade,
    label: "Sustentabilidade",
    desc: "Trabalhamos com soluções ligadas à geração de energia renovável.",
  },
];

export function WhoWeAre() {
  return (
    <section
      id="sobre"
      className="relative isolate scroll-mt-20 overflow-hidden bg-brand-navy text-white"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #242F40 0%, #1E2838 55%, #1A2231 100%)",
      }}
    >
      {/* Elementos gráficos discretos de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-cyan/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-brand-teal/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1120px] px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <h2 className="font-display text-[34px] font-bold uppercase leading-[1.05] tracking-tight sm:text-[44px] lg:text-[52px]">
          Conheça o Grupo BC Energia
        </h2>

        <p className="mx-auto mt-5 max-w-[740px] text-[17px] leading-[1.75] text-white/85 sm:text-lg">
          O Grupo BC Energia atua com soluções em gestão, comercialização e Geração Distribuída de
          energia, combinando conhecimento especializado, tecnologia e atendimento próximo para gerar
          economia, eficiência energética e sustentabilidade.
        </p>

        <p className="mt-9 font-display text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan sm:text-sm">
          Geramos valor com a nossa energia
        </p>

        {/* 3 pilares */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pilares.map(({ icon, label, desc }, i) => (
            <div
              key={label}
              className={`group flex h-full flex-col items-center gap-5 rounded-[22px] border border-white/[0.12] bg-white/[0.04] p-8 text-center backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] ${
                i === 2 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <span className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[16px] bg-brand-cyan/10 ring-1 ring-brand-cyan/25">
                <img loading="lazy" decoding="async"
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </span>
              <h3 className="font-display text-xl font-bold uppercase leading-none tracking-tight text-white sm:text-[22px]">
                {label}
              </h3>
              <p className="text-[15px] leading-[1.7] text-white/80">{desc}</p>
            </div>
          ))}
        </div>

        {/* Bloco institucional: proposta de valor + propósito */}
        <div className="mt-8 rounded-[20px] border border-white/10 bg-white/[0.05] p-7 text-left sm:p-8">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-0">
            <div className="sm:pr-8">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-brand-yellow">
                Proposta de valor
              </p>
              <p className="mt-2.5 text-[15px] leading-[1.7] text-white/90">
                Gerar economia aos nossos clientes com responsabilidade sustentável e compromisso
                social.
              </p>
            </div>
            <div className="border-t border-white/10 pt-7 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-brand-yellow">
                Propósito
              </p>
              <p className="mt-2.5 text-[15px] leading-[1.7] text-white/90">
                Gerar valor com nossa energia.
              </p>
            </div>
          </div>
        </div>

        {/* Slogan */}
        <p className="mx-auto mt-9 max-w-[820px] font-display text-2xl font-bold uppercase leading-tight tracking-tight text-brand-cyan sm:text-3xl lg:text-[34px]">
          “Geramos valor com a nossa energia.”
        </p>

        {/* CTA */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="max-w-[560px] text-[15px] leading-relaxed text-white/80">
            Descubra se existe uma oportunidade de economia para a sua unidade.
          </p>
          <CtaButton
            size="xl"
            variant="outline"
            href="#lead-form"
            className="w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan sm:w-auto"
          >
            Quero minha análise gratuita
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
