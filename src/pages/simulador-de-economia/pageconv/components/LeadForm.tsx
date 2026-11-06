import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, CheckCircle2, UploadCloud, FileText, AlertCircle } from "lucide-react";
import { Input } from "@pageconv/components/ui/input";
import { Label } from "@pageconv/components/ui/label";
import { Checkbox } from "@pageconv/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@pageconv/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@pageconv/components/ui/select";
import { cn } from "@pageconv/lib/utils";
import { runExclusiveSubmission } from "@pageconv/lib/submission-lock";
import { crmConfirmou, submissionErrorMessage, type SubmissionFailure } from "@pageconv/lib/submission-error";
import { LEAD_ORIGIN, resolveCaptureEndpoint } from "@pageconv/lib/lead-config";
import { DEFAULT_UTMS } from "@/helpers/utm";
import { trackFormError, trackLead } from "@/lib/analytics";

// `window.dataLayer` já é declarado globalmente pelo site (src/lib/analytics/dataLayer.ts).


// ============================================================================
// Site institucional: o endpoint deixou de ser fixo (o da PageConv era
// https://hook-gd.grupobcenergia.com.br/webhook/capture-fatura). A URL do
// workflow n8n próprio do simulador vem do ambiente — ver lib/lead-config.ts.
// Sem URL configurada: em desenvolvimento roda em modo MOCK (só loga o payload);
// em produção o envio é bloqueado com mensagem de erro, sem perder dados.
// ============================================================================


// FLAG DE VERSÃO — alternar entre as duas LPs do brief.
// true  -> mostra o campo de upload da fatura
// false -> esconde o upload e ajusta o texto do CTA
const COM_UPLOAD = true;

// FLAG TEMPORÁRIA — enquanto o n8n não aceita multipart/binary (retorna HTTP 500
// "Workflow execution failed"), enviamos direto em JSON com metadados da fatura.
// Quando o workflow do n8n for corrigido para aceitar upload binário, basta
// voltar esta flag para `true` que a 1ª tentativa multipart volta a rodar
// (o fallback JSON continua garantindo que nenhum lead se perca).
const TENTAR_MULTIPART = false;

const MAX_FILE_MB = 10;
const ACCEPTED = ".pdf,.jpg,.jpeg,.png";
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];


const VALOR_OPTIONS = [
  "A partir de R$ 800",
  "R$ 800 a R$ 1.200",
  "R$ 1.200 a R$ 2.000",
  "R$ 2.000 a R$ 5.000",
  "Acima de R$ 5.000",
];

const TIPO_OPTIONS = ["Residencial", "Comercial", "Industrial"];

const ESTADO_OPTIONS = ["GO", "TO", "PR", "MG", "MT"];

const ESTADO_LABELS: Record<string, string> = {
  GO: "Goiás",
  TO: "Tocantins",
  PR: "Paraná",
  MG: "Minas Gerais",
  MT: "Mato Grosso",
};

const REGION_BY_ESTADO: Record<string, string> = {
  GO: "Goias",
  TO: "Tocantins",
  PR: "Parana",
  MG: "Minas Gerais",
  MT: "Centro-Oeste",
};

const sanitizeParam = (value: string | null | undefined) => {
  if (!value) return "";
  return String(value)
    .replace(/[{}]/g, "")
    .replace(/[<>"]/g, "")
    .trim()
    .slice(0, 255);
};

// UTMs padrão: as do site institucional (src/helpers/utm.ts), não as da PageConv.

function getTrackingParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);

  const urlKeys = Array.from(params.keys());
  const hasAnyUtm = urlKeys.some((key) => key.startsWith("utm_"));
  const defaultOrParam = (key: string) =>
    hasAnyUtm ? sanitizeParam(params.get(key)) : DEFAULT_UTMS[key] || sanitizeParam(params.get(key));

  return {
    utm_source: defaultOrParam("utm_source"),
    utm_medium: defaultOrParam("utm_medium"),
    utm_font: defaultOrParam("utm_font"),
    utm_channel: defaultOrParam("utm_channel"),
    utm_placement: sanitizeParam(params.get("utm_placement")),
    utm_campaign_code: defaultOrParam("utm_campaign_code"),
    utm_campaign: sanitizeParam(params.get("utm_campaign")),
    utm_campaign_id: sanitizeParam(params.get("utm_campaign_id")),
    utm_link_id: sanitizeParam(params.get("utm_link_id")),
    utm_adcampaign: sanitizeParam(params.get("utm_adcampaign")),
    utm_adcampaign_id: sanitizeParam(params.get("utm_adcampaign_id")),
    utm_adgroup: sanitizeParam(params.get("utm_adgroup")),
    utm_adgroup_id: sanitizeParam(params.get("utm_adgroup_id")),
    utm_adset: sanitizeParam(params.get("utm_adset")),
    utm_adset_id: sanitizeParam(params.get("utm_adset_id")),
    utm_content: sanitizeParam(params.get("utm_content")),
    utm_content_id: sanitizeParam(params.get("utm_content_id")),
    utm_term: sanitizeParam(params.get("utm_term")),
    utm_originator: sanitizeParam(params.get("utm_originator")),
    utm_seller: sanitizeParam(params.get("utm_seller")),
    utm_project_id: sanitizeParam(params.get("utm_project_id")),
    utm_product: defaultOrParam("utm_product"),
    utm_segment: defaultOrParam("utm_segment"),
    utm_public: sanitizeParam(params.get("utm_public")),
    utm_city: sanitizeParam(params.get("utm_city")),
    // utm_region e utm_state são preenchidos pelo formulário, não pela URL
    utm_offer: sanitizeParam(params.get("utm_offer")),
    utm_objective: sanitizeParam(params.get("utm_objective")),
    utm_contract: defaultOrParam("utm_contract"),
    utm_lp: defaultOrParam("utm_lp"),
    utm_id: sanitizeParam(params.get("utm_id")),
    gclid: sanitizeParam(params.get("gclid")),
    page_url: window.location.origin + window.location.pathname,
    page_url_full: sanitizeParam(window.location.href),
    page_path: window.location.pathname,
    origem_site: LEAD_ORIGIN.origem_site,
    origem_pagina: LEAD_ORIGIN.origem_pagina,
    origem_formulario: LEAD_ORIGIN.origem_formulario,
    form_name: LEAD_ORIGIN.form_name,
    // Sem utm_source real: origem padrão do site (nunca "GoogleAds" presumido).
    lead_source: sanitizeParam(params.get("utm_source")) || DEFAULT_UTMS.utm_source,
    created_at: new Date().toISOString(),
  };
}

type Status = "idle" | "enviando" | "sucesso" | "erro";

type FormState = {
  nome: string;
  whatsapp: string;
  email: string;
  estado: string;
  valor: string;
  tipo: string;
  titular: string;
  lgpd: boolean;
  fatura: File | null;
};

const initialState: FormState = {
  nome: "",
  whatsapp: "",
  email: "",
  estado: "",
  valor: "",
  tipo: "",
  titular: "",
  lgpd: false,
  fatura: null,
};

// Lê o arquivo e devolve apenas o conteúdo base64 (sem o prefixo "data:...;base64,").
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      if (!base64) reject(new Error("Arquivo vazio após leitura"));
      else resolve(base64);
    };
    reader.onerror = () => reject(reader.error || new Error("Falha ao ler arquivo"));
    reader.readAsDataURL(file);
  });
}

function maskWhatsapp(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.replace(/^(\d{0,2})/, "($1");
  if (d.length <= 7) return d.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  return d.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

export function LeadForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submissionError, setSubmissionError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quando a visita chega sem nenhuma UTM, grava as UTMs de fallback na URL
  // (sem recarregar a página) para que fiquem visíveis e compartilháveis.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const hasAnyUtm = Array.from(params.keys()).some((key) => key.startsWith("utm_"));
    if (hasAnyUtm) return;
    let changed = false;
    for (const [key, value] of Object.entries(DEFAULT_UTMS)) {
      if (!params.has(key)) {
        params.set(key, value);
        changed = true;
      }
    }
    if (changed) {
      const query = params.toString();
      const newUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, []);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome.";
    if (form.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "Informe um WhatsApp válido.";
    const emailTrimmed = form.email.trim();
    // E-mail opcional: só valida o formato quando houver algo preenchido.
    if (emailTrimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      e.email = "Informe um e-mail válido.";
    }
    if (!form.estado) e.estado = "Selecione o estado.";
    if (!form.valor) e.valor = "Selecione o valor da conta.";
    if (!form.tipo) e.tipo = "Selecione o tipo de conta.";
    if (!form.titular) e.titular = "Selecione uma opção.";
    if (!form.lgpd) e.lgpd = "É necessário autorizar o contato.";
    if (COM_UPLOAD && !form.fatura) {
      e.fatura = "Anexe sua fatura de energia para continuar.";
    } else if (COM_UPLOAD && form.fatura) {
      if (form.fatura.size > MAX_FILE_MB * 1024 * 1024) {
        e.fatura = `Arquivo acima de ${MAX_FILE_MB} MB.`;
      } else if (form.fatura.type && !ACCEPTED_TYPES.includes(form.fatura.type)) {
        e.fatura = "Formato não aceito. Use PDF, JPG ou PNG.";
      }
    }
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const markTouched = (key: string) => setTouched((prev) => ({ ...prev, [key]: true }));

  const showError = (key: keyof FormState) => touched[key] && errors[key];

  const handleFile = (file: File | null) => {
    markTouched("fatura");
    setField("fatura", file);
  };

  const submittingRef = useRef(false);
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    await runExclusiveSubmission(submittingRef, () => doSubmit(e));
  };
  const doSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setTouched({
      nome: true,
      whatsapp: true,
      email: true,
      estado: true,
      valor: true,
      tipo: true,
      titular: true,
      lgpd: true,
      fatura: true,
    });
    // Log temporário de diagnóstico
    console.log("[LeadForm] validação:", { isValid, errors });
    if (!isValid) return;

    setStatus("enviando");
    setSubmissionError("");
    const failSubmission = (failure: SubmissionFailure, httpStatus?: number) => {
      setSubmissionError(submissionErrorMessage(failure, httpStatus));
      setStatus("erro");
      trackFormError({ form_name: LEAD_ORIGIN.form_name, error_type: "submission" });
    };

    const CAPTURE_ENDPOINT = await resolveCaptureEndpoint();
    const isMock = !CAPTURE_ENDPOINT && import.meta.env.DEV;
    if (!CAPTURE_ENDPOINT && !isMock) {
      console.error("[LeadForm] webhook do simulador não configurado (VITE_SIMULADOR_WEBHOOK_URL / app_config SIMULADOR_WEBHOOK_URL).");
      failSubmission("not_configured");
      return;
    }

    const tracking = getTrackingParams();
    const payload = new FormData();

    // Campos principais do formulário
    payload.append("nome", form.nome.trim());
    payload.append("whatsapp", form.whatsapp);
    payload.append("telefone_sf", form.whatsapp);
    payload.append("email", form.email?.trim() || "");
    payload.append("email_sf", form.email?.trim() || "");
    payload.append("estado", form.estado);
    payload.append("cidade", "");
    payload.append("valor_conta", form.valor);
    payload.append("tipo", form.tipo);
    payload.append("titular", form.titular);
    payload.append("lgpd", String(form.lgpd));

    // Campos de tracking/UTM
    Object.entries(tracking).forEach(([key, value]) => {
      payload.append(key, value ?? "");
    });

    // Fallback de utm_adset / utm_adset_id
    payload.append("utm_adset", tracking.utm_adset || tracking.utm_adgroup || "");
    payload.append("utm_adset_id", tracking.utm_adset_id || tracking.utm_adgroup_id || "");

    // Estado e região vêm sempre do Estado selecionado no formulário
    const estado = form.estado;
    payload.append("utm_state", estado);
    payload.append("utm_region", REGION_BY_ESTADO[estado] || "");

    // Fatura como arquivo binário quando anexada
    if (COM_UPLOAD && form.fatura) {
      payload.append("fatura", form.fatura, form.fatura.name);
      payload.append("fatura_anexada", "true");
      payload.append("fatura_nome", sanitizeParam(form.fatura.name));
      payload.append("fatura_tipo", sanitizeParam(form.fatura.type));
      payload.append("fatura_tamanho", String(form.fatura.size));
    } else {
      payload.append("fatura_anexada", "false");
      payload.append("fatura_nome", "");
      payload.append("fatura_tipo", "");
      payload.append("fatura_tamanho", "");
    }



    // Evento de conversão do site (form_submit + lead_generated com atribuição),
    // no lugar de "pageconv_form_submit".
    const pushDataLayer = () => trackLead({ form_name: LEAD_ORIGIN.form_name });

    const finalizeSuccess = () => {
      pushDataLayer();
      setForm(initialState);
      setTouched({});
      if (fileInputRef.current) fileInputRef.current.value = "";
      setStatus("sucesso");
    };

    // Log temporário: extrai e registra o lead_id retornado pelo Salesforce
    const logLeadId = (responseText: string, tentativa: number) => {
      try {
        const data = JSON.parse(responseText);
        console.log(`[LeadForm] lead_id (tentativa ${tentativa}):`, data?.lead_id ?? "(não retornado)");
      } catch {
        console.log(`[LeadForm] lead_id (tentativa ${tentativa}): resposta não-JSON:`, responseText);
      }
    };

    if (isMock) {
      // Modo mock: backend ainda não conectado.
      console.log("[LeadForm mock] payload FormData:", Object.fromEntries(payload.entries()));
      await new Promise((r) => setTimeout(r, 800));
      pushDataLayer();
      setStatus("sucesso");
      return;
    }

    console.log("[LeadForm] endpoint:", CAPTURE_ENDPOINT);

    // ---------- Tentativa 1: multipart/form-data com upload binário ----------
    // Só é executada quando TENTAR_MULTIPART = true. Enquanto o n8n não aceita
    // multipart/binary, pulamos direto para o envio JSON com metadados da fatura.
    if (TENTAR_MULTIPART) {
      console.log("[LeadForm] tentativa 1 - multipart com upload");
      try {
        const res = await fetch(CAPTURE_ENDPOINT, {
          method: "POST",
          body: payload,
        });
        const responseText = await res.text();
        console.log("[LeadForm] resposta tentativa 1:", res.status, responseText);

        if (res.ok && crmConfirmou(responseText)) {
          logLeadId(responseText, 1);
          finalizeSuccess();
          return;
        }

        console.warn("[LeadForm] tentativa com upload falhou:", { status: res.status });
        failSubmission(res.ok ? "unconfirmed" : "http", res.status);
      } catch (err) {
        console.warn("[LeadForm] tentativa com upload falhou:", err);
        failSubmission("network");
      }
      // Envio somente via multipart: sem fallback JSON, para não perder o arquivo.
      console.error("[LeadForm] envio multipart falhou — recebimento não confirmado.");
      return;
    }

    // ---------- Conversão da fatura para base64 (antes do POST) ----------
    let faturaBase64 = "";
    if (COM_UPLOAD && form.fatura) {
      try {
        faturaBase64 = await fileToBase64(form.fatura);
        console.log("[LeadForm] fatura convertida para base64:", {
          fatura_nome: form.fatura.name,
          fatura_tipo: form.fatura.type,
          fatura_tamanho: form.fatura.size,
          base64_length: faturaBase64.length,
        });
      } catch (err) {
        console.error("[LeadForm] falha ao processar a fatura antes do envio:", err);
        failSubmission("file_read");
        return;
      }
    }

    // ---------- Tentativa 2: JSON com a fatura em base64 ----------
    console.log("[LeadForm] tentativa 2 - JSON com fatura em base64");

    const fallbackPayload = {
      nome: form.nome.trim(),
      whatsapp: form.whatsapp,
      telefone_sf: form.whatsapp,
      email: form.email?.trim() || "",
      email_sf: form.email?.trim() || "",
      estado: form.estado,
      cidade: "",
      valor_conta: form.valor,
      tipo: form.tipo,
      titular: form.titular,
      lgpd: String(form.lgpd),
      // `fatura` continua no contrato (compatibilidade com a PageConv), mas vazio:
      // repetir o base64 dobrava o corpo (~28 MB para uma fatura de 10 MB),
      // acima do limite padrão do n8n (16 MB). O conteúdo vai em `fatura_base64`.
      fatura: "",
      fatura_base64: faturaBase64,
      fatura_anexada: COM_UPLOAD && !!form.fatura ? "true" : "false",
      fatura_nome: COM_UPLOAD && form.fatura ? sanitizeParam(form.fatura.name) : "",
      fatura_tipo: COM_UPLOAD && form.fatura ? sanitizeParam(form.fatura.type) : "",
      fatura_tamanho: COM_UPLOAD && form.fatura ? String(form.fatura.size) : "",
      ...tracking,
      utm_adset: tracking.utm_adset || tracking.utm_adgroup || "",
      utm_adset_id: tracking.utm_adset_id || tracking.utm_adgroup_id || "",
      utm_state: form.estado,
      utm_region: REGION_BY_ESTADO[form.estado] || "",
    };

    try {
      const fallbackRes = await fetch(CAPTURE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fallbackPayload),
      });
      const fallbackText = await fallbackRes.text();
      console.log("[LeadForm] resposta tentativa 2:", fallbackRes.status, fallbackText);

      if (fallbackRes.ok && crmConfirmou(fallbackText)) {
        logLeadId(fallbackText, 2);
        finalizeSuccess();
        return;
      }

      console.error("[LeadForm] tentativa 2 falhou:", {
        status: fallbackRes.status,
      });
      failSubmission(fallbackRes.ok ? "unconfirmed" : "http", fallbackRes.status);
    } catch (err) {
      console.error("[LeadForm] tentativa 2 falhou:", err);
      failSubmission("network");
    }
  };

  const ctaLabel = COM_UPLOAD
    ? "Enviar minha fatura para análise gratuita"
    : "Solicitar análise gratuita";

  if (status === "sucesso") {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-xl sm:p-10">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-teal" strokeWidth={1.75} />
        <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-brand-navy">
          Recebemos sua fatura!
        </h3>
        <p className="mt-3 text-muted-foreground">
          Nossa equipe vai te chamar no WhatsApp com a sua análise gratuita.
        </p>
      </div>
    );
  }

  const enviando = status === "enviando";

  return (
    <form
      className="pageconv rounded-[24px] border border-white/60 bg-[rgba(255,255,255,0.97)] p-7 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.65)] backdrop-blur-sm sm:p-8"
      onSubmit={handleSubmit}
    >
      <h3 className="font-display text-[27px] font-bold uppercase leading-[1.05] tracking-tight text-brand-navy sm:text-[30px]">
        Análise gratuita da sua fatura
      </h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
        Preencha os dados e descubra quanto você pode economizar.
      </p>

      <div className="mt-6 space-y-[18px] [&_input]:h-12 [&_input]:text-base [&_label]:text-[13.5px] [&_label]:font-medium [&_label]:text-brand-navy [&_button[role=combobox]]:h-12 [&_button[role=combobox]]:text-base">

        {/* Nome */}
        <div className="space-y-1.5">
          <Label htmlFor="lf-nome">Nome</Label>
          <Input
            id="lf-nome"
            name="name"
            autoComplete="name"
            value={form.nome}
            onChange={(e) => setField("nome", e.target.value)}
            onBlur={() => markTouched("nome")}
            aria-invalid={!!showError("nome")}
            placeholder="Seu nome completo"
          />
          {showError("nome") && <FieldError msg={errors.nome!} />}
        </div>

        {/* WhatsApp */}
        <div className="space-y-1.5">
          <Label htmlFor="lf-whatsapp">WhatsApp</Label>
          <Input
            id="lf-whatsapp"
            type="tel"
            inputMode="numeric"
            name="tel"
            autoComplete="tel-national"
            value={form.whatsapp}
            onChange={(e) => setField("whatsapp", maskWhatsapp(e.target.value))}
            onBlur={() => markTouched("whatsapp")}
            aria-invalid={!!showError("whatsapp")}
            placeholder="(00) 00000-0000"
          />
          {showError("whatsapp") && <FieldError msg={errors.whatsapp!} />}
        </div>

        {/* E-mail */}
        <div className="space-y-1.5">
          <Label htmlFor="lf-email">E-mail</Label>
          <Input
            id="lf-email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => markTouched("email")}
            aria-invalid={!!showError("email")}
            placeholder="seuemail@exemplo.com"
          />
          {showError("email") && <FieldError msg={errors.email!} />}
        </div>

        {/* Estado */}
        <div className="space-y-1.5">
          <Label htmlFor="lf-estado">Estado</Label>
          <Select
            value={form.estado}
            onValueChange={(v) => {
              setField("estado", v);
              markTouched("estado");
            }}
          >
            <SelectTrigger id="lf-estado" aria-invalid={!!showError("estado")}>
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent>
              {ESTADO_OPTIONS.map((o) => (
                <SelectItem key={o} value={o}>
                  {ESTADO_LABELS[o] || o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showError("estado") && <FieldError msg={errors.estado!} />}
        </div>

        {/* Valor médio da conta */}
        <div className="space-y-1.5">
          <Label htmlFor="lf-valor">Valor médio da conta de luz</Label>
          <Select
            value={form.valor}
            onValueChange={(v) => {
              setField("valor", v);
              markTouched("valor");
            }}
          >
            <SelectTrigger id="lf-valor" aria-invalid={!!showError("valor")}>
              <SelectValue placeholder="Selecione uma faixa" />
            </SelectTrigger>
            <SelectContent>
              {VALOR_OPTIONS.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showError("valor") && <FieldError msg={errors.valor!} />}
        </div>

        {/* Tipo de conta */}
        <div className="space-y-1.5">
          <Label htmlFor="lf-tipo">Tipo de conta</Label>
          <Select
            value={form.tipo}
            onValueChange={(v) => {
              setField("tipo", v);
              markTouched("tipo");
            }}
          >
            <SelectTrigger id="lf-tipo" aria-invalid={!!showError("tipo")}>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {TIPO_OPTIONS.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showError("tipo") && <FieldError msg={errors.tipo!} />}
        </div>

        {/* Upload da fatura */}
        {COM_UPLOAD && (
          <div className="space-y-1.5">
            <Label htmlFor="lf-fatura">Upload da fatura de energia</Label>
            <input
              ref={fileInputRef}
              id="lf-fatura"
              type="file"
              accept={ACCEPTED}
              className="sr-only"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex w-full items-center gap-3 rounded-md border border-dashed px-4 py-3 text-left text-sm transition-colors hover:bg-brand-gray/30",
                showError("fatura") ? "border-destructive" : "border-input",
              )}
            >
              {form.fatura ? (
                <>
                  <FileText className="h-5 w-5 shrink-0 text-brand-teal" />
                  <span className="truncate text-brand-navy">{form.fatura.name}</span>
                </>
              ) : (
                <>
                  <UploadCloud className="h-5 w-5 shrink-0 text-brand-teal" />
                  <span className="text-muted-foreground">
                    PDF, JPG ou PNG até {MAX_FILE_MB} MB
                  </span>
                </>
              )}
            </button>
            {showError("fatura") && <FieldError msg={errors.fatura!} />}
          </div>
        )}

        {/* Titular / responsável */}
        <div className="space-y-2">
          <Label>Você é titular ou responsável pela conta?</Label>
          <RadioGroup
            className="flex gap-6"
            value={form.titular}
            onValueChange={(v) => {
              setField("titular", v);
              markTouched("titular");
            }}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Sim" id="lf-titular-sim" />
              <Label htmlFor="lf-titular-sim" className="font-normal">
                Sim
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Não" id="lf-titular-nao" />
              <Label htmlFor="lf-titular-nao" className="font-normal">
                Não
              </Label>
            </div>
          </RadioGroup>
          {showError("titular") && <FieldError msg={errors.titular!} />}
        </div>

        {/* LGPD */}
        <div className="space-y-1.5">
          <div className="flex items-start gap-3">
            <Checkbox
              id="lf-lgpd"
              checked={form.lgpd}
              onCheckedChange={(c) => {
                setField("lgpd", c === true);
                markTouched("lgpd");
              }}
              aria-invalid={!!showError("lgpd")}
              className="mt-0.5"
            />
            <Label htmlFor="lf-lgpd" className="text-xs font-normal leading-relaxed text-muted-foreground">
              Autorizo o contato do Grupo BC Energia e o uso dos meus dados para análise da minha
              conta, conforme a nossa{" "}
              <span className="font-medium text-brand-teal">Política de Privacidade</span>.
            </Label>
          </div>
          {showError("lgpd") && <FieldError msg={errors.lgpd!} />}
        </div>

        {status === "erro" && (
          <div role="alert" className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {submissionError}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || enviando}
          className={cn(
            "mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-brand-teal px-6 py-[17px] font-sans text-[16px] font-semibold tracking-normal text-white shadow-[0_16px_34px_-18px_rgba(24,133,125,0.9)] transition-all hover:bg-brand-teal-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal active:scale-[0.99]",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >

          {enviando && <Loader2 className="h-5 w-5 animate-spin" />}
          {enviando ? "Enviando..." : ctaLabel}
        </button>
      </div>
    </form>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="flex items-center gap-1 text-xs text-destructive" role="alert">
      <AlertCircle className="h-3.5 w-3.5" />
      {msg}
    </p>
  );
}
