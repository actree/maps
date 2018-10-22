import React from 'react'
import styled from 'styled-components'
import { Button, Text, Link } from 'kaffebar'

import { groupBy, mapValues } from 'lodash'
import { ArrowLeft } from 'react-feather'

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

const PlaceDetails = ({ place, onBackClick }) => {
  const { name, description, city, hours, website } = place
  return (
    <div>
      <Button onClick={onBackClick} style={{ marginBottom: '2rem' }}>
        <ArrowLeft />
        &nbsp;&nbsp;Zurück
      </Button>
      <Text as="h2">{name}</Text>
      <Text as="p">{description}</Text>
      {hours && <Text as="p">Öffnungszeiten: {hours}</Text>}
      {website && (
        <Text>
          <Link href={website}>{website}</Link>
        </Text>
      )}
    </div>
  )
}

export default PlaceDetails
