import React from 'react'
import styled from 'styled-components'
import theme from '../theme'
import Banner from './Banner'

const { colors } = theme

const Banner = styled(Banner)`
  background: #ede9ca;
  color: ${colors.text};
`

export default Banner
