import React from 'react'
import { Button, Text, Link } from 'kaffebar'
import places from '../data/actree.json'
import { groupBy, mapValues } from 'lodash'
import { Star, Crosshair } from 'react-feather'

const topCities = mapValues(groupBy(places, 'city'), 'length')

// .sort((a, b) => a.length >= b.length)
// .slice(0, 10)

const allTypes = Object.keys(groupBy(places, 'type'))

const EmptyState = ({ onChange }) => (
  <>
    <Button
      onClick={() => onChange('Meine Umgebung')}
      style={{ width: '100%', justifyContent: 'center', marginBottom: '2rem' }}
    >
      <Crosshair />
      &nbsp;&nbsp;Zeige Ergebnisse in deiner Umgebung
    </Button>
    <Text as="h4">
      <Star /> Gehe direkt zu einer der Top 10 Städte
    </Text>
    <Text as="p">
      {Object.keys(topCities)
        .filter(Boolean)
        .map(c => ({ city: c, length: topCities[c] }))
        .sort((a, b) => a.length <= b.length)
        .slice(0, 10)
        .map(c => (
          <Link key={c.city} onClick={() => onChange(c.city)}>
            {c.city}{' '}
          </Link>
        ))}
    </Text>
    <Text as="h4">Kategorien</Text>
    <Text as="p">
      {allTypes.map(type => (
        <Text as="span">
          <Link>{type}</Link>
          {' ~ '}
        </Text>
      ))}
    </Text>
  </>
)

export default EmptyState
