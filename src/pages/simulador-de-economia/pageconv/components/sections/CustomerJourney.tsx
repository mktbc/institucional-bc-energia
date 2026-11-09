import { Check } from "lucide-react";
import { CtaButton } from "@pageconv/components/CtaButton";
import { PrivacyNote } from "@pageconv/components/PrivacyNote";

const etapas = [
  {
    titulo: "Envio da fatura",
    descricao: "Você envia sua conta para análise gratuita.",
  },
  {
    titulo: "Análise de elegibilidade, consumo e distribuidora",
    descricao: "Nossa equipe verifica se a solução está disponível para a sua unidade.",
  },
  {
    titulo: "Apresentação da proposta",
    descricao: "Você conhece a estimativa de economia e as condições disponíveis.",
  },
  {
    titulo: "Formalização da adesão",
    descricao: "Se fizer sentido para o seu perfil, seguimos com a contratação.",
  },
  {
    titulo: "Alocação dos créditos",
    descricao: "A unidade passa a ser vinculada à solução contratada.",
  },
  {
    titulo: "Economia nas faturas seguintes",
    descricao: "A economia começa a aparecer conforme os prazos da modalidade e da distribuidora.",
  },
];

const diferenciais = [
  "Análise gratuita",
  "Etapas claras",
  "Atendimento consultivo",
  "Processo acompanhado",
];

export function CustomerJourney() {
  return (
    <section className="border-t border-brand-gray/20 bg-background">
      <div className="mx-auto max-w-[1280px] px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-14 lg:pb-24">
        {/* Cabeçalho */}
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
            Como você começa a economizar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Veja as etapas que acontecem desde o envio da sua fatura até o início da economia na sua
            conta de energia.
          </p>
        </div>

        {/* Conteúdo principal: timeline + card de apoio */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:mt-16 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
          {/* Timeline */}
          <div>
            <ol className="relative space-y-0">
              {/* Linha conectora central */}
              <span
                className="absolute left-5 top-10 hidden h-[calc(100%-5rem)] w-px bg-brand-teal/20 lg:block"
                aria-hidden="true"
              />

              {etapas.map((etapa, i) => (
                <li key={etapa.titulo} className="relative flex gap-5 pb-10 last:pb-0">
                  {/* Número */}
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal font-display text-lg font-bold text-white shadow-sm">
                    {i + 1}
                  </span>

                  {/* Texto */}
                  <div className="flex-1 pt-1">
                    <h3 className="font-display text-lg font-semibold uppercase tracking-tight text-brand-navy sm:text-xl">
                      {etapa.titulo}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {etapa.descricao}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Card de apoio */}
          <div className="lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-navy p-7 text-white shadow-lg shadow-brand-navy/10 sm:p-9 lg:p-10">
              {/* Sutil faixa de destaque no topo */}
              <div
                className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-brand-teal via-brand-cyan to-brand-teal"
                aria-hidden="true"
              />

              {/* Badge */}
              <span className="inline-flex items-center rounded-full bg-brand-cyan/15 px-3 py-1 text-xs font-display font-semibold uppercase tracking-wide text-brand-cyan ring-1 ring-inset ring-brand-cyan/25">
                Análise gratuita
              </span>

              <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                O processo é simples e acompanhado
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                Nossa equipe analisa sua unidade e apresenta a condição disponível com clareza, sem
                complicação e com acompanhamento em cada etapa.
              </p>

              <ul className="mt-7 space-y-4">
                {diferenciais.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-cyan/20">
                      <Check className="h-3.5 w-3.5 text-brand-cyan" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-snug text-white/90 sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center lg:mt-16">
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-brand-navy sm:text-3xl">
            Quer dar o próximo passo?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Envie sua fatura para análise gratuita e descubra se a sua unidade pode começar a
            economizar.
          </p>
          <div className="mt-6 flex justify-center">
            <CtaButton size="lg" href="#lead-form" className="w-full sm:w-auto">
              Quero analisar minha conta
            </CtaButton>
          </div>
          <div className="mt-4 flex justify-center">
            <PrivacyNote />
          </div>
        </div>
      </div>
    </section>
  );
}
