import { RequestStatus } from '@/components/Form/Form.type'

import { styles } from './Fields.style'
import { InputProps } from './Fields.type'

const Input = ({ status, ...rest }: InputProps) => (
  <div
    style={{ gridColumn: rest.configuration && rest.configuration?.columns === 1 ? '1 / -1' : '' }}
  >
    <input
      {...rest}
      disabled={status === RequestStatus.Pending}
      className={styles.input}
      placeholder={rest.placeholder}
      required={rest.required || undefined}
    />
  </div>
)

export default Input
