import React, { CSSProperties } from 'react'
import { css } from '@emotion/react'

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  direction?: CSSProperties['flexDirection']
  gap?: CSSProperties['gap']
}

function Flex({ children, align, justify, direction, gap, ...pros }: FlexProps) {
  return (
    <div
      {...pros}
      css={css({
        display: 'flex',
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
        gap,
      })}
    >
      {children}
    </div>
  )
}

export default Flex
