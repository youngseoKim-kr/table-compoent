import { css } from '@emotion/react'
import { ButtonColor, buttonColorMap, ButtonSize, buttonSizeMap, buttonWeakMap } from '@styles/button'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor
  size?: ButtonSize
  weak?: boolean
  full?: boolean
  disabled?: boolean
  children: React.ReactNode
}

function Button({ color = 'primary', size = 'small', weak, full, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      css={css`
        cursor: ${disabled ? 'initial' : 'pointer'};
        font-weight: bold;
        border-radius: 6px;
        opacity: ${disabled ? 0.26 : 1};
        ${weak ? buttonWeakMap[color] : buttonColorMap[color]};
        ${buttonSizeMap[size]};
        ${full &&
        css`
          display: block;
          width: 100%;
          border-radius: 0;
        `};
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
