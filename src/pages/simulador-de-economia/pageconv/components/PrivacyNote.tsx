export function PrivacyNote({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const variantClasses =
    variant === "light"
      ? "text-white/80"
      : "text-muted-foreground";

  return (
    <p className={`max-w-xl text-center text-xs leading-relaxed ${variantClasses} ${className}`}>
      Seus dados são utilizados apenas para análise da sua solicitação e contato relacionado ao
      atendimento, conforme nossa{" "}
      <a
        href="/politica-de-privacidade"
        className="underline underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy rounded-sm"
      >
        Política de Privacidade
      </a>
      .
    </p>
  );
}
