import Link from '@/components/Link'
import Accordion from '@/components/Accordion/Accordion'
import StructuredData from '@/components/Seo/StructuredData'
import { faqSchema } from '@/components/Seo/structuredDataBuilders'
import Reveal from '@/components/Reveal/Reveal'
import { faq } from '@/pages/produtos/mercado-livre-de-energia/data'

/**
 * Home — FAQ interativo.
 *
 * As 5 principais dúvidas reais sobre energia sustentável e Mercado Livre de
 * Energia — mesmo conteúdo oficial já publicado na página de produto
 * (`mercado-livre-de-energia/data.tsx`). Nenhuma pergunta foi inventada.
 * Accordion do Design System (H3 + button aria-expanded) + FAQPage JSON-LD.
 */

const items = faq.slice(0, 5)

/** FAQPage JSON-LD só aceita conteúdo textual (restringe aos itens string). */
const schemaItems = items.filter(
  (item): item is typeof item & { content: string } => typeof item.content === 'string'
)

const HomeFaq = () => (
  <section id="home_faq" className="hx-section hx-soft" aria-labelledby="home-faq-title">
    <StructuredData schemas={[faqSchema(schemaItems)]} />
    <div className="hx-wrap hx-faq">
      <Reveal>
        <p className="hx-eyebrow">Perguntas frequentes</p>
        <h2 id="home-faq-title" className="hx-h2">
          Dúvidas sobre energia sustentável e <em>Mercado Livre</em>
        </h2>
        <p className="hx-lead">
          As respostas diretas para as principais dúvidas de quem quer reduzir
          o custo de energia com fontes renováveis.
        </p>
        <Link className="hx-link" href="/contato" data-cta-name="home_faq_especialista" data-cta-location="faq">
          Falar com um especialista
        </Link>
      </Reveal>
      <Reveal className="hx-faq-list" delay={0.12}>
        {items.map((item) => (
          <Accordion key={item.title} open={false} variant="faq" title={item.title} content={item.content} />
        ))}
      </Reveal>
    </div>
  </section>
)

export default HomeFaq
