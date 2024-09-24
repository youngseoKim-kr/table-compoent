import React, { CSSProperties, ReactNode } from 'react'
import { css } from '@emotion/react'
import { Colors, colors } from '@styles/colors'
import { Typography, typographyMap } from '@styles/typography'

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  typography?: Typography
  color?: Colors
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
  as?: 'p' | 'span' | 'div' // 태그 타입을 유연하게 지정
}

function Text({
  children,
  typography = 't5',
  color = 'black',
  display,
  textAlign,
  fontWeight,
  bold,
  as: Component = 'span',
  ...props
}: TextProps) {
  return (
    <Component
      css={css`
        ${typographyMap[typography]};
        font-weight: ${bold ? 'bold' : fontWeight || 'normal'};
        color: ${colors[color]};
        display: ${display || 'inline'};
        text-align: ${textAlign};
      `}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Text
