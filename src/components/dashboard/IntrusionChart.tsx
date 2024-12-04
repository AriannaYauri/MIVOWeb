import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Bird, User, Cat } from 'lucide-react';

function IntrusionChart() {
  const intrusionData = {
    labels: ['Aves', 'Personas', 'Felinos'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: [
          'rgba(34, 197, 94, 0.5)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(249, 115, 22, 0.5)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(249, 115, 22, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Animales e Intrusos</h2>
        <span className="text-sm text-red-500">-2% Últimas 24h</span>
      </div>
      <div className="h-64">
        <Pie data={intrusionData} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center space-x-1">
          <Bird className="h-4 w-4 text-green-600" />
          <span>Aves</span>
        </div>
        <div className="flex items-center space-x-1">
          <User className="h-4 w-4 text-blue-600" />
          <span>Personas</span>
        </div>
        <div className="flex items-center space-x-1">
          <Cat className="h-4 w-4 text-orange-600" />
          <span>Felinos</span>
        </div>
      </div>
    </div>
  );
}

export default IntrusionChart;