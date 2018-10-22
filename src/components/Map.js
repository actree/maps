import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Text } from 'kaffebar'
import L from 'leaflet'
import DivIcon from 'react-leaflet-div-icon'
import { MapPin } from 'react-feather'
import gen from 'string-to-color'

const MyMarker = ({ color, ...rest }) => {
  const icon = L.divIcon({
    iconAnchor: [0, 0],
    iconSize: null,
    popupAnchor: [0, 0],
    html: ReactDOMServer.renderToString(
      <MapPin
        style={{
          position: 'relative',
          color,
          // background: 'grey',
          // top: '-1.5em',

          transform: 'translate(-50%, -100%)',
        }}
      />
    ),
  })
  return <Marker {...rest} icon={icon} />
}

const myIcon = L.divIcon({
  // style: { background: 'blue', width: '50px', height: '50px' },
  iconAnchor: [0, 0],
  iconSize: null,
  popupAnchor: [0, 0],
  html: ReactDOMServer.renderToString(
    <MapPin
      style={{
        position: 'relative',
        // background: 'grey',
        // top: '-1.5em',
        color: 'currentColor',
        transform: 'translate(-50%, -100%)',
      }}
    />
  ),
})

export default class MyMap extends Component {
  render() {
    const {
      options,
      places = [],
      lat,
      lng,
      zoom,
      onZoom,
      onSelectPlace,
    } = this.props

    if (typeof window !== 'undefined') {
      const position = [lat, lng]

      return (
        <Map
          center={position}
          zoom={zoom}
          {...options}
          style={{ height: '100%' }}
          onZoomend={onZoom}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {places.map((p, index) => (
            <>
              <MyMarker
                key={`${p.name}-${p.lat}-${p.lng}`}
                position={[p.lat, p.lng]}
                popupOpen={p.name === 'Veganz Prag'}
                onClick={() => onSelectPlace(p)}
                icon={myIcon}
                color={gen(p.type)}
              >
                {/* <Popup>
                <Text fontWeight="bold">{p.name}</Text>
                <Text>{p.description}</Text>
              </Popup> */}
              </MyMarker>
              {/* <Marker
                key={`${p.name}-${p.lat}-${p.lng}`}
                position={[p.lat, p.lng]}
                popupOpen={p.name === 'Veganz Prag'}
                onClick={() => onSelectPlace(p)}
              >

              </Marker> */}
            </>
          ))}
        </Map>
      )
    }
    return null
  }
}
