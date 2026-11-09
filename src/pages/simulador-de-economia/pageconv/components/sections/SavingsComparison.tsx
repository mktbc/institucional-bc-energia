export function SavingsComparison() {
  return (
    <section className="bg-brand-ice">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <h2 className="text-center font-display text-3xl font-bold uppercase tracking-tight text-brand-navy sm:text-4xl">
          Veja o impacto que a economia pode ter ao longo do ano
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-brand-gray bg-white p-6 text-center">
            <p className="text-sm text-muted-foreground">Conta mensal</p>
            <p className="mt-2 font-display text-4xl font-bold text-brand-navy">R$ 3.000</p>
          </div>
          <div className="rounded-2xl border border-brand-yellow/40 bg-brand-yellow/10 p-6 text-center">
            <p className="text-sm text-muted-foreground">Economia exemplificativa de 20%</p>
            <p className="mt-2 font-display text-4xl font-bold text-brand-navy">R$ 600/mês</p>
          </div>
          <div className="rounded-2xl border border-brand-gray bg-white p-6 text-center">
            <p className="text-sm text-muted-foreground">Em 12 meses</p>
            <p className="mt-2 font-display text-4xl font-bold text-brand-teal">R$ 7.200</p>
          </div>
        </div>

        <p className="mt-8 text-center text-lg text-muted-foreground">
          Economizar todos os meses pode gerar um impacto importante no orçamento da sua casa ou
          empresa.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          Exemplo ilustrativo. A economia real depende do estado, distribuidora, consumo,
          disponibilidade e condições comerciais.
        </p>
      </div>
    </section>
  );
}
