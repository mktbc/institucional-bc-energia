import { buttonStyles } from '@/components/Button/Button.style'

import { ButtonProps } from './Button.type'

const Button = ({
  children,
  variant,
  outline,
  block,
  size = 'md',
  className,
  disabled
}: ButtonProps) => (
  <div>
    <button
      disabled={disabled}
      className={`${className} ${buttonStyles({
        variant,
        outline,
        block,
        size,
        disabled
      })}`}
    >
      {children}
    </button>
  </div>
)

export default Button
