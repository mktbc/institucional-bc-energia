import { PageHeader, Section } from '@/components'

const Blog = () => (
  <div>
    <PageHeader title="Fator de Alavancagem" bgImage="/img/pages/contact.jpeg" category="Sobre" />
    <Section className="bg-white px-6 pt-0">
      <div className="flex flex-col gap-8">
        <p className="text-justify">
          A Câmara de Comercialização de Energia Elétrica (CCEE) implantou um novo processo para
          tornar as atividades das empresas de energia mais transparentes no Brasil. Agora, os
          participantes devem calcular um indicador financeiro chamado “fator de alavancagem” para
          entender como gerenciam os riscos das negociações. Esse cálculo busca evidenciar os riscos
          financeiros envolvidos na comercialização de energia e fortalecer a confiança das empresas
          no mercado energético brasileiro. O Grupo BC Energia tem três empresas na CCEE e cada uma
          delas apresenta os seguintes fatores de alavancagem em suas operações:
        </p>

        <p>[BC Energia: 0.0%; Artis Energia: 0%; Ipe Energia: 0%].</p>

        <p>Ultima atualização: 04/12/2023</p>
      </div>
    </Section>
  </div>
)

export default Blog
