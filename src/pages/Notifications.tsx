import React from 'react';
import { Bell, AlertTriangle, Thermometer } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'danger',
    title: 'Plaga detectada',
    message: 'Se ha detectado una plaga a 50km de tu ubicación',
    time: '5 minutos',
    icon: AlertTriangle
  },
  {
    id: 2,
    type: 'warning',
    title: 'Alerta de temperatura',
    message: 'Temperatura por encima del promedio en tu zona',
    time: '1 hora',
    icon: Thermometer
  }
];

function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Notificaciones</h1>
        <Bell className="h-6 w-6 text-gray-600" />
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${
              notification.type === 'danger' ? 'border-red-500' : 'border-yellow-500'
            }`}
          >
            <div className="flex items-start space-x-4">
              <notification.icon
                className={`h-6 w-6 ${
                  notification.type === 'danger' ? 'text-red-500' : 'text-yellow-500'
                }`}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {notification.title}
                </h3>
                <p className="text-gray-600">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-2">Hace {notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;