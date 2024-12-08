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
        scale: 100, // Aumenta el tamaño del marcador
        fillColor: type === 'own' ? '#ef4444' : '#22c55e', // Rojo o verde
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#ffffff',
      }}
    />
  );
}

export default MapMarker;
