import { useEffect, useState } from "react";
import { Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react";
import { INSTITUTIONAL_URL, buildInstitutionalUrl, initialSearch } from "@pageconv/lib/institutional-link";
import logo from "@pageconv/assets/logo-bc.png.asset.json";

const menuLinks = [
  { label: "Página Inicial", href: "#lead-form" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Simular Economia", href: "#simulador" },
  { label: "Sobre a BC", href: "#sobre" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/grupobcenergia", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/grupobcenergia", Icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/grupobcenergia", Icon: Linkedin },
];

const INSTITUTIONAL_TEXT = "Conheça nosso site oficial";

export function Footer() {
  const [href, setHref] = useState(INSTITUTIONAL_URL);
  useEffect(() => {
    setHref(buildInstitutionalUrl(initialSearch));
  }, []);

  const handleClick = () => {
    const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "institutional_site_click",
      link_location: "footer",
      link_destination: INSTITUTIONAL_URL,
      link_text: INSTITUTIONAL_TEXT,
      source_page: "pageconv",
    });
  };

  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-white sm:text-xl">
              Quer conhecer mais sobre quem está por trás da sua economia?
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Conheça nossa trajetória, estrutura e soluções para transformar energia em
              oportunidades para pessoas e empresas.
            </p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="group inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 self-start rounded-full border border-brand-cyan px-6 py-2.5 text-sm font-semibold text-brand-cyan transition-colors hover:bg-brand-cyan/10 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-yellow md:self-auto"
          >
            {INSTITUTIONAL_TEXT}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-tight text-brand-cyan">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2.5">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-brand-yellow"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-tight text-brand-cyan">
              Atendimento
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>Segunda a sexta, das 9h às 18h</li>
              <li>
                <a
                  href="#lead-form"
                  className="text-white transition-colors hover:text-brand-yellow"
                >
                  Fale com nossa equipe comercial
                </a>
              </li>
              <li>
                <a
                  href="mailto:relacionamento@bcenergia.com.br"
                  className="text-white transition-colors hover:text-brand-yellow"
                >
                  relacionamento@bcenergia.com.br
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-tight text-brand-cyan">
              Redes Sociais
            </h3>
            <div className="mt-4 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-teal"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <img loading="lazy" decoding="async"
              src={logo.url}
              alt="Grupo BC Energia"
              className="h-11 w-auto brightness-0 invert sm:h-12"
            />
          </div>
          <p className="text-xs text-white/60">
            © 2026 Grupo BC Energia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
