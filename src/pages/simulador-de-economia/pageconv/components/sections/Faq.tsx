import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@pageconv/components/ui/accordion";

export const faqs = [
  {
    q: "O que é Geração Distribuída?",
    a: "É um modelo no qual a energia é produzida por unidades geradoras e seus créditos podem ser destinados a unidades consumidoras participantes conforme a modalidade e as regras aplicáveis.",
  },
  {
    q: "Como funciona a energia por assinatura?",
    a: "Dependendo da modalidade disponível, o consumidor pode acessar os benefícios da geração de energia sem precisar comprar ou instalar um sistema solar no próprio imóvel.",
  },
  {
    q: "Preciso instalar placas solares?",
    a: "Não. A geração acontece fora do seu imóvel.",
  },
  {
    q: "Preciso fazer alguma obra?",
    a: "Não. A instalação elétrica do imóvel permanece inalterada.",
  },
  {
    q: "Vou trocar de distribuidora?",
    a: "Não. Sua distribuidora continua responsável pela rede elétrica e fornecimento físico.",
  },
  {
    q: "A economia é sempre de 25%?",
    a: "Não. O percentual depende do estado, distribuidora, consumo, disponibilidade e condições comerciais.",
  },
  {
    q: "Quanto posso economizar em cada estado?",
    a: "Goiás: até 25%. Tocantins: até 23%. Paraná: até 22%. Minas Gerais: até 18%. Mato Grosso: até 18%. Os percentuais podem variar conforme distribuidora, perfil de consumo, bandeira tarifária, disponibilidade de créditos e análise comercial.",
  },
  {
    q: "Existe custo para fazer a análise?",
    a: "Não. A análise inicial da fatura é gratuita.",
  },
  {
    q: "Minha conta precisa ser de quanto?",
    a: "A solução é direcionada a contas médias a partir de R$ 700 por mês.",
  },
  {
    q: "Por que preciso enviar minha conta de energia?",
    a: "A fatura contém informações necessárias para analisar consumo, distribuidora, tarifa e elegibilidade.",
  },
  {
    q: "Quanto tempo leva para começar a economizar?",
    a: "O prazo é informado após a análise e depende dos procedimentos relacionados à modalidade contratada e à distribuidora.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-brand-ice">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-16 sm:px-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-8 lg:py-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow-chevron text-brand-teal">Dúvidas frequentes</p>
          <h2 id="faq-title" className="mt-5 text-3xl text-brand-navy sm:text-4xl lg:text-[44px]">
            Perguntas frequentes sobre economia de energia
          </h2>
        </div>

        <Accordion type="single" collapsible className="border-t border-brand-gray">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-brand-gray">
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-brand-navy hover:text-brand-teal hover:no-underline sm:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
