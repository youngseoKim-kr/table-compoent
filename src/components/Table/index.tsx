import { css } from '@emotion/react'
import React from 'react'
import { colors } from '@styles/colors'

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  backgroundColor?: string
  color?: string
  borderRadius?: string
  shadow?: string
  children: React.ReactNode
}

function Table({
  backgroundColor = colors.white,
  color = colors.black,
  borderRadius = '8px',
  shadow,
  children,
  ...props
}: TableProps) {
  return (
    <table
      {...props}
      css={css(`
        background-color: ${backgroundColor};
        color: ${color || colors.white};
        border-radius: ${borderRadius};
        box-shadow: ${shadow || 'none'};
      `)}
    >
      {children}
    </table>
  )
}

export default Table
