import { BadgeCheck, Receipt, MapPin, SunMedium, PlugZap } from "lucide-react";

const items = [
  { icon: BadgeCheck, label: "Análise gratuita" },
  { icon: Receipt, label: "Contas a partir de R$ 800" },
  { icon: MapPin, label: "GO • TO • PR • MG • MT" },
  { icon: SunMedium, label: "Sem placas solares" },
  { icon: PlugZap, label: "Mesma distribuidora" },
];

export function TrustBar() {
  return (
    <section aria-label="Diferenciais do Grupo BC Energia" className="border-y border-brand-gray bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between lg:gap-6">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2 text-left">
              <Icon className="h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />
              <span className="font-sans text-xs font-medium tracking-normal text-brand-navy sm:text-sm">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
