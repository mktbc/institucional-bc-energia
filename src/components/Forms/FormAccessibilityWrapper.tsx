import type { ReactNode } from 'react'

type ControlAttributes = {
  id: string
  'aria-invalid'?: true
  'aria-required'?: true
  'aria-describedby'?: string
}
type Props = {
  id: string
  label: ReactNode
  required?: boolean
  hint?: ReactNode
  error?: ReactNode
  describedBy?: string
  children: (attributes: ControlAttributes) => ReactNode
}

/** Presentation only: preserves the parent form and its validation/submit handlers. */
export default function FormAccessibilityWrapper({ id, label, required, hint, error, describedBy, children }: Props) {
  const hasHint = hint != null && hint !== ''
  const hasError = error != null && error !== ''
  const description = [describedBy, hasHint ? `${id}-hint` : undefined, hasError ? `${id}-error` : undefined].filter(Boolean).join(' ')
  return <div className="bcf-group">
    <label className="bcf-label" htmlFor={id}>{label}</label>
    {children({ id, 'aria-required': required ? true : undefined, 'aria-invalid': hasError ? true : undefined, 'aria-describedby': description || undefined })}
    {hasHint && <p id={`${id}-hint`} className="bcf-hint">{hint}</p>}
    {hasError && <span id={`${id}-error`} role="alert" aria-atomic="true" className="bcf-error-text">{error}</span>}
  </div>
}
