import React, { useState } from 'react';
import { Camera, Loader } from 'lucide-react';
import CameraCapture from '../components/pest-detection/CameraCapture';
import AnalysisResult from '../components/pest-detection/AnalysisResult';

function PestDetection() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    pestName: string;
    description: string;
    treatments: { id: number; title: string; description: string; }[];
  } | null>(null);

  const handleImageCapture = (image: string) => {
    setCapturedImage(image);
    setIsAnalyzing(true);
    
    // Simulación de análisis
    setTimeout(() => {
      setAnalysisResult({
        pestName: 'Gusano cogollero',
        description: 'El gusano cogollero es una plaga que afecta principalmente al maíz y otros cultivos de gramíneas. Las larvas se alimentan del follaje y pueden causar daños significativos si no se controlan a tiempo.',
        treatments: [
          {
            id: 1,
            title: 'Control biológico',
            description: 'Utilizar enemigos naturales como avispas parasitoides o bacterias específicas.'
          },
          {
            id: 2,
            title: 'Monitoreo constante',
            description: 'Inspeccionar regularmente el cultivo para detectar signos tempranos de infestación.'
          },
          {
            id: 3,
            title: 'Manejo cultural',
            description: 'Mantener el campo libre de malezas y realizar rotación de cultivos.'
          }
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Detección de Plagas</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {!capturedImage && !analysisResult && (
          <div className="text-center space-y-6">
            <Camera className="h-12 w-12 text-green-600 mx-auto" />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Utilizamos su cámara para ayudarle a detectar plagas y enfermedades
              </h2>
              <p className="text-gray-600">
                Toma una foto de las hojas, el fruto o el tallo
              </p>
            </div>
            <CameraCapture onCapture={handleImageCapture} />
          </div>
        )}

        {isAnalyzing && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img
                src={capturedImage!}
                alt="Captured"
                className="w-64 h-64 rounded-lg object-cover"
              />
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Loader className="h-5 w-5 text-green-600 animate-spin" />
              <span className="text-gray-600">Analizando imagen...</span>
            </div>
          </div>
        )}

        {analysisResult && !isAnalyzing && (
          <AnalysisResult
            pestName={analysisResult.pestName}
            description={analysisResult.description}
            treatments={analysisResult.treatments}
            image={capturedImage!}
          />
        )}
      </div>
    </div>
  );
}

export default PestDetection;