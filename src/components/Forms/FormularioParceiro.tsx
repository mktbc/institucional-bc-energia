import FormAccessibilityWrapper from './FormAccessibilityWrapper'
import { useEffect, useRef, useState } from 'react'

import './bc-form.css'

import { getSupabase } from '@/lib/supabase'
import { getFormUtms, useFormTracking } from '@/lib/analytics'

type FormState = {
  nome: string
  email: string
  whatsapp: string
  estado: string
  distribuidora: string
  potencia: string
  status: string
  observacoes: string
}

type FormErrors = Partial<Record<keyof FormState, string | null>>

interface FormularioParceiroProps {
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

// Envio via Edge Function `form-webhook` (Supabase). A URL do N8N fica no
// secret FORM_WEBHOOK_URL configurado no Dashboard do Supabase.

const FormularioParceiro = ({
  solucao = 'arrendamento',
  showIntro = false,
  introText = 'Preencha o formulário abaixo e um de nossos consultores entrará em contato para fornecer mais informações e ajudar você a iniciar essa parceria vantajosa!'
}: FormularioParceiroProps) => {
  const [form, setForm] = useState<FormState>({
    nome: '',
    email: '',
    whatsapp: '',
    estado: 'GO',
    distribuidora: 'Equatorial',
    potencia: 'Menor que 10 kWp',
    status: 'Em operação',
    observacoes: ''
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
    useFormTracking('parceiro')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
    if (!form.whatsapp.trim()) newErrors.whatsapp = 'Preencha este campo.'
    if (!form.email.trim()) newErrors.email = 'Preencha este campo.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'E-mail inválido.'
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
      <div ref={successRef} className="mx-4 mb-6 rounded-card border border-border-subtle bg-surface-card p-8 text-center">
        <p className="t-h4 font-bold text-bc-primary">Mensagem enviada com sucesso!</p>
        <p className="mt-2 t-body text-text-secondary">Em breve, um de nossos consultores entrará em contato.</p>
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
        <FormAccessibilityWrapper id="par-nome" label={<>
            Nome<span className="bcf-required">*</span>
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
        <FormAccessibilityWrapper id="par-email" label={<>
            Email<span className="bcf-required">*</span>
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
        <FormAccessibilityWrapper id="par-whatsapp" label={<>
            Telefone<span className="bcf-required">*</span>
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
        <FormAccessibilityWrapper id="par-estado" label={<>
            Estado<span className="bcf-required">*</span>
          </>} required error={errors.estado}>
          {attributes => (<select
            {...attributes}
            name="estado"
            className="bcf-select"
            value={form.estado}
            onChange={handleChange}
          >
            <option value="GO">Goiás (GO)</option>
            <option value="TO">Tocantins (TO)</option>
            <option value="MG">Minas Gerais (MG)</option>
            <option value="MT">Mato Grosso (MT)</option>
          </select>)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="par-distribuidora" label={<>
            Distribuidora<span className="bcf-required">*</span>
          </>} required error={errors.distribuidora}>
          {attributes => (<select
            {...attributes}
            name="distribuidora"
            className="bcf-select"
            value={form.distribuidora}
            onChange={handleChange}
          >
            <option value="Equatorial">Equatorial</option>
            <option value="Energisa">Energisa</option>
            <option value="Cemig">Cemig</option>
            <option value="Outra">Outra</option>
          </select>)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="par-potencia" label={<>
            Potência da usina<span className="bcf-required">*</span>
          </>} required error={errors.potencia}>
          {attributes => (<select
            {...attributes}
            name="potencia"
            className="bcf-select"
            value={form.potencia}
            onChange={handleChange}
          >
            <option value="Menor que 10 kWp">Menor que 10 kWp</option>
            <option value="10 a 75 kWp">10 a 75 kWp</option>
            <option value="75 a 500 kWp">75 a 500 kWp</option>
            <option value="Maior que 500 kWp">Maior que 500 kWp</option>
          </select>)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="par-status" label={<>
            Status da usina<span className="bcf-required">*</span>
          </>} required error={errors.status}>
          {attributes => (<select
            {...attributes}
            name="status"
            className="bcf-select"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Em operação">Em operação</option>
            <option value="Em construção">Em construção</option>
            <option value="Em projeto">Em projeto</option>
          </select>)}
        </FormAccessibilityWrapper>
      </div>

      <div className="bcf-row">
        <FormAccessibilityWrapper id="par-observacoes" label={<>
            Observações (opcional)
          </>} error={errors.observacoes}>
          {attributes => (<textarea
            {...attributes}
            name="observacoes"
            className="bcf-textarea"
            value={form.observacoes}
            onChange={handleChange}
          />)}
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

export default FormularioParceiro
