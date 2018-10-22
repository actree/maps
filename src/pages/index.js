import React from 'react'
// import { Link } from 'gatsby'

import { Text, Input, Link } from 'kaffebar'
import fuzzysort from 'fuzzysort'
import Layout from '../components/layout'
import Map from '../components/Map'
import Banner from '../components/Banner'
import EmptyState from '../components/EmptyState'
import SearchResults from '../components/SearchResults'
import PlaceDetails from '../components/PlaceDetails'
import Header from '../components/header'

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
    lat: 51.0899232,
    lng: 10.409602, // @51.0899232,5.968358
    zoom: 7,
    place: null,
  }

  render() {
    const title = 'whatever'
    const { search, lat, lng, zoom, place } = this.state
    // const places = allPlaces.filter(p => p.city && p.city.indexOf(search) === 0)
    const places = fuzzysort
      .go(search, allPlaces, { keys: ['name', 'city'] })
      .map(a => a.obj)

    return (
      <>
        <Header siteTitle={title}>
          <Input
            placeholder="Suche"
            value={search}
            onChange={e => this.setState({ search: e.target.value })}
          />
        </Header>
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
          <Grid>
            <Sidebar>
              {place && (
                <PlaceDetails
                  place={place}
                  onBackClick={() => this.setState({ place: null })}
                />
              )}
              {!place &&
                (!place && search.length > 0 ? (
                  <ScrollContainer>
                    <SearchResults
                      places={places}
                      onSelect={p =>
                        this.setState({
                          lat: p.lat,
                          lng: p.lng,
                          place: p,
                          zoom: zoom < 8 ? 13 : zoom,
                        })
                      }
                    />
                  </ScrollContainer>
                ) : (
                  <EmptyState
                    onChange={value => this.setState({ search: value })}
                  />
                ))}
            </Sidebar>
            <Main>
              <Map
                places={places.length ? places : allPlaces}
                lat={lat}
                lng={lng}
                zoom={zoom}
                onZoom={event =>
                  this.setState({ zoom: event.target.getZoom() })
                }
                onSelectPlace={p => this.setState({ place: p })}
              />
            </Main>
          </Grid>
        </div>
      </>
    )
  }
}

const IndexPage = () => (
  <Layout>
    <App />
  </Layout>
)

export default IndexPage
