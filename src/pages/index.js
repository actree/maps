import React from 'react'
// import { Link } from 'gatsby'

import { Text, Input, Link } from 'kaffebar'
import fuzzysort from 'fuzzysort'
import Layout from '../components/layout'
import Map from '../components/Map'
import Banner from '../components/Banner'
import EmptyState from '../components/EmptyState'
import SearchResults from '../components/SearchResults'

import allPlaces from '../data/actree.json'
import { uniq } from 'lodash'
import styled from 'styled-components'

const Grid = styled.div`
  display: flex;
  height: 100%;
  align-items: stretch;
`

const Sidebar = styled.div`
  flex: 1 0 25%;
  ${'' /* overflow: scroll; */} display: flex;
  flex-direction: column;
  padding: 1rem;
`

const Main = styled.div`
  flex: 1 0 75%;
`

const ScrollContainer = styled.div`
  overflow-y: scroll;
  flex: 1 1 auto;
  min-height: 0;
`

class App extends React.Component {
  state = {
    search: '',
    lat: 52.5065133,
    lng: 13.1445545,
    zoom: 13,
  }

  render() {
    const { search, lat, lng, zoom } = this.state
    // const places = allPlaces.filter(p => p.city && p.city.indexOf(search) === 0)
    const places = fuzzysort
      .go(search, allPlaces, { keys: ['name', 'city'] })
      .map(a => a.obj)

    return (
      <Grid>
        <Sidebar>
          <Input
            placeholder="Suche"
            value={search}
            onChange={e => this.setState({ search: e.target.value })}
          />
          <ScrollContainer>
            {search.length > 0 ? (
              <SearchResults
                places={places}
                onSelect={({ lat, lng }) => this.setState({ lat, lng })}
              />
            ) : (
              <EmptyState
                onChange={value => this.setState({ search: value })}
              />
            )}
          </ScrollContainer>
        </Sidebar>
        <Main>
          <Map
            places={places.length ? places : allPlaces}
            lat={lat}
            lng={lng}
            zoom={zoom}
            onZoom={event => this.setState({ zoom: event.target.getZoom() })}
          />
        </Main>
      </Grid>
    )
  }
}

const IndexPage = () => (
  <Layout>
    <App />
  </Layout>
)

export default IndexPage
