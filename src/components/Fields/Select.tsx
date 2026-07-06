import { RequestStatus } from '@/components/Form/Form.type'

import { styles } from './Fields.style'
import { InputProps } from './Fields.type'

const Select = ({ status, ...rest }: InputProps) => (
  <div
    style={{ gridColumn: rest.configuration && rest.configuration?.columns === 1 ? '1 / -1' : '' }}
  >
    <select
      required
      disabled={status === RequestStatus.Pending}
      className={`${styles.input} bg-white py-[0.63rem]`}
    >
      <option value="" disabled selected>
        {rest.placeholder}
      </option>
      {rest?.options?.map((state) => (
        <option key={state.value} value={state.value}>
          {state.label}
        </option>
      ))}
    </select>
  </div>
)

export default Select
