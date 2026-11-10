import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { Slider } from "@pageconv/components/ui/slider";
import { CtaButton } from "@pageconv/components/CtaButton";
import { cn } from "@pageconv/lib/utils";

// Faixa do slider (valor médio da conta de luz).
const VALOR_MINIMO = 700;
const VALOR_MAXIMO = 5000;
const VALOR_DEFAULT = 1200;

// Desconto máximo por estado atendido.
const ESTADOS = [
  { uf: "Goiás", desconto: 0.25 },
  { uf: "Tocantins", desconto: 0.23 },
  { uf: "Paraná", desconto: 0.22 },
  { uf: "Minas Gerais", desconto: 0.18 },
  { uf: "Mato Grosso", desconto: 0.18 },
];

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const pct = (v: number) => `${Math.round(v * 100)}%`;

// Tabela de referência (valores fixos de conta; economia é calculada pelo desconto do estado ativo).
const TABELA_CONTAS = [700, 1200, 2000, 5000];

export function Simulator() {
  const [valor, setValor] = useState(VALOR_DEFAULT);
  const [estadoIdx, setEstadoIdx] = useState(0);

  const desconto = ESTADOS[estadoIdx].desconto;
  const economiaMes = useMemo(() => Math.round(valor * desconto), [valor, desconto]);

  return (
    <section id="simulador" className="scroll-mt-20 bg-background">
      <div className="mx-auto w-full max-w-[880px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-[16px] bg-[linear-gradient(150deg,#18857D_0%,#1B9D93_100%)] p-6 text-white sm:p-9 lg:p-10">
          {/* Cabeçalho */}
          <header className="text-center sm:text-left">
            <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl">
              Simule sua economia
            </h2>
            <p className="mt-2 text-base leading-relaxed text-white/85">
              Veja uma estimativa de economia mensal com base no valor da sua conta.
            </p>
          </header>

          {/* Seletor de estado */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {ESTADOS.map((e, i) => (
              <button
                key={e.uf}
                type="button"
                onClick={() => setEstadoIdx(i)}
                aria-pressed={i === estadoIdx}
                className={cn(
                  "min-h-[46px] rounded-full px-5 py-2.5 font-display text-base font-semibold uppercase tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#18857D]",
                  i === estadoIdx
                    ? "bg-brand-yellow text-brand-navy shadow-sm"
                    : "bg-white/[0.16] text-white hover:bg-white/25",
                )}
              >
                {e.uf} · até {pct(e.desconto)}
              </button>
            ))}
          </div>

          {/* Valor da conta */}
          <div className="mt-8 rounded-2xl bg-white/[0.10] p-5 sm:p-6">
            <label className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
                Valor da sua conta
              </span>
              <span className="font-display text-4xl font-bold leading-none sm:text-5xl">
                {brl(valor)}
              </span>
            </label>
            <Slider
              value={[valor]}
              min={VALOR_MINIMO}
              max={VALOR_MAXIMO}
              step={100}
              onValueChange={([v]) => setValor(v)}
              className="mt-5 py-2 [&>span:first-child]:h-2.5 [&>span:first-child]:bg-white/25 [&>span:first-child>span]:bg-brand-yellow [&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:bg-brand-yellow [&_[role=slider]]:shadow-md [&_[role=slider]]:focus-visible:ring-2 [&_[role=slider]]:focus-visible:ring-white"
              aria-label="Valor da conta de luz"
            />
            <div className="flex justify-between text-sm font-medium text-white/75">
              <span>{brl(VALOR_MINIMO)}</span>
              <span>{brl(VALOR_MAXIMO)}</span>
            </div>
          </div>

          {/* Resultado principal */}
          <div className="mt-6 rounded-[16px] border border-white/25 bg-white/[0.16] p-7 text-center shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)] backdrop-blur sm:p-8">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/85">
              Sua economia estimada
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <span className="font-display text-base font-semibold uppercase tracking-tight text-white">
                Em {ESTADOS[estadoIdx].uf}
              </span>
              <span className="rounded-full bg-brand-yellow px-3 py-1 font-display text-sm font-bold uppercase tracking-tight text-brand-navy">
                até {pct(desconto)}
              </span>
            </div>
            <p className="mt-3 font-display text-[46px] font-bold leading-none sm:text-[56px]">
              {brl(economiaMes)}
            </p>
            <p className="mt-1 text-sm uppercase tracking-[0.14em] text-white/80">por mês</p>
          </div>

          {/* CTA próximo do resultado */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <CtaButton size="xl" variant="yellow" href="#lead-form" className="w-full sm:w-auto">
              Quero minha análise gratuita
            </CtaButton>
          </div>

          {/* Tabela de referência */}
          <div className="mt-9 overflow-hidden rounded-2xl bg-white/[0.08]">
            <table className="w-full text-left text-[15px]">
              <thead>
                <tr className="border-b border-white/20 bg-white/[0.06]">
                  <th className="px-4 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-white/85 sm:px-5">
                    Valor médio da conta
                  </th>
                  <th className="px-4 py-3.5 text-right font-display text-xs font-bold uppercase tracking-[0.14em] text-white/85 sm:px-5">
                    Economia estimada (até {pct(desconto)})
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABELA_CONTAS.map((conta) => (
                  <tr key={conta} className="border-b border-white/10 last:border-0">
                    <td className="px-4 py-4 text-white/90 sm:px-5">{brl(conta)}</td>
                    <td className="px-4 py-4 text-right font-display text-base font-semibold text-brand-yellow sm:px-5">
                      até {brl(Math.round(conta * desconto))}/mês
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nota de transparência */}
          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-white/[0.08] p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-white/85">
              Condições válidas para contas a partir de R$ 700. A economia pode variar conforme
              análise da fatura, estado, distribuidora, bandeira tarifária, disponibilidade de
              créditos e condições comerciais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
