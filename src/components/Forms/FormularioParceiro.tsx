import { useEffect, useRef, useState } from 'react'

import './bc-form.css'

import { INTEGRATIONS } from '@/config/integrations'

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

// TODO: TI reconectar endpoint de envio de formularios (antes: /api/form -> N8N_WEBHOOK_URL)
const FORM_API = INTEGRATIONS.FORM_WEBHOOK_URL

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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

      const res = await fetch(FORM_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

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
          <label className="bcf-label" htmlFor="par-nome">
            Nome<span className="bcf-required">*</span>
          </label>
          <input
            id="par-nome"
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
          <label className="bcf-label" htmlFor="par-email">
            Email<span className="bcf-required">*</span>
          </label>
          <input
            id="par-email"
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
          <label className="bcf-label" htmlFor="par-whatsapp">
            Telefone<span className="bcf-required">*</span>
          </label>
          <input
            id="par-whatsapp"
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
          <label className="bcf-label" htmlFor="par-estado">
            Estado<span className="bcf-required">*</span>
          </label>
          <select
            id="par-estado"
            name="estado"
            className="bcf-select"
            value={form.estado}
            onChange={handleChange}
          >
            <option value="GO">Goiás (GO)</option>
            <option value="TO">Tocantins (TO)</option>
            <option value="MG">Minas Gerais (MG)</option>
            <option value="MT">Mato Grosso (MT)</option>
          </select>
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="par-distribuidora">
            Distribuidora<span className="bcf-required">*</span>
          </label>
          <select
            id="par-distribuidora"
            name="distribuidora"
            className="bcf-select"
            value={form.distribuidora}
            onChange={handleChange}
          >
            <option value="Equatorial">Equatorial</option>
            <option value="Energisa">Energisa</option>
            <option value="Cemig">Cemig</option>
            <option value="Outra">Outra</option>
          </select>
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="par-potencia">
            Potência da usina<span className="bcf-required">*</span>
          </label>
          <select
            id="par-potencia"
            name="potencia"
            className="bcf-select"
            value={form.potencia}
            onChange={handleChange}
          >
            <option value="Menor que 10 kWp">Menor que 10 kWp</option>
            <option value="10 a 75 kWp">10 a 75 kWp</option>
            <option value="75 a 500 kWp">75 a 500 kWp</option>
            <option value="Maior que 500 kWp">Maior que 500 kWp</option>
          </select>
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="par-status">
            Status da usina<span className="bcf-required">*</span>
          </label>
          <select
            id="par-status"
            name="status"
            className="bcf-select"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Em operação">Em operação</option>
            <option value="Em construção">Em construção</option>
            <option value="Em projeto">Em projeto</option>
          </select>
        </div>
      </div>

      <div className="bcf-row">
        <div className="bcf-group">
          <label className="bcf-label" htmlFor="par-observacoes">
            Observações (opcional)
          </label>
          <textarea
            id="par-observacoes"
            name="observacoes"
            className="bcf-textarea"
            value={form.observacoes}
            onChange={handleChange}
          />
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

export default FormularioParceiro
