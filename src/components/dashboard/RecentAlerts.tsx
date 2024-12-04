import React from 'react';
import { Bell, User, Bird, Flame } from 'lucide-react';

interface Alert {
  id: number;
  type: 'fire' | 'intruder' | 'bird';
  message: string;
  location: string;
  time: string;
  status: string;
}

function RecentAlerts() {
  const recentAlerts: Alert[] = [
    {
      id: 1,
      type: 'fire',
      message: 'Presencia de incendio',
      location: 'Estación 2',
      time: '16/02/2024 - 16:48pm',
      status: 'Resuelto',
    },
    {
      id: 2,
      type: 'intruder',
      message: 'Intruso detectado',
      location: 'Estación 3',
      time: '16/02/2024 - 16:52pm',
      status: 'Resuelto',
    },
    {
      id: 3,
      type: 'bird',
      message: 'Ave detectada',
      location: 'Estación 1',
      time: '16/02/2024 - 16:58pm',
      status: 'Resuelto',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'fire':
        return <Flame className="h-5 w-5 text-red-500" />;
      case 'intruder':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'bird':
        return <Bird className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Últimas Alertas</h2>
        <Bell className="h-5 w-5 text-gray-600" />
      </div>
      <div className="space-y-4">
        {recentAlerts.map((alert) => (
          <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            {getIcon(alert.type)}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{alert.message}</p>
              <p className="text-xs text-gray-500">{alert.location}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-400">{alert.time}</span>
                <span className="text-xs text-green-600">{alert.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentAlerts;