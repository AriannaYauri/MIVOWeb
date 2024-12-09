import React from 'react';
import { InfoWindow } from '@react-google-maps/api';

interface FarmInfoCardProps {
  position: google.maps.LatLngLiteral;
  name: string;
  address: string;
  crops: string[];
  onClose: () => void;
}

function FarmInfoCard({ position, name, address, crops, onClose }: FarmInfoCardProps) {
  return (
    <InfoWindow position={position} onCloseClick={onClose}>
      <div className="p-2 min-w-[200px]">
        <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{address}</p>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-900">Cultivos:</p>
          <div className="flex flex-wrap gap-1">
            {crops.map((crop) => (
              <span
                key={crop}
                className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
              >
                {crop}
              </span>
            ))}
          </div>
        </div>
      </div>
    </InfoWindow>
  );
}

export default FarmInfoCard;