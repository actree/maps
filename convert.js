const dom = require('xmldom').DOMParser
const fs = require('fs')
const tj = require('@mapbox/togeojson')
const { inspect } = require('util')

const file = fs.readFileSync('./src/data/actree Deutschland.kml', 'utf-8')
const kml = new dom().parseFromString(file)
const converted = tj.kml(kml)

console.log(inspect(converted.features[0]))

const relevantStuff = converted.features.map(({ geometry, properties }) => {
  const [lng, lat] = geometry.coordinates
  const {
    name,
    Beschreibung: description,
    Preis: price,
    Ort: city,
    Internetseite: website,
    Öffnungszeiten: hours,
    Nachhaltigkeit: tags,
    Art: type,
  } = properties

  return {
    lat,
    lng,
    name,
    description,
    price,
    city,
    website,
    type,
    hours,
    tags: tags ? tags.split(', ') : [],
  }
})

fs.writeFileSync(
  './src/data/actree.json',
  JSON.stringify(relevantStuff),
  'utf-8'
)
