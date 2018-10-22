import React from 'react'
import { Button, Text, Link } from 'kaffebar'
import places from '../data/actree.json'
import { groupBy, mapValues } from 'lodash'

const topCities = mapValues(groupBy(places, 'city'), 'length')

// .sort((a, b) => a.length >= b.length)
// .slice(0, 10)

const EmptyState = ({ onChange }) => (
  <>
    <Button onClick={() => onChange('Meine Umgebung')}>
      Zeige Ergebnisse in deiner Umgebung
    </Button>
    <Text as="h4">Gehe direkt zu einer der Top 10 Städte</Text>
    <Text>
      {Object.keys(topCities)
        .filter(Boolean)
        .map(c => ({ city: c, length: topCities[c] }))
        .sort((a, b) => a.length <= b.length)
        .slice(0, 10)
        .map(c => (
          <>
            <Link onClick={() => onChange(c.city)}>{c.city}</Link> &bull;&nbsp;
          </>
        ))}
    </Text>
    <Text as="h4">Kategorien</Text>
  </>
)

export default EmptyState
