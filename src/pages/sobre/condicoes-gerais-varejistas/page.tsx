import { PageHeader, Section, Heading } from '@/components'

const Esg = () => (
  <div>
    <PageHeader
      title="Condições Gerais da Comercialização Varejista"
      description=""
      bgImage="/img/global/energia-por-assinatura.jpg"
      category="Sobre"
    />

    <Section className="px-6 pt-0">
      <Heading center>
        Energia Livre com Transparência: Veja Como o Grupo BC Energia Pode Beneficiar sua Empresa
      </Heading>
      <div className="grid grid-cols-1 gap-16 pt-6 lg:grid">
        <div>
          <p className="mb-10 text-center text-lg lg:text-justify">
            O <strong> Grupo BC Energia</strong> valoriza a transparência em todos os seus processos
            comerciais. Como agente varejista, disponibiliza informações detalhadas em conformidade
            com a REN ANEEL 1110/2024, que estabelece as regras de comercialização de energia
            elétrica aplicáveis ao Sistema de Contabilização e Liquidação (SCL) e aos Procedimentos
            de Comercialização de Energia Elétrica.
          </p>

          <p className="mb-10 text-center text-lg lg:text-justify">
            Disponibilizamos um{' '}
            <a href="/docs/modelo-contrato-varejista.pdf" target="_blank">
              <u>
                <em>Modelo de Referência – Contrato Varejista</em>
              </u>
            </a>
            , que contempla, entre outras variáveis, os períodos de suprimento, os submercados de
            atuação, o tipo de energia comercializada e as condições gerais do{' '}
            <strong>Grupo BC Energia</strong>, além dos{' '}
            <a href="/docs/nota-explicativa-prc.pdf" target="_blank">
              <u>
                <em>Preços de Referência Comparáveis (PRC)</em>
              </u>
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  </div>
)

export default Esg
