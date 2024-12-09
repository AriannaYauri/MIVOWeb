export interface Farm {
    id: number;
    position: google.maps.LatLngLiteral;
    type: 'own' | 'neighbor';
    name: string;
    address: string;
    crops: string[];
  }
  
  export const farms: Farm[] = [
    {
      id: 1,
      position: { lat:  -5.1894, lng: -73.5135 },
      type: 'own',
      name: 'Mi Cultivo',
      address: 'Sector Norte, Parcela 123',
      crops: ['Maíz', 'Frijoles', 'Tomates'],
    },
    {
      id: 2,
      position: { lat: -3.742, lng: -38.520 },
      type: 'neighbor',
      name: 'Granja Los Girasoles',
      address: 'Sector Norte, Parcela 124',
      crops: ['Girasoles', 'Trigo'],
    },
    {
      id: 3,
      position: { lat: -3.748, lng: -38.525 },
      type: 'neighbor',
      name: 'Cultivos del Valle',
      address: 'Sector Sur, Parcela 45',
      crops: ['Arroz', 'Soja'],
    },
  ];