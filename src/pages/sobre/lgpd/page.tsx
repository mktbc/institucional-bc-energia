import { PageHeader, Section, ButtonLink } from '@/components'

import '@/styles/lgpd.css'

const Lgpd = () => (
  <div>
    <PageHeader
      title="LGPD"
      description="A Lei Geral de Proteção de Dados Pessoais (LGPD) regula a coleta e o uso de dados pessoais no Brasil. No Grupo BC Energia, garantimos conformidade total com a LGPD, protegendo a privacidade e a segurança das informações dos nossos clientes."
      bgImage="/img/pages/contact.jpeg"
      category="Sobre"
    />
    <Section className="bg-white px-6 pb-4 pt-0">
      <div className="grid gap-8 lg:grid-cols-3">
        <ButtonLink
          href="#"
          variant="green"
          block
          size="xl"
          rounded
          icon="/img/icons/check-shield.svg"
        >
          Política de Privacidade
        </ButtonLink>
        <ButtonLink
          target="_blank"
          href="https://grupobcenergia.com.br/wp-content/uploads/2022/07/formulrio__direito_dos_titulares__grupo_bc.pdf"
          variant="gray"
          block
          size="xl"
          rounded
          icon="/img/icons/cloud-download.svg"
        >
          Baixar formulário
        </ButtonLink>
        <ButtonLink
          href="/contato"
          variant="gray"
          block
          size="xl"
          rounded
          icon="/img/icons/envelope.svg"
        >
          entre em contato
        </ButtonLink>
      </div>
    </Section>

    <Section className="px-6 pb-10 pt-0">
      <div className="privacidade">
        <p>
          Nós, da <strong>BC GERAÇÃO E COMERCIALIZAÇÃO DE ENERGIA LTDA.</strong> (“Grupo BC Energia”
          ou “nós”), inscrita no CNPJ/ME sob o n. 28.409.693/0001-90 e com sede na Av. Deputado
          Jamel Cecílio, nº 2929, Ed. Brookfield Tower, Torre B – Jardim Goiás, CEP: 74.810-100,
          Goiânia/GO, levamos a sua privacidade e a proteção dos seus dados a sério. Este documento
          explica como tratamos seus dados pessoais, quais são os seus direitos e como você pode
          exercê-los.
        </p>
        <h2>1. CONCEITOS BÁSICOS: O QUE VOCÊ PRECISA SABER PARA COMPREENDER ESTA POLÍTICA?</h2>
        <p>
          A fim de descomplicar a sua leitura deste documento, apresentamos algumas definições úteis
          para a sua interpretação.
        </p>
        <div className="table-privacidade">
          <table>
            <tbody>
              <tr>
                <td className="table-border-right">
                  <strong>Termo</strong>
                </td>
                <td className="table-descricao">
                  <strong>Conceito</strong>
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Dado Pessoal</strong>
                </td>
                <td className="table-conteudo">
                  <p className="espaco-table">
                    É uma informação relacionada a uma pessoa física e que seja capaz de identificar
                    a pessoa ou tornar possível a sua identificação.
                  </p>
                  <p className="espaco-table2">
                    São exemplos de dados pessoais que podem permitir a sua identificação: Nome,
                    CPF, telefone, e-mail, placa do seu veículo etc.
                  </p>
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Tratamento</strong>
                </td>
                <td className="table-conteudo">
                  É toda forma de uso que podemos fazer dos seus Dados Pessoais, incluindo, mas não
                  se limitando às seguintes atividades: coleta, armazenamento, consulta, uso,
                  compartilhamento, transmissão, classificação, reprodução, exclusão e avaliação.
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Titular</strong>
                </td>
                <td className="table-conteudo">
                  É você, a pessoa física a quem os Dados Pessoais se referem.
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Empresa</strong>
                </td>
                <td className="table-conteudo">
                  Somos nós, a <strong>Grupo BC Energia.</strong>
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Política</strong>
                </td>
                <td className="table-conteudo">É esta Política de Privacidade.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>2. QUE TIPOS DE DADOS PESSOAIS A EMPRESA TRATA?</h2>
        <p>
          Os tipos de Dados Pessoais e a forma como a Empresa os coleta dependem de
          <strong> como você se relaciona com a Empresa e por quê</strong>. Por exemplo, os Dados
          Pessoais coletados serão diferentes caso você seja um cliente que deseja comprar uma
          máquina de salgados ou um usuário do nosso site.
        </p>
        <p>
          Listamos abaixo algumas situações em que nós podemos tratar seus Dados Pessoais no
          contexto da sua relação com a Empresa:
        </p>
        <div>
          <table className="table-privacidade">
            <tbody>
              <tr>
                <td className="table-descricao">
                  <strong>Finalidades de Tratamento</strong>
                </td>
                <td className="table-descricao">
                  <strong>Tipos de Dados Pessoais Utilizados</strong>
                </td>
              </tr>
              <tr>
                <td className="table-conteudo">Solicitação de orçamento</td>
                <td className="table-conteudo">
                  Nome, CPF, RG e fatura de energia. (validar essas informações)
                </td>
              </tr>
              <tr>
                <td className="table-conteudo">Formalização do Contrato</td>
                <td className="table-conteudo">
                  Nome, CPF, RG e comprovante de endereço. (validar essas informações)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>3. COM QUEM A EMPRESA COMPARTILHA OS SEUS DADOS PESSOAIS?</h2>
        <p>
          Nós operamos em parceria com uma série de outras organizações para viabilizar as nossas
          atividades. Descrevemos aqui algumas situações em que podemos compartilhar Dados Pessoais:
        </p>
        <div className="table-privacidade">
          <table>
            <tbody>
              <tr>
                <td className="fornecedores-title">
                  <strong>Nossos Fornecedores e Parceiros.</strong>
                </td>
              </tr>
              <tr>
                <td className="fornecedores">
                  <strong>
                    Distribuidora de Energia – agente titular de concessão ou permissão federal para
                    prestar o serviço público de distribuição de energia elétrica com a finalidade
                    de compensação dos créditos de energia gerado por uma de nossas Usinas;
                  </strong>
                </td>
              </tr>
              <tr>
                <td className="fornecedores-bottom">
                  <strong>
                    Instituições Bancárias – Ao alugar uma fração de uma das nossas Usinas,
                    poderemos compartilhar os seus dados com Instituições Bancárias com a finalidade
                    de verificar questões financeiras (pagamento, recebimento etc.).
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>4. QUAIS SÃO OS SEUS DIREITOS COMO TITULAR DE DADOS PESSOAIS?</h2>
        <p>
          <strong>Os Dados Pessoais são seus</strong> e a lei brasileira lhe garante uma série de
          direitos relacionados a eles. Nós estamos comprometidos com o cumprimento desses direitos
          e, nessa seção, vamos explicar quais são esses direitos e como você pode exercê-los. Veja
          a seguir:
        </p>
        <div className="table-privacidade">
          <table>
            <tbody>
              <tr>
                <td className="table-border-right">
                  <strong>Seus Direitos</strong>
                </td>
                <td className="table-descricao">
                  <strong>Explicação</strong>
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Confirmação e Acesso</strong>
                </td>
                <td className="table-conteudo">
                  Você pode solicitar à Empresa a confirmação sobre a existência de tratamento dos
                  seus Dados Pessoais para que, em caso positivo, você possa acessá-los, inclusive
                  por meio de solicitação de cópias dos registros que temos sobre você.
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Correção</strong>
                </td>
                <td className="table-conteudo">
                  Você pode solicitar a correção dos seus Dados Pessoais caso estes estejam
                  incompletos, inexatos ou desatualizados.
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Anonimização, bloqueio ou eliminação</strong>
                </td>
                <td className="table-conteudo">
                  Você pode solicitar <strong>(a)</strong> a anonimização dos seus Dados Pessoais,
                  de forma que eles não possam mais ser relacionados a você e, portanto, deixem de
                  ser Dados Pessoais; <strong>(b)</strong> o bloqueio dos seus Dados Pessoais,
                  suspendendo temporariamente a sua possibilidade de os tratarmos para certas
                  finalidades; e <strong>(c)</strong> a eliminação dos seus Dados Pessoais, caso em
                  que deveremos apagar todos os seus Dados Pessoais sem possibilidade de reversão.
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Portabilidade</strong>
                </td>
                <td className="table-conteudo">
                  Você pode solicitar que a Empresa forneça os seus Dados Pessoais em formato
                  estruturado e interoperável visando à sua transferência para um terceiro, desde
                  que essa transferência não viole a propriedade intelectual ou segredo de negócios
                  da Empresa.
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Informação sobre o compartilhamento</strong>
                </td>
                <td className="table-conteudo">
                  Você tem o direito de saber quais são as entidades públicas e privadas com as
                  quais a Empresa realiza uso compartilhado dos seus Dados Pessoais. Manteremos, no
                  item <strong>3</strong> dessa Política, uma indicação das nossas relações com
                  terceiros que podem envolver o compartilhamento de Dados Pessoais. Em todo caso,
                  se você tiver dúvidas ou quiser mais detalhes, você tem o direito de nos solicitar
                  essas informações. A depender do caso, podemos limitar as informações fornecidas a
                  você caso a sua divulgação possa violar a propriedade intelectual ou segredo de
                  negócios da Empresa.
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Informação sobre a possibilidade de não consentir</strong>
                </td>
                <td className="table-conteudo">
                  Você tem o direito de receber informações claras e completas sobre a possibilidade
                  e as consequências de não fornecer consentimento, quando ele for solicitado pela
                  Empresa. O seu consentimento, quando necessário, deve ser livre e informado.
                  Portanto, sempre que pedirmos seu consentimento, você será livre para negá-lo –
                  nesses casos, é possível que alguns serviços não possam ser prestados.
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Revogação do consentimento</strong>
                </td>
                <td className="table-conteudo">
                  Caso você tenha consentido com alguma finalidade de tratamento dos seus Dados
                  Pessoais, você pode sempre optar por retirar o seu consentimento. No entanto, isso
                  não afetará a legalidade de qualquer Tratamento realizado anteriormente à
                  revogação. Se você retirar o seu consentimento, é possível que fiquemos
                  impossibilitados de lhe prestar certos serviços, mas iremos avisá-lo quando isso
                  ocorrer.
                </td>
              </tr>
              <tr>
                <td className="table-descricao">
                  <strong>Oposição</strong>
                </td>
                <td className="table-conteudo">
                  A lei autoriza o tratamento de Dados Pessoais mesmo sem o seu consentimento ou um
                  contrato conosco. Nessas situações, somente trataremos seus Dados Pessoais se
                  tivermos motivos legítimos para tanto, como, por exemplo, quando for necessário
                  para garantir a segurança de nossas rodovias. Caso você não concorde com alguma
                  finalidade de tratamento dos seus Dados Pessoais, você poderá apresentar oposição,
                  solicitando a sua interrupção.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="avisos-title">AVISOS IMPORTANTES</p>
        <div className="table-privacidade">
          <table>
            <tbody>
              <tr>
                <td className="avisos">
                  Para sua segurança, sempre que você apresentar uma requisição para exercer seus
                  direitos,{' '}
                  <strong>
                    a Empresa poderá solicitar algumas informações e/ou documentos complementares
                    para que possamos comprovar a sua identidade
                  </strong>
                  , buscando impedir fraudes. Fazemos isso para garantir a segurança e a privacidade
                  de todos.
                </td>
              </tr>
              <tr>
                <td className="avisos-espaco">
                  Em alguns casos,{' '}
                  <strong>
                    a Empresa pode ter motivos legítimos para deixar de atender a uma solicitação de
                    exercício de direitos
                  </strong>
                  . Essas situações incluem, por exemplo, casos em que uma revelação de informações
                  específicas poderia violar direitos de propriedade intelectual ou segredos de
                  negócio da Empresa ou de terceiros, bem como casos em que pedidos de exclusão de
                  dados não possam ser atendidos em razão da existência de obrigação da Empresa de
                  reter dados, seja para cumprir obrigações legais, regulatórias ou para
                  possibilitar a defesa da Empresa ou de terceiros em disputas de qualquer natureza.
                </td>
              </tr>
              <tr>
                <td className="avisos-bottom">
                  Ainda,{' '}
                  <strong>algumas solicitações podem não ser respondidas de forma imediata</strong>,
                  mas a Empresa se compromete a responder todas as requisições em um prazo razoável
                  e sempre em conformidade com a legislação aplicável.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Caso você tenha alguma dúvida sobre essas questões ou sobre como você pode exercer seus
          direitos, fique à vontade para entrar em contato conosco por meio dos canais informados ao
          final desta Política.
        </p>
        <h2>5. POR QUANTO TEMPO OS DADOS PESSOAIS SERÃO ARMAZENADOS?</h2>
        <p>
          A Empresa possui uma política de retenção de Dados Pessoais alinhada com a lei aplicável.
          Dados Pessoais são armazenados somente pelo tempo que forem necessários para cumprir com
          as finalidades para as quais foram coletados, salvo se houver qualquer outra razão para
          sua manutenção como, por exemplo, cumprimento de quaisquer obrigações legais,
          regulatórias, contratuais, entre outras permitidas sob a lei.
        </p>
        <p>
          Sempre fazemos uma análise técnica para determinar o período de retenção adequado para
          cada tipo de Dado Pessoal coletado, considerando a sua natureza, necessidade de coleta e
          finalidade para a qual ele será tratado, bem como eventuais necessidades de retenção para
          o cumprimento de obrigações ou o resguardo de direitos.
        </p>
        <h2>6. COMO A EMPRESA PROTEGE SEUS DADOS PESSOAIS?</h2>
        <p>
          <strong>
            Nossa responsabilidade é cuidar dos seus Dados Pessoais e utilizá-los somente para as
            finalidades descritas nessa Política
          </strong>
          . Para garantir a sua privacidade e a proteção dos seus Dados Pessoais, adotamos recursos
          tecnológicos avançados para garantir a segurança de todos os dados tratados pela Empresa.
          Entre as medidas de segurança implementadas estão a implementação de controles de acesso a
          sistemas e ambientes de tratamento de dados, técnicas de criptografia e a instalação de
          barreiras contra o acesso indevido às bases de dados (incluindo firewalls), entre outros
          controles de segurança da informação.
        </p>
        <p>
          <strong>
            Nós nos esforçamos para proteger a privacidade de seus Dados Pessoais, mas infelizmente
            não podemos garantir total segurança
          </strong>
          . Entradas e usos não autorizados de terceiros com informações suas, falhas de hardware ou
          software que não estejam sob controle da Empresa e outros fatores externos podem
          comprometer a segurança dos seus Dados Pessoais. Por isso, sua atuação é fundamental para
          a manutenção de um ambiente seguro para todos. Caso você identifique ou tome conhecimento
          de qualquer fator que comprometa a segurança dos seus dados na sua relação com a Empresa,
          por favor entre em contato conosco por meio das informações de contato indicadas abaixo.
        </p>
        <h2>7. MUDANÇAS NA POLÍTICA DE PRIVACIDADE</h2>
        <p>
          Como estamos sempre buscando melhorar os nossos serviços e a forma como operamos, esta
          Política de Privacidade pode passar por atualizações para refletir as melhorias
          realizadas. Desta forma, recomendamos a visita periódica desta página para que você tenha
          conhecimento sobre as modificações efetivadas.
        </p>
      </div>
    </Section>
  </div>
)

export default Lgpd
