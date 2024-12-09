export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const mapConfig = {
  defaultCenter: {
    lat: -3.745,
    lng: -38.523
  },
  defaultZoom: 15,
  options: {
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ],
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      position: 3 // RIGHT_TOP
    }
  }
};