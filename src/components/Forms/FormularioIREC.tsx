import FormAccessibilityWrapper from './FormAccessibilityWrapper'
import { useEffect, useRef, useState } from 'react'

import './bc-form.css'

import { getSupabase } from '@/lib/supabase'
import { getFormUtms, useFormTracking } from '@/lib/analytics'

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

  // Tracking do formulário (form_start / form_error / form_submit + lead_generated)
  const { onFormStart, onValidationError, onSubmitError, onSubmitSuccess } =
    useFormTracking('irec')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFormStart()
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
    const invalidFields = Object.keys(newErrors)
    if (invalidFields.length > 0) onValidationError(invalidFields)
    return invalidFields.length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) {
      // Acessibilidade: leva o foco para o primeiro campo com erro
      window.setTimeout(() => {
        const first = document.querySelector<HTMLElement>(
          '.bc-form .bcf-input.error, .bc-form .bcf-select.error, .bc-form .bcf-textarea.error'
        )
        first?.focus()
        first?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }, 0)
      return
    }

    setLoading(true)
    setSubmitError(false)
    try {
      // Origem: URL atual > UTMs persistidas na sessão > padrão do site.
      const utms = getFormUtms(UTM_DEFAULTS)

      const payload = {
        ...form,
        whatsapp: form.whatsapp.replace(/\D/g, ''),
        ...utms,
        solucao,
        paginaOrigem: window.location.href,
        dataHoraEnvio: new Date().toISOString()
      }

      const { error } = await (await getSupabase()).functions.invoke('form-webhook', {
        body: payload
      })
      if (error) throw error

      setSuccess(true)
      onSubmitSuccess()
    } catch {
      setSubmitError(true)
      onSubmitError()
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div ref={successRef} className="mx-4 mb-6 rounded-lg bg-white p-8 text-center">
        <p className="t-h4 font-bold text-teal-700">Mensagem enviada com sucesso!</p>
        <p className="mt-2 text-gray-600">Em breve, um de nossos consultores entrará em contato.</p>
      </div>
    )
  }

  return (
    <form className="bc-form" onSubmit={handleSubmit} noValidate>
      {showIntro && <p className="bcf-intro">{introText}</p>}

      {submitError && (
        <p role="alert" className="mb-4 text-center t-label text-error">
          Ocorreu um erro ao enviar. Por favor, tente novamente ou fale conosco pelo WhatsApp.
        </p>
      )}

      <div className="bcf-row">
        <FormAccessibilityWrapper id="irec-nome" label={<>
            Nome completo<span className="bcf-required">*</span>
          </>} required error={errors.nome}>
          {attributes => (<input
            {...attributes}
            name="nome"
            type="text"
            className={`bcf-input${errors.nome ? ' error' : ''}`}
            value={form.nome}
            onChange={handleChange}
          />)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="irec-email" label={<>
            E-mail corporativo<span className="bcf-required">*</span>
          </>} required error={errors.email}>
          {attributes => (<input
            {...attributes}
            name="email"
            type="email"
            className={`bcf-input${errors.email ? ' error' : ''}`}
            value={form.email}
            onChange={handleChange}
          />)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="irec-whatsapp" label={<>
            WhatsApp<span className="bcf-required">*</span>
          </>} required error={errors.whatsapp}>
          {attributes => (<input
            {...attributes}
            name="whatsapp"
            type="tel"
            className={`bcf-input${errors.whatsapp ? ' error' : ''}`}
            placeholder="(XX) XXXXX-XXXX"
            value={form.whatsapp}
            onChange={handleChange}
          />)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="irec-empresa" label={<>
            Empresa<span className="bcf-required">*</span>
          </>} required error={errors.empresa}>
          {attributes => (<input
            {...attributes}
            name="empresa"
            type="text"
            className={`bcf-input${errors.empresa ? ' error' : ''}`}
            value={form.empresa}
            onChange={handleChange}
          />)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="irec-cnpj" label={<>
            CNPJ<span className="bcf-required">*</span>
          </>} required error={errors.cnpj}>
          {attributes => (<input
            {...attributes}
            name="cnpj"
            type="text"
            className={`bcf-input${errors.cnpj ? ' error' : ''}`}
            placeholder="XX.XXX.XXX/XXXX-XX"
            value={form.cnpj}
            onChange={handleChange}
          />)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="irec-cargo" label={<>
            Cargo<span className="bcf-required">*</span>
          </>} required error={errors.cargo}>
          {attributes => (<input
            {...attributes}
            name="cargo"
            type="text"
            className={`bcf-input${errors.cargo ? ' error' : ''}`}
            value={form.cargo}
            onChange={handleChange}
          />)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="irec-estado" label={<>
            Estado<span className="bcf-required">*</span>
          </>} required error={errors.estado}>
          {attributes => (<select
            {...attributes}
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
          </select>)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="irec-objetivo" label={<>
            Qual o objetivo com os certificados I-REC?<span className="bcf-required">*</span>
          </>} required error={errors.objetivo}>
          {attributes => (<select
            {...attributes}
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
          </select>)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="irec-fontePreferencia" label={<>
            Fonte de energia de preferência<span className="bcf-required">*</span>
          </>} required error={errors.fontePreferencia}>
          {attributes => (<select
            {...attributes}
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
          </select>)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="irec-consumoMensalMwh" label={<>
            Consumo médio mensal de energia (MWh)<span className="bcf-required">*</span>
          </>} required error={errors.consumoMensalMwh}>
          {attributes => (<input
            {...attributes}
            name="consumoMensalMwh"
            type="number"
            min="0"
            step="0.01"
            className={`bcf-input${errors.consumoMensalMwh ? ' error' : ''}`}
            placeholder="Ex: 150"
            value={form.consumoMensalMwh}
            onChange={handleChange}
          />)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="irec-jaAdquire" label={<>
            Já adquire certificados hoje?<span className="bcf-required">*</span>
          </>} required error={errors.jaAdquire}>
          {attributes => (<select
            {...attributes}
            name="jaAdquire"
            className={`bcf-select${errors.jaAdquire ? ' error' : ''}`}
            value={form.jaAdquire}
            onChange={handleChange}
          >
            <option value="">Selecione uma opção</option>
            <option value="Sim">Sim</option>
            <option value="Nao">Não</option>
          </select>)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-submit-wrap">
        <button type="submit" className="bcf-submit" disabled={loading} aria-busy={loading} data-cta-location="form">
          {loading ? 'ENVIANDO...' : 'ENVIAR'}
        </button>
      </div>
    </form>
  )
}

export default FormularioIREC
