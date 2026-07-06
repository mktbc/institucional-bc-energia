import { RequestStatus } from '@/components/Form/Form.type'

import { InputProps } from '../Fields.type'
import { checkboxStyles, checkboxsWrapStyles } from './Checkbox.style'

const Checkbox = ({ status, ...rest }: InputProps) => (
  <div
    style={{ gridColumn: rest.configuration && rest.configuration?.columns === 1 ? '1 / -1' : '' }}
    className={checkboxsWrapStyles()}
  >
    <input
      {...rest}
      disabled={status === RequestStatus.Pending}
      id={rest.name}
      className={checkboxStyles()}
      placeholder={rest.placeholder}
      required={rest.required || undefined}
    />
    {rest.label && <label htmlFor={rest.name}>{rest.label}</label>}
    {rest.description && <div>{rest.description}</div>}
  </div>
)

export default Checkbox
