import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Flame } from 'lucide-react';

function FireChart() {
  const fireFrequencyData = {
    labels: ['Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'],
    datasets: [
      {
        label: 'Incendios detectados',
        data: [1, 2, 1, 2, 0],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
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
        <Bar data={fireFrequencyData} />
      </div>
      <div className="mt-4 flex justify-around text-sm text-gray-600">
        <span>Diario</span>
        <span className="font-semibold text-green-600">Semanal</span>
        <span>Mensual</span>
      </div>
    </div>
  );
}

export default FireChart;