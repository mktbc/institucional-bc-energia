import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@pageconv/components/ui/sheet";
import { CtaButton } from "@pageconv/components/CtaButton";
import { cn } from "@pageconv/lib/utils";
import logo from "@pageconv/assets/logo-bc.png.asset.json";

const NAV_LINKS = [
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Simular Economia", href: "#simulador" },
  { label: "Sobre a BC", href: "#sobre" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 bg-background transition-shadow duration-300",
        scrolled ? "shadow-[0_2px_14px_-6px_rgba(36,47,64,0.28)]" : "shadow-none",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1220px] items-center justify-between gap-6 px-5 sm:px-7 sm:h-20 lg:px-8">
        <a
          href="/"
          aria-label="Grupo BC Energia — início"
          className="flex shrink-0 items-center rounded-md py-1 outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
        >
          <img src={logo.url} alt="Grupo BC Energia" className="h-11 w-auto sm:h-14" />
        </a>

        <nav className="hidden items-center gap-9 md:flex lg:gap-11">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-sm py-2 font-sans text-[15px] font-medium text-brand-navy outline-none transition-colors hover:text-brand-teal focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 lg:text-base"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-teal transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center md:flex">
          <CtaButton size="default" className="min-h-[46px] px-7 text-[15px]">
            Quero Economizar
          </CtaButton>
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Abrir menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-brand-gray text-brand-navy outline-none transition-colors hover:bg-brand-ice focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-xs">
              <SheetTitle className="font-display text-xl uppercase tracking-tight text-brand-navy">
                Menu
              </SheetTitle>
              <nav className="mt-6 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3.5 font-sans text-lg font-medium text-brand-navy outline-none transition-colors hover:bg-brand-ice hover:text-brand-teal focus-visible:ring-2 focus-visible:ring-brand-teal"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-7 flex flex-col gap-3">
                <CtaButton size="default" className="w-full min-h-[50px]">
                  Quero Economizar
                </CtaButton>
                <p className="text-center text-xs text-muted-foreground">
                  Análise gratuita e sem compromisso
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Divisor institucional discreto (substitui a faixa verde pesada) */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-brand-gray via-brand-teal/35 to-brand-gray"
      />
    </header>
  );
}
