import { useEffect, useRef, useState } from 'react'

import './bc-form.css'

import { supabase } from '@/lib/supabase'

type FormState = {
  nome: string
  email: string
  whatsapp: string
  empresa: string
  cnpj: string
  cargo: string
  estado: string
  objetivo: string
  fontePreferencia: string
  consumoMensalMwh: string
  jaAdquire: string
}

type FormErrors = Partial<Record<keyof FormState, string | null>>

interface FormularioIRECProps {
  solucao?: string
  showIntro?: boolean
  introText?: string
}

const UTM_DEFAULTS: Record<string, string> = {
  utm_fonte: 'Marketing',
  utm_medium: 'organic',
  utm_campaign: 'SEO',
  utm_channel: 'Formulario Site'
}

// Envio via Edge Function `form-webhook` (Supabase). Secret: FORM_WEBHOOK_URL.

const ESTADOS_BR = [
  { value: 'AC', label: 'Acre (AC)' },
  { value: 'AL', label: 'Alagoas (AL)' },
  { value: 'AP', label: 'Amapá (AP)' },
  { value: 'AM', label: 'Amazonas (AM)' },
  { value: 'BA', label: 'Bahia (BA)' },
  { value: 'CE', label: 'Ceará (CE)' },
  { value: 'DF', label: 'Distrito Federal (DF)' },
  { value: 'ES', label: 'Espírito Santo (ES)' },
  { value: 'GO', label: 'Goiás (GO)' },
  { value: 'MA', label: 'Maranhão (MA)' },
  { value: 'MT', label: 'Mato Grosso (MT)' },
  { value: 'MS', label: 'Mato Grosso do Sul (MS)' },
  { value: 'MG', label: 'Minas Gerais (MG)' },
  { value: 'PA', label: 'Pará (PA)' },
  { value: 'PB', label: 'Paraíba (PB)' },
  { value: 'PR', label: 'Paraná (PR)' },
  { value: 'PE', label: 'Pernambuco (PE)' },
  { value: 'PI', label: 'Piauí (PI)' },
  { value: 'RJ', label: 'Rio de Janeiro (RJ)' },
  { value: 'RN', label: 'Rio Grande do Norte (RN)' },
  { value: 'RS', label: 'Rio Grande do Sul (RS)' },
  { value: 'RO', label: 'Rondônia (RO)' },
  { value: 'RR', label: 'Roraima (RR)' },
  { value: 'SC', label: 'Santa Catarina (SC)' },
  { value: 'SP', label: 'São Paulo (SP)' },
  { value: 'SE', label: 'Sergipe (SE)' },
  { value: 'TO', label: 'Tocantins (TO)' }
]

const FormularioIREC = ({
  solucao = 'irec',
  showIntro = false,
  introText = 'Preencha o formulário abaixo e um de nossos consultores entrará em contato para apresentar a solução de certificados I-REC mais adequada para sua empresa.'
}: FormularioIRECProps) => {
  const [form, setForm] = useState<FormState>({
    nome: '',
    email: '',
    whatsapp: '',
    empresa: '',
    cnpj: '',
    cargo: '',
    estado: 'GO',
    objetivo: '',
    fontePreferencia: '',
    consumoMensalMwh: '',
    jaAdquire: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (success && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [success])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.nome.trim()) newErrors.nome = 'Preencha este campo.'
    if (!form.email.trim()) newErrors.email = 'Preencha este campo.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'E-mail inválido.'
    if (!form.whatsapp.trim()) newErrors.whatsapp = 'Preencha este campo.'
    if (!form.empresa.trim()) newErrors.empresa = 'Preencha este campo.'
    if (!form.cnpj.trim()) newErrors.cnpj = 'Preencha este campo.'
    if (!form.cargo.trim()) newErrors.cargo = 'Preencha este campo.'
    if (!form.objetivo) newErrors.objetivo = 'Selecione uma opção.'
    if (!form.fontePreferencia) newErrors.fontePreferencia = 'Selecione uma opção.'
    if (!form.consumoMensalMwh) newErrors.consumoMensalMwh = 'Preencha este campo.'
    else if (isNaN(Number(form.consumoMensalMwh)) || Number(form.consumoMensalMwh) <= 0)
      newErrors.consumoMensalMwh = 'Informe um valor válido.'
    if (!form.jaAdquire) newErrors.jaAdquire = 'Selecione uma opção.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setSubmitError(false)
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const utms: Record<string, string> = {}
      Object.entries(UTM_DEFAULTS).forEach(([key, def]) => {
        utms[key] = urlParams.get(key) ?? def
      })

      const payload = {
        ...form,
        whatsapp: form.whatsapp.replace(/\D/g, ''),
        ...utms,
        solucao,
        paginaOrigem: window.location.href,
        dataHoraEnvio: new Date().toISOString()
      }

      const { error } = await supabase.functions.invoke('form-webhook', {
        body: payload
      })
      if (error) throw error

      setSuccess(true)
    } catch {
      setSubmitError(true)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div ref={successRef} className="mx-4 mb-8 rounded-lg bg-white p-8 text-center">
        <p className="text-xl font-bold text-teal-700">Mensagem enviada com sucesso!</p>
        <p className="mt-2 text-gray-600">Em breve, um de nossos consultores entrará em contato.</p>
      </div>
    )
  }

  return (
    <form className="bc-form" onSubmit={handleSubmit} noValidate>
      {showIntro && <p className="bcf-intro">{introText}</p>}

      {submitError && (
        <p className="mb-4 text-center text-sm font-semibold text-yellow-300">
          Ocorreu um erro ao enviar. Por favor, tente novamente ou fale conosco pelo WhatsApp.
        </p>
      )}

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="irec-nome">
            Nome completo<span className="bcf-required">*</span>
          </label>
          <input
            id="irec-nome"
            name="nome"
            type="text"
            className={`bcf-input${errors.nome ? ' error' : ''}`}
            value={form.nome}
            onChange={handleChange}
          />
          {errors.nome && <span className="bcf-error-text">{errors.nome}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="irec-email">
            E-mail corporativo<span className="bcf-required">*</span>
          </label>
          <input
            id="irec-email"
            name="email"
            type="email"
            className={`bcf-input${errors.email ? ' error' : ''}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className="bcf-error-text">{errors.email}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="irec-whatsapp">
            WhatsApp<span className="bcf-required">*</span>
          </label>
          <input
            id="irec-whatsapp"
            name="whatsapp"
            type="tel"
            className={`bcf-input${errors.whatsapp ? ' error' : ''}`}
            placeholder="(XX) XXXXX-XXXX"
            value={form.whatsapp}
            onChange={handleChange}
          />
          {errors.whatsapp && <span className="bcf-error-text">{errors.whatsapp}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="irec-empresa">
            Empresa<span className="bcf-required">*</span>
          </label>
          <input
            id="irec-empresa"
            name="empresa"
            type="text"
            className={`bcf-input${errors.empresa ? ' error' : ''}`}
            value={form.empresa}
            onChange={handleChange}
          />
          {errors.empresa && <span className="bcf-error-text">{errors.empresa}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="irec-cnpj">
            CNPJ<span className="bcf-required">*</span>
          </label>
          <input
            id="irec-cnpj"
            name="cnpj"
            type="text"
            className={`bcf-input${errors.cnpj ? ' error' : ''}`}
            placeholder="XX.XXX.XXX/XXXX-XX"
            value={form.cnpj}
            onChange={handleChange}
          />
          {errors.cnpj && <span className="bcf-error-text">{errors.cnpj}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="irec-cargo">
            Cargo<span className="bcf-required">*</span>
          </label>
          <input
            id="irec-cargo"
            name="cargo"
            type="text"
            className={`bcf-input${errors.cargo ? ' error' : ''}`}
            value={form.cargo}
            onChange={handleChange}
          />
          {errors.cargo && <span className="bcf-error-text">{errors.cargo}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="irec-estado">
            Estado<span className="bcf-required">*</span>
          </label>
          <select
            id="irec-estado"
            name="estado"
            className="bcf-select"
            value={form.estado}
            onChange={handleChange}
          >
            {ESTADOS_BR.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="irec-objetivo">
            Qual o objetivo com os certificados I-REC?<span className="bcf-required">*</span>
          </label>
          <select
            id="irec-objetivo"
            name="objetivo"
            className={`bcf-select${errors.objetivo ? ' error' : ''}`}
            value={form.objetivo}
            onChange={handleChange}
          >
            <option value="">Selecione uma opção</option>
            <option value="ESG">Atender metas ESG / relatórios de sustentabilidade</option>
            <option value="Compliance">Compliance com clientes ou investidores</option>
            <option value="Escopo2">Neutralização de emissões (escopo 2)</option>
            <option value="Pesquisando">Apenas pesquisando no momento</option>
          </select>
          {errors.objetivo && <span className="bcf-error-text">{errors.objetivo}</span>}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="irec-fontePreferencia">
            Fonte de energia de preferência<span className="bcf-required">*</span>
          </label>
          <select
            id="irec-fontePreferencia"
            name="fontePreferencia"
            className={`bcf-select${errors.fontePreferencia ? ' error' : ''}`}
            value={form.fontePreferencia}
            onChange={handleChange}
          >
            <option value="">Selecione uma opção</option>
            <option value="Eolica">Eólica</option>
            <option value="Solar">Solar</option>
            <option value="Hidraulica">Hidráulica</option>
            <option value="SemPreferencia">Sem preferência</option>
          </select>
          {errors.fontePreferencia && (
            <span className="bcf-error-text">{errors.fontePreferencia}</span>
          )}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="irec-consumoMensalMwh">
            Consumo médio mensal de energia (MWh)<span className="bcf-required">*</span>
          </label>
          <input
            id="irec-consumoMensalMwh"
            name="consumoMensalMwh"
            type="number"
            min="0"
            step="0.01"
            className={`bcf-input${errors.consumoMensalMwh ? ' error' : ''}`}
            placeholder="Ex: 150"
            value={form.consumoMensalMwh}
            onChange={handleChange}
          />
          {errors.consumoMensalMwh && (
            <span className="bcf-error-text">{errors.consumoMensalMwh}</span>
          )}
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="irec-jaAdquire">
            Já adquire certificados hoje?<span className="bcf-required">*</span>
          </label>
          <select
            id="irec-jaAdquire"
            name="jaAdquire"
            className={`bcf-select${errors.jaAdquire ? ' error' : ''}`}
            value={form.jaAdquire}
            onChange={handleChange}
          >
            <option value="">Selecione uma opção</option>
            <option value="Sim">Sim</option>
            <option value="Nao">Não</option>
          </select>
          {errors.jaAdquire && <span className="bcf-error-text">{errors.jaAdquire}</span>}
        </div>
      </div>

      <div className="bcf-submit-wrap">
        <button type="submit" className="bcf-submit" disabled={loading}>
          {loading ? 'ENVIANDO...' : 'ENVIAR'}
        </button>
      </div>
    </form>
  )
}

export default FormularioIREC
