import { Info } from "lucide-react";
import { CtaButton } from "@pageconv/components/CtaButton";

const estados = [
  { uf: "Goiás", sigla: "GO", pct: "25%", destaque: true },
  { uf: "Tocantins", sigla: "TO", pct: "23%", destaque: false },
  { uf: "Paraná", sigla: "PR", pct: "22%", destaque: false },
  { uf: "Minas Gerais", sigla: "MG", pct: "18%", destaque: false },
  { uf: "Mato Grosso", sigla: "MT", pct: "18%", destaque: false },
];

export function SavingsByState() {
  return (
    <section className="relative overflow-hidden bg-[#F7F9F9]">
      {/* Detalhes discretos da marca */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-brand-cyan/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-brand-teal/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1120px] px-4 pt-10 pb-6 sm:px-6 sm:pt-12 sm:pb-8 lg:px-8 lg:pt-14 lg:pb-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-brand-navy sm:text-4xl lg:text-[44px]">
            Quanto você pode economizar na sua região?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Confira as referências de economia por estado e descubra a condição disponível para a
            sua unidade.
          </p>
        </div>

        {/* Cards */}
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-14 lg:grid-cols-5 lg:gap-5">
          {estados.map((e, i) => (
            <li
              key={e.uf}
              className={[
                "group relative flex flex-col items-center rounded-2xl border bg-white px-4 py-7 text-center shadow-sm transition-all duration-200",
                "hover:-translate-y-1 hover:border-brand-teal/40 hover:bg-white hover:shadow-md",
                e.destaque ? "border-brand-teal/35" : "border-brand-gray",
                // último card centralizado quando sobra sozinho em 2 colunas
                i === estados.length - 1 ? "col-span-2 sm:col-span-1" : "",
              ].join(" ")}
            >
              {e.destaque && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-yellow px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wide text-brand-navy shadow-sm">
                  Até 25%
                </span>
              )}

              <h3 className="font-display text-lg font-semibold uppercase leading-tight tracking-tight text-brand-navy sm:text-xl">
                {e.uf}
              </h3>

              <span className="mt-2 inline-flex items-center rounded-md bg-brand-gray/60 px-2 py-0.5 font-display text-xs font-bold uppercase tracking-widest text-brand-navy/70">
                {e.sigla}
              </span>

              <span className="mt-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Até
              </span>
              <span className="font-display text-[44px] font-bold leading-none text-brand-teal sm:text-[48px] lg:text-[52px]">
                {e.pct}
              </span>
            </li>
          ))}
        </ul>

        {/* Observação comercial */}
        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-xl border border-brand-gray/70 bg-[#F5F7F7] p-4 text-left sm:p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            Os percentuais podem variar conforme distribuidora, perfil de consumo, bandeira
            tarifária, disponibilidade de créditos e análise comercial.
          </p>
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-brand-navy">
          O percentual disponível para a sua unidade é confirmado após a análise da fatura.
        </p>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-base font-medium text-brand-navy sm:text-lg">
            Quer saber qual percentual está disponível para a sua conta?
          </p>
          <div className="mt-5 flex justify-center">
            <CtaButton size="lg" href="#lead-form" className="w-full sm:w-auto">
              Descobrir minha economia
            </CtaButton>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Envie sua fatura para uma análise gratuita.
          </p>
        </div>
      </div>
    </section>
  );
}
