import { Check } from "lucide-react";
import { LeadForm } from "@pageconv/components/LeadForm";
import { PrivacyNote } from "@pageconv/components/PrivacyNote";

/**
 * Hero do /simulador-de-economia no padrão do site institucional (mesma
 * linguagem do hero da Home): fotografia da biblioteca da BC com filtro
 * azul-marinho mais denso à esquerda e na base, eyebrow com o elemento
 * gráfico de chevrons, título em Barlow Condensed 700 sem caixa-alta com o
 * destaque em amarelo, texto de apoio em Onest e CTA amarelo em pílula.
 *
 * O formulário (LeadForm) continua dentro do hero, na âncora #lead-form usada
 * pelo CTA fixo do celular e pelos demais CTAs da página.
 *
 * Mobile: a foto vira uma faixa no topo que se funde ao azul-marinho; texto,
 * critérios e o formulário vêm em sequência, sem sobrepor a imagem.
 */

const HERO_IMG_DESKTOP = "/img/pages/simulador/hero-simulador-1920.webp";
const HERO_IMG_TABLET = "/img/pages/simulador/hero-simulador-1024.webp";
const HERO_IMG_MOBILE = "/img/pages/simulador/hero-simulador-mobile.webp";

const destaques = [
  "Sem placas solares",
  "Sem obras",
  "Sem investimento inicial",
  "Mesma distribuidora",
];

function ExampleCard() {
  return (
    <div className="w-full rounded-[16px] border border-white/15 bg-[rgba(20,27,38,0.55)] p-6 backdrop-blur-md sm:p-7">
      <p className="font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-brand-cyan">
        Exemplo de economia
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <dt className="text-[13px] leading-snug text-[rgba(255,255,255,0.78)]">Conta mensal</dt>
          <dd className="mt-1 font-display text-[28px] font-bold leading-none text-white">
            R$ 2.000
          </dd>
        </div>

        <div>
          <dt className="text-[13px] leading-snug text-[rgba(255,255,255,0.78)]">
            Possível economia em 12 meses
          </dt>
          <dd className="mt-1 font-display text-[28px] font-bold leading-none text-white">
            Até R$ 6.000
          </dd>
        </div>

        <div className="col-span-2 border-t border-white/15 pt-4">
          <dt className="text-[13px] leading-snug text-[rgba(255,255,255,0.86)]">
            Economia potencial de até 25%
          </dt>
          <dd className="mt-1 font-display text-[34px] font-bold leading-none text-brand-yellow">
            Até R$ 500/mês
          </dd>
        </div>
      </dl>

      <p className="mt-5 border-t border-white/10 pt-4 text-[12px] leading-relaxed text-[rgba(255,255,255,0.72)]">
        Exemplo ilustrativo. A economia real depende da análise da fatura, estado, distribuidora,
        consumo, disponibilidade e condições comerciais.
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="lead-form"
      className="sim-hero relative isolate scroll-mt-20 overflow-hidden bg-brand-navy"
    >
      {/* Fotografia (decorativa) — uma por largura de tela */}
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-20 block h-[380px] sm:h-[460px] lg:inset-0 lg:h-full" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet={HERO_IMG_MOBILE} />
        <source media="(max-width: 1023px)" srcSet={`${HERO_IMG_TABLET} 1024w, ${HERO_IMG_DESKTOP} 1920w`} sizes="100vw" />
        <img
          src={HERO_IMG_DESKTOP}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[60%_18%] lg:object-[0%_35%]"
        />
      </picture>

      {/* Filtro azul-marinho: mais denso à esquerda e na base (desktop) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,27,38,0.94) 0%, rgba(20,27,38,0.84) 40%, rgba(20,27,38,0.58) 70%, rgba(20,27,38,0.42) 100%), linear-gradient(0deg, rgba(20,27,38,0.7) 0%, transparent 34%), linear-gradient(180deg, rgba(20,27,38,0.45) 0%, transparent 22%)",
        }}
      />
      {/* Mobile/tablet: a faixa de foto se funde ao azul-marinho */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[380px] sm:h-[460px] lg:hidden"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,27,38,0.55) 0%, rgba(20,27,38,0.35) 30%, rgba(36,47,64,0.88) 72%, #242F40 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-5 pb-14 pt-[220px] sm:px-6 sm:pt-[280px] lg:min-h-[760px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:px-8 lg:py-24">
        {/* Texto */}
        <div className="flex flex-col items-start">
          <p className="sim-hero-eyebrow">Simulador de economia</p>

          <h1 className="max-w-[15ch] text-white">
            Economize <span className="text-brand-yellow">até 25%</span> na sua conta de energia
          </h1>

          <p className="mt-6 max-w-[46ch] font-sans text-[17px] leading-relaxed text-[rgba(255,255,255,0.86)] sm:text-[19px]">
            Geração distribuída do Grupo BC Energia: você economiza todos os meses sem trocar de
            distribuidora.
          </p>

          {/* Critério de elegibilidade em destaque */}
          <div className="mt-8 flex w-full max-w-[520px] items-center gap-4 rounded-[16px] border border-brand-yellow/35 bg-brand-yellow/10 px-5 py-4">
            <span className="shrink-0 whitespace-nowrap font-display text-[34px] font-bold leading-none text-brand-yellow sm:text-[40px]">
              R$ 700
            </span>
            <span className="font-sans text-[14.5px] leading-snug text-white sm:text-[15.5px]">
              Para contas a partir de <strong className="font-semibold">R$ 700/mês</strong> em GO,
              TO, PR, MG e MT.
            </span>
          </div>

          <ul className="mt-7 grid w-full max-w-[520px] grid-cols-2 gap-x-6 gap-y-3">
            {destaques.map((c) => (
              <li key={c} className="flex items-center gap-2.5 font-sans text-[15px] text-[rgba(255,255,255,0.9)]">
                <Check className="h-4 w-4 shrink-0 text-brand-cyan" strokeWidth={2.5} aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>

          <a
            href="#formulario-simulador"
            className="mt-8 inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-brand-yellow px-8 font-sans text-[16px] font-semibold text-brand-navy transition-colors hover:bg-[#f5cc55] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white sm:w-auto lg:hidden"
          >
            Enviar minha conta para análise <span aria-hidden="true">→</span>
          </a>

          <div className="mt-10 hidden w-full max-w-[520px] lg:block">
            <ExampleCard />
          </div>
        </div>

        {/* Formulário */}
        <div id="formulario-simulador" className="flex w-full scroll-mt-24 flex-col gap-4 lg:max-w-[520px] lg:justify-self-end">
          <LeadForm />
          <div className="rounded-[16px] border border-white/10 bg-[rgba(20,27,38,0.55)] px-4 py-3 backdrop-blur-sm">
            <PrivacyNote className="text-[rgba(255,255,255,0.82)]" />
          </div>

          <div className="mt-2 lg:hidden">
            <ExampleCard />
          </div>
        </div>
      </div>
    </section>
  );
}
