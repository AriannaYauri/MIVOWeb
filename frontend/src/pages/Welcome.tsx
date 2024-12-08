import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';

function Welcome() {
  const navigate = useNavigate();
  const backgroundImages = [
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80',
  ];

  const [currentBgIndex, setCurrentBgIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with transition */}
      {backgroundImages.map((img, index) => (
        <div
          key={img}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentBgIndex ? 1 : 0,
          }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <div className="flex justify-center mb-6">
          <Leaf className="h-20 w-20 text-green-400" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">MIVO</h1>
        <p className="text-xl text-gray-200 mb-8 max-w-md mx-auto">
          Al cuidado de tu cultivo con tecnología inteligente
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="group bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 flex items-center justify-center mx-auto space-x-2 hover:scale-105"
        >
          <span>Empezar</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-500/20 rounded-full blur-xl animate-blob" />
        <div className="absolute top-1/2 -right-4 w-32 h-32 bg-green-600/20 rounded-full blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-28 h-28 bg-green-400/20 rounded-full blur-xl animate-blob animation-delay-4000" />
      </div>
    </div>
  );
}

export default Welcome;