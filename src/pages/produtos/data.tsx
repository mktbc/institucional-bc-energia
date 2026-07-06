import { ReactElement } from 'react'

import { ButtonLink } from '@/components'
import { AboutContent } from '@/components/Sections/Sections.type'
import Image from '@/components/Image'

type Item = Array<{
  title: string
  description: string
}>

type DescriptionType = {
  children: ReactElement
  benefits: Item
  whoWhere: Item
}

type TitleProps = {
  title: string
  icon: string
  iconSize: Array<number>
}

const Title = ({ title, icon, iconSize }: TitleProps) => (
  <>
    <Image
      className="mx-auto mb-4 lg:mx-0"
      src={icon}
      alt="Grupo BC Energia"
      width={iconSize[0]}
      height={iconSize[1]}
    />
    {title}
  </>
)

const vantagensMercadoLivre = [
  {
    title: 'Redução dos custos com energia',
    description:
      'As empresas poderão negociar diretamente com os fornecedores, resultando na diminuição dos custos de energia.'
  },
  {
    title: 'Maior flexibilidade na gestão da energia',
    description:
      'Flexibilidade para escolha de fontes, fornecedores e até modulação do contrato de energia.'
  },
  {
    title: 'Aumento da competitividade',
    description:
      'A redução dos custos operacionais com energia gera a oportunidade para as empresas se fortalecerem no mercado.'
  },
  {
    title: 'Previsibilidade orçamentária',
    description:
      'No mercado livre é comprar energia para anos posteriores e, assim, não sofrer com as oscilações do valor da energia.'
  }
]

const quemAondeMercadoLivre = [
  {
    title: 'Quem pode?',
    description: 'Consumidores conectados em alta tensão (Grupo A)'
  },
  {
    title: 'Onde atendemos?',
    description: 'Todo o Brasil'
  }
]

const vantagensConsorcio = [
  {
    title: 'Sem investimento',
    description:
      'Para economizar não é necessário fazer investimento em painéis solares, pois o consorciado receberá a energia das nossas usinas.'
  },
  {
    title: 'Sem taxa de adesão',
    description:
      'Para fazer adesão ao consórcio de desconto na energia não é preciso fazer qualquer pagamento inicial ou administrativo.'
  },
  {
    title: 'Conforto e tranquilidade',
    description:
      'Para economizar o consorciado não terá preocupação com obras e manutenção das placas solares.'
  },
  {
    title: 'Sustentabilidade',
    description:
      'Nossa geração de energia é 100% sustentável, garantindo a preservação do meio ambiente.'
  }
]

const quemAondeConsorcio = [
  {
    title: 'Quem pode?',
    description: 'Todo tipo de consumidor com conta a partir de R$ 250,00,'
  },
  {
    title: 'Onde atendemos?',
    description:
      'Distrito Federal, Goiás, Mato Grosso, Minas Gerais, Pará, São Paulo e Tocantins. *Não consta a sua região? Não se preocupe, pois estamos em expansão e em breve poderemos chegar até você.'
  }
]

const Description = ({ children, benefits, whoWhere }: DescriptionType) => (
  <>
    {children}
    <br />
    <br />
    {whoWhere.map((item, i) => (
      <span key={i}>
        <strong>{item.title}</strong> {item.description} <br /> <br />
      </span>
    ))}
    <span className="'w-full lg:text-4x mb-3 mt-10 block text-3xl font-extrabold uppercase leading-tight text-teal-900">
      Vantagens
    </span>
    <ul className="mb-10">
      {benefits.map((item, i) => (
        <li key={i} className="mb-5">
          <strong>{item.title}</strong>: {item.description}
        </li>
      ))}
    </ul>
    <ButtonLink
      center={false}
      target="_blank"
      href="http://www.appenergia.com.br/Grupo_BC_Energia/"
    >
      Quero economizar
    </ButtonLink>
  </>
)

export const contentMercadoLivre: AboutContent = [
  {
    title: (
      <Title
        title="Mercado Livre de Energia"
        icon="/img/icons/icon-mercado-energia.svg"
        iconSize={[70, 80]}
      />
    ),
    description: (
      <Description benefits={vantagensMercadoLivre} whoWhere={quemAondeMercadoLivre}>
        <>
          Ao optar pelo Mercado Livre de Energia, sua empresa tem a liberdade de escolher o
          fornecedor que melhor atende às suas necessidades, permitindo negociações personalizadas
          de quantidade, período de fornecimento e preço. Essa flexibilidade garante que o contrato
          se adapte perfeitamente ao seu perfil de consumo.
        </>
      </Description>
    )
  }
]

export const contentConsorcio: AboutContent = [
  {
    title: (
      <Title
        title="Consórcio BC Energia"
        icon="/img/icons/icon-energia-assinatura.svg"
        iconSize={[60, 70]}
      />
    ),
    description: (
      <Description benefits={vantagensConsorcio} whoWhere={quemAondeConsorcio}>
        <>
          Solução para consumidores conectados em baixa tensão (Grupo B) economizarem até 26% todos
          os meses na conta de energia. <br /> <br /> Com nossas usinas solares e hidrelétricas,
          você tem acesso a energia sustentável sem precisar investir em placas solares. O desconto
          na sua fatura de energia é obtido através da compensação de créditos. Nossa energia é
          injetada na rede de distribuição local e a concessionária nos reembolsa com créditos, que
          repassamos a você.
        </>
      </Description>
    )
  }
]
