import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="#lead-form"
      aria-label="Solicitar análise gratuita"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" stroke="white" strokeWidth={1.5} />
    </a>
  );
}
