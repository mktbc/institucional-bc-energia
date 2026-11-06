import { SunMedium, HardHat, Wallet, Plug } from "lucide-react";

const STEPS = [
  {
    t: "Envie sua conta",
    d: "Envie uma foto ou PDF da sua fatura de energia.",
  },
  {
    t: "Receba sua análise",
    d: "Nossa equipe verifica consumo, distribuidora, localização, elegibilidade e potencial de economia.",
  },
  {
    t: "Conheça sua oportunidade de economia",
    d: "Você recebe uma estimativa e conhece as condições disponíveis antes de decidir.",
  },
];

const BENEFITS = [
  { Icon: SunMedium, label: "Sem placas solares" },
  { Icon: HardHat, label: "Sem obras" },
  { Icon: Wallet, label: "Sem investimento inicial" },
  { Icon: Plug, label: "Mesma distribuidora" },
];

export function Steps() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-brand-gray/40">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="text-center font-display text-3xl font-bold uppercase tracking-tight text-brand-navy sm:text-4xl">
          Economizar na conta de energia pode ser mais simples do que parece
        </h2>

        <ol className="mt-12 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-3 lg:gap-8">
          {STEPS.map((s, i, arr) => (
            <li
              key={s.t}
              className="relative flex h-full flex-col gap-3 rounded-2xl border border-brand-gray bg-white p-7 shadow-sm lg:p-8"
            >
              {i < arr.length - 1 && (
                <span
                  className="absolute right-[-1.4rem] top-1/2 hidden h-px w-8 bg-brand-teal/40 sm:block lg:right-[-1.9rem]"
                  aria-hidden="true"
                />
              )}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-teal font-display text-lg font-bold text-white">
                {i + 1}
              </span>
              <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
                Passo {i + 1}
              </span>
              <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-brand-navy">
                {s.t}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>

        {/* O que acontece depois da análise */}
        <div className="mt-16">
          <h3 className="text-center font-display text-2xl font-bold uppercase tracking-tight text-brand-navy sm:text-3xl">
            O que acontece depois da análise?
          </h3>

          <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Com a sua fatura em mãos, o Grupo BC Energia verifica as condições disponíveis para a
                sua unidade e apresenta uma estimativa de economia antes da contratação.
              </p>
              <p>
                Se a solução for elegível para o seu perfil, você conhece a modalidade disponível, o
                percentual estimado de economia e como funciona a adesão.
              </p>
            </div>

            {/* Card financeiro */}
            <div className="rounded-2xl bg-brand-navy p-7 text-white sm:p-8">
              <h4 className="font-display text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
                Economia que pode fazer diferença no orçamento
              </h4>
              <dl className="mt-6 space-y-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3">
                  <dt className="text-sm text-white/75">Conta mensal</dt>
                  <dd className="font-display text-xl font-bold text-white">R$ 2.000</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3">
                  <dt className="text-sm text-white/75">Economia potencial de até 25%</dt>
                  <dd className="font-display text-2xl font-bold text-brand-yellow">Até R$ 500/mês</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-white/75">Possível impacto em 12 meses</dt>
                  <dd className="font-display text-2xl font-bold text-brand-cyan">Até R$ 6.000</dd>
                </div>
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-white/60">
                Exemplo ilustrativo. O percentual real depende do estado, distribuidora, perfil de
                consumo, disponibilidade e análise comercial.
              </p>
            </div>
          </div>
        </div>

        {/* Benefícios rápidos */}
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {BENEFITS.map(({ Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-2 rounded-xl border border-brand-gray bg-white p-4 text-center sm:flex-row sm:justify-center sm:gap-3 sm:text-left"
            >
              <Icon className="h-6 w-6 shrink-0 text-brand-teal" strokeWidth={1.75} aria-hidden="true" />
              <span className="font-display text-sm font-semibold uppercase tracking-tight text-brand-navy sm:text-base">
                {label}
              </span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
