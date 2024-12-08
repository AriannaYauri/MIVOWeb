import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Treatment {
  id: number;
  title: string;
  description: string;
}

interface AnalysisResultProps {
  pestName: string;
  description: string;
  treatments: Treatment[];
  image: string;
}

function AnalysisResult({ pestName, description, treatments, image }: AnalysisResultProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{pestName}</h2>
        <img src={image} alt="Captured" className="w-24 h-24 rounded-lg object-cover" />
      </div>

      <p className="text-gray-600">{description}</p>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Tratamientos recomendados:</h3>
        <div className="space-y-3">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="flex items-start space-x-3 bg-green-50 p-4 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">{treatment.title}</h4>
                <p className="text-sm text-gray-600">{treatment.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalysisResult;