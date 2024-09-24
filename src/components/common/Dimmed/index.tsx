import styled from '@emotion/styled'
import React from 'react'

interface DimmedProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function Dimmed({ children, ...props }: DimmedProps) {
  return <Container {...props}>{children}</Container>
}

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
`

export default Dimmed
