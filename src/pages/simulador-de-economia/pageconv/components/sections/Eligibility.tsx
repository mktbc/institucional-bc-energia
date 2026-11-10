import { CtaButton } from "@pageconv/components/CtaButton";
import { PrivacyNote } from "@pageconv/components/PrivacyNote";
import { Check, CircleMinus, Sparkles } from "lucide-react";

const podeSolicitar = [
  { texto: "sua conta média é a partir de R$ 700/mês", forte: true },
  { texto: "sua unidade está em GO, TO, PR, MG ou MT", forte: true },
  { texto: "você é titular ou responsável pela conta", forte: false },
  { texto: "deseja economizar sem comprar equipamentos", forte: false },
];

const naoPrecisa = [
  "instalar placas solares",
  "fazer obras",
  "trocar de distribuidora",
  "comprar equipamentos",
];

export function Eligibility() {
  return (
    <section className="bg-brand-ice">
      <div className="mx-auto max-w-[1280px] px-4 pt-10 pb-16 sm:px-6 sm:pt-12 sm:pb-16 lg:px-8 lg:pt-14 lg:pb-24">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-brand-navy sm:text-4xl lg:text-[46px]">
            Quem pode solicitar uma análise?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Veja rapidamente se a sua conta atende os critérios para uma análise gratuita.
          </p>
        </div>

        {/* Wrapper visual da área de elegibilidade */}
        <div className="mt-10 rounded-[16px] border border-brand-gray bg-white p-5 sm:p-8 lg:mt-12 lg:p-10">
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-[1.15fr_0.85fr] lg:gap-7">
            {/* Card principal */}
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border-[1.5px] border-brand-teal bg-[#F3FAF8] p-6 shadow-[0_8px_28px_-18px_rgba(36,47,64,0.35)] sm:p-9">
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-teal via-brand-cyan to-brand-teal"
                aria-hidden="true"
              />

              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-brand-teal sm:text-2xl">
                Você pode solicitar se:
              </h3>

              {/* Âncoras visuais */}
              <div className="mt-5 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center rounded-full bg-brand-yellow px-4 py-1.5 font-display text-[13px] font-bold uppercase tracking-wide text-brand-navy sm:text-sm">
                  Contas a partir de R$ 700
                </span>
                <span className="inline-flex items-center rounded-full bg-brand-teal px-4 py-1.5 font-display text-[13px] font-bold uppercase tracking-wide text-white sm:text-sm">
                  GO • TO • PR • MG • MT
                </span>
              </div>

              <ul className="mt-7 space-y-5 sm:space-y-6">
                {podeSolicitar.map((item) => (
                  <li key={item.texto} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-teal">
                      <Check className="h-4 w-4 text-white" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span
                      className={
                        item.forte
                          ? "text-base font-semibold leading-relaxed text-brand-navy sm:text-lg"
                          : "text-base leading-relaxed text-brand-navy/75 sm:text-[17px]"
                      }
                    >
                      {item.texto}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card secundário */}
            <div className="flex h-full flex-col rounded-[16px] border border-brand-gray bg-white p-7 shadow-[0_6px_20px_-16px_rgba(36,47,64,0.18)] sm:p-9">
              <div className="flex items-center gap-2.5">
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-brand-navy sm:text-[26px]">
                  Você não precisa:
                </h3>
                <Sparkles
                  className="h-5 w-5 shrink-0 text-brand-teal/80 sm:h-6 sm:w-6"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                A solução foi pensada para simplificar sua adesão.
              </p>

              <ul className="mt-6 space-y-4 sm:mt-7 sm:space-y-5">
                {naoPrecisa.map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-teal/10">
                      <CircleMinus
                        className="h-4 w-4 text-brand-teal"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                      <span className="font-semibold text-brand-navy/90">{item}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reforço + CTA integrados ao wrapper */}
          <div className="mt-8 border-t border-brand-gray pt-7 sm:mt-10 sm:pt-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="mx-auto max-w-[46ch] text-base leading-relaxed text-brand-navy sm:text-lg">
                Sua conta está dentro desse perfil? Então envie sua fatura para uma análise gratuita.
              </p>
              <CtaButton size="xl" href="#lead-form" className="w-full sm:w-auto">
                Verificar se minha conta é elegível
              </CtaButton>
              <div className="max-w-[52ch]">
                <PrivacyNote />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
