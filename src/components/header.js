import React from 'react'
import { Link } from 'gatsby'

import theme from '../theme'

import Logo from './Logo'
const { colors } = theme
const Header = ({ siteTitle, children }) => (
  <div
    style={{
      background: colors.background,
      flex: '0 0 auto',
      // marginBottom: '1.45rem',
      // display: 'flex',
    }}
  >
    <div
      style={{
        // margin: '0 auto',
        // maxWidth: 960,
        padding: '1.45rem 1.0875rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ flex: '1 0 auto' }}>
        <Logo>maps</Logo>
      </div>
      <div style={{ flex: '1 1 50%' }}>{children}</div>
    </div>
  </div>
)

export default Header
