import React from 'react';
import { Camera } from 'lucide-react';

function CameraCapture() {
  const handleRedirect = () => {
    window.location.href = 'https://demo.roboflow.com/riceblast-hiwcd/1?publishable_key=rf_m8WA1fCCyxNr8mHlHyLIZVAxSEx1';
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleRedirect}
        className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
      >
        <Camera className="h-5 w-5" />
        <span>Quiero detectar una plaga</span>
      </button>
    </div>
  );
}

export default CameraCapture;
