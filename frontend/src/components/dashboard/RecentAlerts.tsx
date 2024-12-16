import React, { useEffect, useState } from 'react';
import { Bell, User, Bird, Flame, HelpCircle } from 'lucide-react';
import axios from 'axios';

interface Alert {
  id: number;
  type: 'fire' | 'intruder' | 'bird' | 'unknown';
  message: string;
  location: string;
  time: string;
  status: string;
}

function RecentAlerts() {
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([]);

  // Obtener datos dinámicamente desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [animalResponse, fireResponse] = await Promise.all([
          axios.get('http://10.22.4.98:3000/animales'),
          axios.get('http://10.22.4.98:3000/incendios'),
        ]);

        const animalAlerts: Alert[] = animalResponse.data.map((animal: any) => ({
          id: animal.id,
          type: 'bird', // Asignamos 'bird' como tipo base para los animales
          message: `Detección de ${animal.tipo}`,
          location: animal.cultivo || 'Ubicación desconocida',
          time: new Date(animal.fecha).toLocaleString('es-ES', { timeZone: 'America/Lima' }),
          status: 'Sin resolver', // Estado inicial
        }));

        const fireAlerts: Alert[] = fireResponse.data.map((fire: any) => ({
          id: fire.id,
          type: 'fire',
          message: 'Presencia de incendio',
          location: fire.cultivo || 'Ubicación desconocida',
          time: new Date(fire.fecha).toLocaleString('es-ES', { timeZone: 'America/Lima' }),
          status: 'Sin resolver', // Estado inicial
        }));

        setRecentAlerts([...animalAlerts, ...fireAlerts]);
      } catch (error) {
        console.error('Error al obtener las alertas:', error);
      }
    };

    fetchData();
  }, []);

  // Icono según el tipo de alerta
  const getIcon = (type: string) => {
    switch (type) {
      case 'fire':
        return <Flame className="h-5 w-5 text-red-500" />;
      case 'intruder':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'bird':
        return <Bird className="h-5 w-5 text-green-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Últimas Alertas</h2>
        <Bell className="h-5 w-5 text-gray-600" />
      </div>
      <div className="space-y-4">
        {recentAlerts.length > 0 ? (
          recentAlerts.map((alert) => (
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
          ))
        ) : (
          <p className="text-sm text-gray-500">No hay alertas recientes</p>
        )}
      </div>
    </div>
  );
}

export default RecentAlerts;
