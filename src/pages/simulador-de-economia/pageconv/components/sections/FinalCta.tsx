import { CtaButton } from "@pageconv/components/CtaButton";
import { PrivacyNote } from "@pageconv/components/PrivacyNote";
import { Sparkles } from "lucide-react";

const reforcos = ["Análise gratuita", "Sem compromisso", "Processo simples"];

export function FinalCta() {
  return (
    <section className="bg-gradient-brand-dark">
      <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-[1000px] rounded-[16px] bg-brand-navy p-7 text-center shadow-xl sm:p-12 lg:p-16">
          <h2 className="font-display text-[26px] font-bold uppercase leading-tight tracking-tight text-white sm:text-[34px] lg:text-[40px]">
            Descubra quanto você pode economizar na sua conta de luz!
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Envie sua fatura para uma análise gratuita e veja a economia disponível para a sua unidade
            consumidora.
          </p>

          {/* Reforços de confiança */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            {reforcos.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-brand-cyan"
              >
                <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <CtaButton size="xl" variant="yellow" href="#lead-form" className="w-full sm:w-auto">
              Quero analisar minha conta
            </CtaButton>
          </div>

          <div className="mt-5 flex justify-center">
            <PrivacyNote variant="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
