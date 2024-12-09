import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Flame } from 'lucide-react';
import axios from 'axios';

interface FireData {
  id: string;
  date: string;
  count: number;
}

function FireChart() {
  const [timeframe, setTimeframe] = useState('Semanal'); // Intervalo de tiempo seleccionado
  const [fireData, setFireData] = useState<Record<string, FireData[]>>({
    Diario: [],
    Semanal: [],
    Mensual: [],
  });

  // Obtener datos desde la base de datos con axios
  useEffect(() => {
    axios
      .get('http://localhost:3000/models/incendio') // Ahora apunta al nuevo puerto
      .then((response) => {
        const data: FireData[] = response.data;

        // Agrupar los datos por id (Diario, Semanal, Mensual)
        const groupedData: Record<string, FireData[]> = data.reduce((acc, item) => {
          if (!acc[item.id]) acc[item.id] = [];
          acc[item.id].push(item);
          return acc;
        }, {} as Record<string, FireData[]>);

        setFireData(groupedData);
      })
      .catch((error) => {
        console.error('Error al obtener los datos con axios:', error);
      });
  }, []);

  // Transformar datos para el gráfico según el intervalo de tiempo seleccionado
  const transformData = () => {
    const currentData = fireData[timeframe] || [];

    const labels = currentData.map((entry) => entry.date);
    const counts = currentData.map((entry) => entry.count);

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
            className={`cursor-pointer ${
              timeframe === option ? 'font-semibold text-green-600' : 'hover:text-green-600'
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
