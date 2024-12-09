import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Calendar, AlertTriangle, Filter, PersonStanding } from 'lucide-react';

// Definir el tipo de las alertas
interface Alert {
  id: number;
  lat: number;
  lng: number;
  date: string;
  severity: string;
  cultivo: string;
  description: string;
  status: string;
}

// Sample alert data
const alerts: Alert[] = [
  {
    id: 1,
    lat: -5.1894,
    lng: -73.5135,
    date: '2024-03-20',
    severity: 'Tu cultivo',
    cultivo: 'uva',
    description: 'Latitud: -4.5858, Longitud: -73.4167',
    status: 'No plagas reportadas',
  },
  {
    id: 2,
    lat: -4.9894,
    lng: -73.2135,
    date: '2024-03-19',
    severity: 'Vecino',
    cultivo: 'arroz',
    description: 'Latitud: -12.1269, Longitud: -71.2226',
    status: 'RiceBlast reportado',
  },
  {
    id: 3,
    lat: -5.3894,
    lng: -73.7135,
    date: '2024-03-18',
    severity: 'Vecino',
    cultivo: 'papa',
    description: 'Latitud: -12.8565, Longitud: -69.2601',
    status: 'No plagas reportadas',
  },
];

// Custom icon for markers
const customIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function Map() {
  const [filter, setFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'all') return true;
    return alert.severity.toLowerCase() === filter.toLowerCase();
  });

  const getCircleColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'tu cultivo':
        return '#ef4444';
      case 'vecino':
        return '#f59e0b';
      default:
        return '#22c55e';
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-green-900 to-amber-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Mapa de Cultivos</h1>

          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-green-400/50 text-white border border-green-700 rounded-lg px-4 py-2"
            >
              <option value="all">Todos los cultivos</option>
              <option value="Tu cultivo">Tu Cultivo</option>
              <option value="vecino">Cultivos Vecinos</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-green-400/50 backdrop-blur-sm rounded-lg p-6">
            <div className="h-[600px] rounded-lg overflow-hidden">
              <MapContainer
                center={[-5.1894, -73.5135]}
                zoom={8}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                {filteredAlerts.map((alert) => (
                  <React.Fragment key={alert.id}>
                    <Marker
                      position={[alert.lat, alert.lng]}
                      icon={customIcon}
                      eventHandlers={{
                        click: () => setSelectedAlert(alert),
                      }}
                    >
                      <Popup>
                        <div className="text-sm">
                          <p className="font-bold mb-1">Cultivo #{alert.id}</p>
                          <p>Fecha: {alert.date}</p>
                          <p>Propietario: {alert.severity}</p>
                          <p>Cultivo: {alert.cultivo}</p>
                        </div>
                      </Popup>
                    </Marker>
                    <Circle
                      center={[alert.lat, alert.lng]}
                      radius={100}
                      pathOptions={{
                        color: getCircleColor(alert.severity),
                        fillColor: getCircleColor(alert.severity),
                        fillOpacity: 0.2,
                      }}
                    />
                  </React.Fragment>
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="space-y-4">
            {selectedAlert ? (
              <div className="bg-green-400/50 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Detalles de cultivo #{selectedAlert.id}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-white">
                    <Calendar className="h-5 w-5 mr-2 text-green-400" />
                    <span>{selectedAlert.date}</span>
                  </div>
                  <div className="flex items-center text-white">
                    <PersonStanding className="h-5 w-5 mr-2 text-red-400" />
                    <span>Propietario {selectedAlert.severity}</span>
                  </div>
                  <div className="text-white">
                    <p className="font-semibold mb-1">Descripción:</p>
                    <p>{selectedAlert.description}</p>
                  </div>
                  <div className="text-white">
                    <p className="font-semibold mb-1">Estado:</p>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        selectedAlert.status === 'No plagas reportadas'
                          ? 'bg-green-900'
                          : selectedAlert.status === 'RiceBlast reportado'
                          ? 'bg-yellow-900'
                          : 'bg-red-900'
                      }`}
                    >
                      {selectedAlert.status}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-400/50 backdrop-blur-sm rounded-lg p-6 text-center">
                <Filter className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-white">
                  Selecciona un cultivo en el mapa para ver sus detalles
                </p>
              </div>
            )}

            {selectedAlert && (
              <div className="bg-green-400/50 backdrop-blur-sm rounded-lg p-6">
                <div className="text-white">
                  <p className="font-semibold mb-1">Descripción:</p>
                  <p>Tipo de cultivo: {selectedAlert.cultivo}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
