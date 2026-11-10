import { CtaButton } from "@pageconv/components/CtaButton";
import { PrivacyNote } from "@pageconv/components/PrivacyNote";
import { cn } from "@pageconv/lib/utils";
import { Receipt, MapPin, Building2, UserCheck } from "lucide-react";

const cards = [
  {
    icon: Receipt,
    title: "Conta a partir de R$ 700/mês",
    badge: "Principal critério",
    desc: "A análise comercial é direcionada a unidades com conta média mensal a partir de R$ 700.",
  },
  {
    icon: MapPin,
    title: "Atendimento em GO, TO, PR, MG e MT",
    desc: "A disponibilidade e o percentual de economia variam conforme estado, distribuidora e perfil de consumo.",
  },
  {
    icon: Building2,
    title: "Residencial, comercial e industrial",
    desc: "A solução pode atender diferentes perfis de consumo conforme a análise da unidade.",
  },
  {
    icon: UserCheck,
    title: "Titular ou responsável pela conta",
    desc: "A análise considera os dados da unidade consumidora e da pessoa responsável pela contratação.",
  },
];

export function Qualification() {
  return (
    <section className="border-y border-brand-gray/40 bg-brand-ice">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-brand-navy sm:text-4xl lg:text-[46px]">
            Veja se sua conta de energia pode participar
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            A solução do Grupo BC Energia é indicada para quem busca economizar todos os meses sem
            precisar investir em placas solares ou alterar a instalação do imóvel.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, badge, desc }, index) => {
            const isMain = index === 0;

            return (
              <div
                key={title}
                className={cn(
                  "group flex h-full flex-col rounded-3xl p-6 transition-all duration-300 sm:p-7",
                  isMain
                    ? "border-[1.5px] border-brand-yellow bg-white shadow-[0_8px_30px_-18px_rgba(36,47,64,0.22)]"
                    : "border border-brand-gray bg-white hover:-translate-y-0.5 hover:border-brand-gray/80 hover:shadow-md"
                )}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-teal/10">
                  <Icon className="h-6 w-6 text-brand-teal" aria-hidden="true" />
                </span>

                {badge && (
                  <span className="mt-4 w-fit rounded-full bg-brand-yellow px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-widest text-brand-navy">
                    {badge}
                  </span>
                )}

                <h3
                  className={cn(
                    "font-display text-lg font-semibold uppercase leading-tight tracking-tight text-brand-navy sm:text-[19px]",
                    badge ? "mt-3" : "mt-5"
                  )}
                >
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center sm:mt-16">
          <p className="max-w-2xl font-display text-xl font-semibold uppercase tracking-tight text-brand-navy sm:text-2xl">
            Sua conta é a partir de R$ 700 por mês? Envie sua fatura para uma análise gratuita.
          </p>
          <CtaButton size="xl" href="#lead-form" variant="yellow">
            Enviar minha conta para análise
          </CtaButton>
          <PrivacyNote />
        </div>
      </div>
    </section>
  );
}
