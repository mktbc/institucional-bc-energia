import { useEffect, useState } from "react";

/**
 * CTA fixo exibido apenas no mobile. Some quando o formulário está visível
 * para não cobrir os campos, e fica deslocado para não sobrepor o WhatsApp.
 */
export function MobileStickyCta() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const form = document.getElementById("lead-form");
    if (!form) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  if (hidden || !scrolled) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-gray bg-background/95 p-3 pr-20 backdrop-blur md:hidden">
      <a
        href="#lead-form"
        className="flex w-full items-center justify-center rounded-full bg-brand-yellow px-6 py-3 font-sans text-base font-semibold tracking-normal text-brand-navy focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand-navy active:scale-[0.98]"
      >
        Analisar minha conta
      </a>
    </div>
  );
}
