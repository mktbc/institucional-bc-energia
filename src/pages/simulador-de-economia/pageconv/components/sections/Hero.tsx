import { useEffect, useState } from "react";
import { LeadForm } from "@pageconv/components/LeadForm";
import { PrivacyNote } from "@pageconv/components/PrivacyNote";
import heroVideo from "@pageconv/assets/hero-bc-energia-background-v3.mp4.asset.json";
import heroPoster from "@pageconv/assets/hero-bc-energia-poster-v3.jpg.asset.json";

const destaques = [
  "Até 25% de economia",
  "Sem placas solares",
  "Sem obras",
  "Sem investimento inicial",
  "Mesma distribuidora",
];

function ExampleCard() {
  return (
    <div className="w-full rounded-[22px] border border-white/15 bg-white/10 p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.75)] backdrop-blur-md sm:p-7">
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-cyan">
        Exemplo de economia
      </p>

      <dl className="mt-5 space-y-4">
        <div>
          <dt className="text-[13px] leading-snug text-[rgba(255,255,255,0.78)]">Conta mensal</dt>
          <dd className="font-display text-[30px] font-bold leading-none tracking-tight text-white">
            R$ 2.000
          </dd>
        </div>

        <div className="rounded-2xl border border-brand-yellow/25 bg-brand-yellow/10 px-4 py-3">
          <dt className="text-[13px] leading-snug text-[rgba(255,255,255,0.86)]">
            Economia potencial de até 25%
          </dt>
          <dd className="font-display text-[36px] font-bold leading-none tracking-tight text-brand-yellow">
            Até R$ 500/mês
          </dd>
        </div>

        <div>
          <dt className="text-[13px] leading-snug text-[rgba(255,255,255,0.78)]">
            Possível economia em 12 meses
          </dt>
          <dd className="font-display text-[30px] font-bold leading-none tracking-tight text-white">
            Até R$ 6.000
          </dd>
        </div>
      </dl>

      <p className="mt-5 border-t border-white/10 pt-4 text-[11.5px] leading-relaxed text-[rgba(255,255,255,0.72)]">
        Exemplo ilustrativo. A economia real depende da análise da fatura, estado, distribuidora,
        consumo, disponibilidade e condições comerciais.
      </p>
    </div>
  );
}

export function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Conexões lentas / economia de dados recebem apenas o poster estático.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = !!conn && (conn.saveData === true || /(^|-)2g$|^3g$/.test(conn.effectiveType ?? ""));
    // No celular mostramos só a imagem fixa (sem baixar o vídeo pesado).
    const mobile = window.matchMedia("(max-width: 767px)");
    const update = () => setReducedMotion(mq.matches || slow || mobile.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="lead-form"
      className="relative isolate flex scroll-mt-20 items-center overflow-hidden lg:min-h-[720px]"
    >
      {/* Camada 0 — vídeo de fundo (decorativo) */}
      {reducedMotion ? (
        <img
          src={heroPoster.url}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
      ) : (
        <video
          key="hero-bg-video-v3"
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center"
          src={heroVideo.url}
          poster={heroPoster.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      {/* Camada 1 — overlay azul-marinho institucional */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(36,47,64,0.94) 0%, rgba(36,47,64,0.84) 38%, rgba(36,47,64,0.68) 62%, rgba(24,133,125,0.30) 100%)",
        }}
      />
      {/* reforço vertical para legibilidade no mobile */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 lg:hidden"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(36,47,64,0.82) 0%, rgba(36,47,64,0.90) 60%, rgba(36,47,64,0.94) 100%)",
        }}
      />

      {/* Camada 2 — conteúdo */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1220px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 lg:px-8 lg:py-20">
        {/* Copy */}
        <div className="flex flex-col items-start">
          <p className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brand-cyan sm:text-[13px]">
            Geração distribuída • Energia limpa • Economia mensal
          </p>

          <h1 className="mt-4 max-w-[16ch] font-display text-[42px] font-bold uppercase leading-[0.92] tracking-tight text-white sm:text-[56px] lg:text-[64px] xl:text-[68px]">
            <span className="text-brand-yellow">Economize</span> até{" "}
            <span className="text-brand-yellow">25%</span> na sua conta de energia
          </h1>

          <p className="mt-5 max-w-[52ch] text-[16.5px] leading-relaxed text-[rgba(255,255,255,0.90)] sm:text-[17.5px]">
            Economize todos os meses com a Geração Distribuída do Grupo BC Energia. Sem instalar
            placas solares, sem fazer obras, sem investimento inicial e sem trocar de distribuidora.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {destaques.map((c) => (
              <li
                key={c}
                className="rounded-full border border-white/10 bg-white/[0.12] px-4 py-2 text-[13.5px] font-medium leading-none text-white backdrop-blur-sm"
              >
                {c}
              </li>
            ))}
          </ul>

          <a
            href="#lead-form"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-brand-yellow px-9 py-[18px] font-sans text-[17px] font-semibold tracking-normal text-brand-navy shadow-[0_14px_30px_-14px_rgba(241,192,53,0.85)] transition-all hover:brightness-[0.97] hover:shadow-[0_18px_36px_-14px_rgba(241,192,53,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan active:scale-[0.985] sm:w-auto"
          >
            Enviar minha conta para análise
          </a>

          <p className="mt-4 max-w-[54ch] text-[14.5px] leading-relaxed text-[rgba(255,255,255,0.82)]">
            Análise gratuita para unidades em GO, TO, PR, MG e MT. Consulte a economia disponível
            para o seu perfil.
          </p>

          <div className="mt-8 hidden w-full max-w-[420px] lg:block">
            <ExampleCard />
          </div>
        </div>

        {/* Form */}
        <div className="flex w-full flex-col gap-4 lg:justify-self-end">
          <LeadForm />
          <div className="rounded-2xl border border-white/10 bg-[rgba(36,47,64,0.55)] px-4 py-3 backdrop-blur-sm">
            <PrivacyNote className="text-[rgba(255,255,255,0.82)]" />
          </div>

          <div className="mt-2 lg:hidden">
            <ExampleCard />
          </div>
        </div>
      </div>
    </section>
  );
}
