import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, mapConfig } from '../config/maps';
import MapMarker from '../components/map/MapMarker';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const farms = [
  { id: 1, position: { lat: -12.0464, lng: -77.0428 }, type: 'own' }, // Cultivo propio
  { id: 2, position: { lat: -12.046, lng: -77.041 }, type: 'neighbor' }, // Vecino cercano
  { id: 3, position: { lat: -12.048, lng: -77.045 }, type: 'neighbor' }, // Vecino cercano
];

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    farms.forEach((farm) => bounds.extend(farm.position));
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Mapa de Cultivos</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-600">Mi cultivo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Cultivos vecinos</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapConfig.defaultCenter}
            zoom={mapConfig.defaultZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              styles: [
                {
                  featureType: 'poi',
                  elementType: 'labels',
                  stylers: [{ visibility: 'off' }],
                },
              ],
              mapTypeControl: false,
              streetViewControl: false,
            }}
          >
            {farms.map((farm) => (
              <MapMarker
                key={farm.id}
                position={farm.position}
                type={farm.type}
              />
            ))}
          </GoogleMap>
        ) : (
          <div className="flex items-center justify-center h-[600px]">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
              <span className="text-gray-600">Cargando mapa...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Map;
