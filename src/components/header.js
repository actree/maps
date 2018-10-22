import React from 'react'
import { Link } from 'gatsby'

import theme from '../theme'

import Logo from './Logo'
const { colors } = theme
const Header = ({ siteTitle }) => (
  <div
    style={{
      background: colors.background,
      flex: '0 0 auto',
      // marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        // maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <Logo>maps</Logo>
    </div>
  </div>
)

export default Header
