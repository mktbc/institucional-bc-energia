import { Routes, Route } from 'react-router-dom'

import RootLayout from '@/components/Layout/RootLayout'

// Páginas (portadas do App Router: cada page.tsx vira uma rota)
import Home from '@/pages/home/page'
import Contato from '@/pages/contato/page'
import ContatoEnviado from '@/pages/contato/enviado/page'
import ConteudoBcCast from '@/pages/conteudo/bc-cast/page'
import ConteudoBlog from '@/pages/conteudo/blog/page'

import EnergiaSolarAnapolis from '@/pages/energia-solar-anapolis/page'
import EnergiaSolarAparecida from '@/pages/energia-solar-aparecida-de-goiania/page'
import EnergiaSolarRioVerde from '@/pages/energia-solar-em-rio-verde/page'
import EnergiaSolarGoiania from '@/pages/energia-solar-goiania/page'
import EnergiaSolarTocantins from '@/pages/energia-solar-no-tocantins/page'
import EnergiaSolarPalmas from '@/pages/energia-solar-palmas/page'
import EnergiaSolarTrindade from '@/pages/energia-solar-trindade/page'

import Produtos from '@/pages/produtos/page'
import ProdutoMercadoLivre from '@/pages/produtos/mercado-livre-de-energia/page'
import ProdutoConsorcio from '@/pages/produtos/consorcio-bc-energia/page'
import ProdutoGestao from '@/pages/produtos/gestao-de-energia/page'
import ProdutoIrec from '@/pages/produtos/irec/page'
import ProdutoCertificacaoIrec from '@/pages/produtos/certificacao-renovavel-irec/page'
import ProdutoArrendamento from '@/pages/produtos/arrendamento-de-usinas/page'

import Segmentos from '@/pages/segmentos/page'
import Segmento from '@/pages/segmentos/segmento/page'

import Sobre from '@/pages/sobre/page'
import SobreQuemSomos from '@/pages/sobre/quem-somos/page'
import SobreNossasUsinas from '@/pages/sobre/nossas-usinas/page'
import SobreLgpd from '@/pages/sobre/lgpd/page'
import SobreLeilao from '@/pages/sobre/leilao/page'
import SobreFatorAlavancagem from '@/pages/sobre/fator-de-alavancagem/page'
import SobreSustentabilidade from '@/pages/sobre/sustentabilidade/page'
import SobreSocial from '@/pages/sobre/social/page'
import SobreCondicoesVarejistas from '@/pages/sobre/condicoes-gerais-varejistas/page'

import NotFound from '@/pages/not-found'

const App = () => (
  <Routes>
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />

      <Route path="contato" element={<Contato />} />
      <Route path="contato/enviado" element={<ContatoEnviado />} />

      <Route path="conteudo/bc-cast" element={<ConteudoBcCast />} />
      <Route path="conteudo/blog" element={<ConteudoBlog />} />

      <Route path="energia-solar-anapolis" element={<EnergiaSolarAnapolis />} />
      <Route path="energia-solar-aparecida-de-goiania" element={<EnergiaSolarAparecida />} />
      <Route path="energia-solar-em-rio-verde" element={<EnergiaSolarRioVerde />} />
      <Route path="energia-solar-goiania" element={<EnergiaSolarGoiania />} />
      <Route path="energia-solar-no-tocantins" element={<EnergiaSolarTocantins />} />
      <Route path="energia-solar-palmas" element={<EnergiaSolarPalmas />} />
      <Route path="energia-solar-trindade" element={<EnergiaSolarTrindade />} />

      <Route path="produtos" element={<Produtos />} />
      <Route path="produtos/mercado-livre-de-energia" element={<ProdutoMercadoLivre />} />
      <Route path="produtos/consorcio-bc-energia" element={<ProdutoConsorcio />} />
      <Route path="produtos/gestao-de-energia" element={<ProdutoGestao />} />
      <Route path="produtos/irec" element={<ProdutoIrec />} />
      <Route path="produtos/certificacao-renovavel-irec" element={<ProdutoCertificacaoIrec />} />
      <Route path="produtos/arrendamento-de-usinas" element={<ProdutoArrendamento />} />

      <Route path="segmentos" element={<Segmentos />} />
      <Route path="segmentos/:segmento" element={<Segmento />} />

      <Route path="sobre" element={<Sobre />} />
      <Route path="sobre/quem-somos" element={<SobreQuemSomos />} />
      <Route path="sobre/nossas-usinas" element={<SobreNossasUsinas />} />
      <Route path="sobre/lgpd" element={<SobreLgpd />} />
      <Route path="sobre/leilao" element={<SobreLeilao />} />
      <Route path="sobre/fator-de-alavancagem" element={<SobreFatorAlavancagem />} />
      <Route path="sobre/sustentabilidade" element={<SobreSustentabilidade />} />
      <Route path="sobre/social" element={<SobreSocial />} />
      <Route path="sobre/condicoes-gerais-varejistas" element={<SobreCondicoesVarejistas />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
)

export default App
