import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Flame } from 'lucide-react';
import axios from 'axios';

interface FireData {
  fecha: string;
  cultivo: string | null;
}

function FireChart() {
  const [timeframe, setTimeframe] = useState('Semanal'); // Intervalo de tiempo seleccionado
  const [fireData, setFireData] = useState<FireData[]>([]);

  // Obtener datos desde la base de datos con axios
  useEffect(() => {
    axios
      .get('http://10.22.4.98:3000/incendios') // Ruta correcta
      .then((response) => {
        setFireData(response.data); // Almacena los incendios
      })
      .catch((error) => {
        console.error('Error al obtener los datos con axios:', error);
      });
  }, []);

  // Función para agrupar y contar incendios por fecha
  const groupAndCountData = (interval: string) => {
    const groupedData: Record<string, number> = {};

    fireData.forEach((entry) => {
      const date = new Date(entry.fecha); // Convierte la cadena ISO 8601 en un objeto Date
      let label = '';

      if (interval === 'Diario') {
        // Formato: DD/MM/YYYY
        label = date.toLocaleDateString();
      } else if (interval === 'Semanal') {
        // Semana del año
        const weekNumber = Math.ceil(
          (date.getDate() - date.getDay() + 1) / 7
        );
        label = `${date.getFullYear()}-W${weekNumber}`;
      } else if (interval === 'Mensual') {
        // Formato: MM/YYYY
        label = `${date.getMonth() + 1}/${date.getFullYear()}`;
      }

      // Incrementa el contador de incendios para esa fecha/semana/mes
      groupedData[label] = (groupedData[label] || 0) + 1;
    });

    return groupedData;
  };

  // Transformar datos para el gráfico según el intervalo de tiempo seleccionado
  const transformData = () => {
    const groupedData = groupAndCountData(timeframe);

    const labels = Object.keys(groupedData);
    const counts = Object.values(groupedData);

    return {
      labels,
      datasets: [
        {
          label: 'Incendios detectados',
          data: counts,
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Incendios</h2>
        <div className="flex items-center space-x-2">
          <Flame className="h-5 w-5 text-red-500" />
          <span className="text-sm text-gray-500">Última vez 11/08/2024</span>
        </div>
      </div>
      <div className="h-64">
        <Bar data={transformData()} />
      </div>
      <div className="mt-4 flex justify-around text-sm text-gray-600">
        {['Diario', 'Semanal', 'Mensual'].map((option) => (
          <span
            key={option}
            className={`cursor-pointer ${timeframe === option ? 'font-semibold text-green-600' : 'hover:text-green-600'
              }`}
            onClick={() => setTimeframe(option)}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
}

export default FireChart;
