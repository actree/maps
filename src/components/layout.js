import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'

import Header from './header'
import theme from '../theme'
import './layout.css'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en" />
            <link
              rel="stylesheet"
              href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
              integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
              crossorigin=""
            />
          </Helmet>
          <PageContainer>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div
              style={{
                flex: '1 1 auto',
                minHeight: 0,
                // margin: '0 auto',
                // maxWidth: 960,
                // padding: '0px 1.0875rem 1.45rem',
                // paddingTop: 0,
              }}
            >
              {children}
            </div>
          </PageContainer>
        </>
      )}
    />
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
