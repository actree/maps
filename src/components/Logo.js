import React from 'react'
import styled from 'styled-components'
import { Text } from 'kaffebar'
import theme from '../theme'
const { colors } = theme

const A = styled.span`
  border-bottom: 4px solid ${colors.primary};
  display: inline-block;
`

const Sub = styled.span`
  font-weight: 400;
`

const Logo = ({ children }) => (
  <Text
    as="h1"
    fontFamily="serif"
    role="banner"
    style={{ lineHeight: '1em', margin: 0 }}
  >
    <A>a</A>
    ctree <Sub>{children}</Sub>
  </Text>
)

export default Logo
