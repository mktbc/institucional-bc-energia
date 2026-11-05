import { Gauge, Cable, Building2, Wrench } from "lucide-react";

const cards = [
  {
    icon: Gauge,
    title: "MESMO MEDIDOR",
    description: "O fornecimento continua usando a mesma estrutura da unidade.",
  },
  {
    icon: Cable,
    title: "MESMA REDE ELÉTRICA",
    description: "A energia continua chegando pela mesma rede da distribuidora.",
  },
  {
    icon: Building2,
    title: "MESMA DISTRIBUIDORA",
    description: "A concessionária local continua responsável pelo fornecimento.",
  },
  {
    icon: Wrench,
    title: "SEM ALTERAÇÃO NA INSTALAÇÃO",
    description: "Não é necessário mudar a estrutura elétrica do imóvel.",
  },
];

export function SameDistributor() {
  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto max-w-[1160px] px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
          VOCÊ CONTINUA COM A MESMA DISTRIBUIDORA
        </h2>

        <p className="mt-8 inline-block rounded-full bg-brand-yellow px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-tight text-brand-navy sm:text-base">
          Sem trocar de distribuidora
        </p>

        <div className="mx-auto mt-8 max-w-[720px] space-y-5">
          <p className="text-base leading-relaxed text-white/85 sm:text-lg sm:leading-relaxed">
            Com a Geração Distribuída do Grupo BC Energia, a energia é produzida em usinas parceiras e
            injetada na rede da distribuidora. Os créditos gerados são destinados à sua unidade
            consumidora e ajudam a gerar{" "}
            <strong className="font-semibold text-white">
              economia todos os meses na sua conta de energia
            </strong>
            , conforme a modalidade contratada.
          </p>
          <p className="text-base leading-relaxed text-white/85 sm:text-lg sm:leading-relaxed">
            Tudo isso sem mudar sua rotina: você continua com a mesma distribuidora, sem instalar placas
            solares e sem alterar a instalação do imóvel.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group flex flex-col items-center rounded-[20px] border border-white/10 bg-white/[0.05] p-6 text-center transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] sm:p-7"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-cyan/10 ring-1 ring-brand-cyan/20">
                <Icon className="h-7 w-7 text-brand-cyan" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-sm font-semibold uppercase tracking-tight text-white sm:text-base">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
