import React from 'react'
import { css } from '@emotion/react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ children, ...props }, ref) => {
  return (
    <label>
      <input type="checkbox" {...props} ref={ref} css={styles.checkbox} />
      {children}
    </label>
  )
})

const styles = {
  checkbox: css`
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: white;
    transition: all 0.2s ease-in-out;
    margin-right: 8px;
    cursor: pointer;
  `,
}

export default Checkbox
