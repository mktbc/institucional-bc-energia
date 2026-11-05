import { ArrowRight } from "lucide-react";
import { cn } from "@pageconv/lib/utils";

// Central place for the CTA destination so every button leads to the lead form.
export const SIGNUP_ROUTE = "#lead-form";

type CtaButtonProps = {
  children: React.ReactNode;
  href?: string;
  size?: "default" | "lg" | "xl";
  variant?: "solid" | "yellow" | "outline";
  className?: string;
};

const sizeStyles = {
  default: "min-h-[48px] px-6 py-3 text-[15px]",
  lg: "min-h-[52px] px-7 py-3.5 text-base",
  xl: "min-h-[56px] px-8 py-4 text-base",
};

const variantStyles = {
  solid:
    "bg-brand-teal text-white hover:bg-brand-teal-mid focus-visible:outline-brand-teal",
  yellow:
    "bg-brand-yellow text-brand-navy hover:brightness-[0.96] focus-visible:outline-brand-navy",
  outline:
    "border border-brand-cyan bg-transparent text-brand-cyan hover:bg-brand-cyan/10 focus-visible:outline-brand-yellow",
};

/**
 * Botão de ação no padrão institucional: pílula, Onest semibold, seta à direita.
 * Destino padrão: formulário de lead.
 */
export function CtaButton({
  children,
  href = SIGNUP_ROUTE,
  size = "default",
  variant = "solid",
  className,
}: CtaButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold leading-tight tracking-normal text-center transition-[background-color,color,filter,border-color] duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] active:scale-[0.98]",
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
      />
    </a>
  );
}
