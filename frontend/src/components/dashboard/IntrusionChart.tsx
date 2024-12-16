import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Bird, User, Cat, HelpCircle } from 'lucide-react';
import axios from 'axios';

interface AnimalData {
  tipo: string;
  fecha: string;
  cultivo?: string | null;
}

interface ChartData {
  label: string;
  count: number;
}

function IntrusionChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Obtener datos de animales desde el backend
  useEffect(() => {
    axios
      .get('http://10.22.4.98:3000/animales') // Endpoint del backend
      .then((response) => {
        const data: AnimalData[] = response.data;

        // Agrupar y contar los tipos de animales
        const groupedData: Record<string, number> = data.reduce((acc, item) => {
          acc[item.tipo] = (acc[item.tipo] || 0) + 1;
          return acc;
        }, {});

        // Transformar los datos en el formato esperado para el gráfico
        const transformedData: ChartData[] = Object.entries(groupedData).map(([key, value]) => ({
          label: key,
          count: value,
        }));

        setChartData(transformedData);
      })
      .catch((error) => {
        console.error('Error al obtener los datos con axios:', error);
      });
  }, []);

  // Transformar los datos para el gráfico de pastel
  const transformData = () => {
    const labels = chartData.map((entry) => entry.label);
    const counts = chartData.map((entry) => entry.count);

    return {
      labels,
      datasets: [
        {
          data: counts,
          backgroundColor: [
            'rgba(34, 197, 94, 0.5)', // Verde para aves
            'rgba(59, 130, 246, 0.5)', // Azul para personas
            'rgba(249, 115, 22, 0.5)', // Naranja para felinos
            'rgba(156, 163, 175, 0.5)', // Gris para otros
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(249, 115, 22, 1)',
            'rgba(156, 163, 175, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Animales Detectados</h2>
        <span className="text-sm text-red-500">-2% Últimas 24h</span>
      </div>
      <div className="h-64">
        <Pie data={transformData()} />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2 text-sm">
        {chartData.map((entry) => (
          <div key={entry.label} className="flex items-center space-x-1">
            {entry.label.toLowerCase() === 'ave' && <Bird className="h-4 w-4 text-green-600" />}
            {entry.label.toLowerCase() === 'persona' && <User className="h-4 w-4 text-blue-600" />}
            {entry.label.toLowerCase() === 'felino' && <Cat className="h-4 w-4 text-orange-600" />}
            {entry.label.toLowerCase() !== 'ave' &&
              entry.label.toLowerCase() !== 'persona' &&
              entry.label.toLowerCase() !== 'felino' && (
                <HelpCircle className="h-4 w-4 text-gray-600" />
              )}
            <span>{entry.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IntrusionChart;
