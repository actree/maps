import React from 'react'
import styled from 'styled-components'
import { Button, Text, Link } from 'kaffebar'

import { groupBy, mapValues } from 'lodash'

import theme from '../theme'
const { colors } = theme
const ResultList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Result = styled.li`
  display: block;
  padding: 0.5em;
  cursor: pointer;

  &:hover {
    background: ${colors.background};
  }
`

const SearchResults = ({ places, onSelect }) => (
  <ResultList>
    {places.map((place, index) => (
      <Result key={`${place.name} ${index}`} onClick={() => onSelect(place)}>
        <Text fontWeight="bold">{place.name}</Text>
        <Text>
          {place.city}
          {place.tags && <> &bull; {place.tags.join(', ')}</>}
        </Text>
      </Result>
    ))}
  </ResultList>
)

export default SearchResults
