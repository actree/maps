import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Text } from 'kaffebar'

export default class MyMap extends Component {
  render() {
    const { options, places = [], lat, lng, zoom, onZoom } = this.props

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
            <Marker key={`${p.name} ${index}`} position={[p.lat, p.lng]}>
              <Popup>
                <Text fontWeight="bold">{p.name}</Text>
                <Text>{p.description}</Text>
              </Popup>
            </Marker>
          ))}
        </Map>
      )
    }
    return null
  }
}
