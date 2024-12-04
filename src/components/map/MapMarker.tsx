import React from 'react';
import { Marker } from '@react-google-maps/api';

interface MapMarkerProps {
  position: google.maps.LatLngLiteral;
  type: 'own' | 'neighbor';
}

function MapMarker({ position, type }: MapMarkerProps) {
  return (
    <Marker
      position={position}
      icon={{
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: type === 'own' ? '#ef4444' : '#22c55e',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#ffffff',
      }}
    />
  );
}

export default MapMarker;