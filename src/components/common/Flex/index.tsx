import React, { CSSProperties } from 'react'
import { css } from '@emotion/react'

interface FlexProps {
  children: React.ReactNode
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  direction?: CSSProperties['flexDirection']
  pros?: React.HTMLAttributes<HTMLDivElement>
}

function Flex({ children, align, justify, direction, pros }: FlexProps) {
  return (
    <div
      {...pros}
      css={css({
        display: 'flex',
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
      })}
    >
      {children}
    </div>
  )
}

export default Flex
