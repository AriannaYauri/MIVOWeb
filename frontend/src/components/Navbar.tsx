import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Map as MapIcon, Bell, MessageSquare, Leaf, Bug , LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">MIVO</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/dashboard') ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Inicio</span>
            </Link>
            
            <Link
              to="/map"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/map') ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <MapIcon className="h-5 w-5" />
              <span>Mapa</span>
            </Link>
            
            <Link
              to="/pest-detection"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/PestDetection') ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Bug className="h-5 w-5" />
              <span>Plaga</span>
            </Link>

            <Link
              to="/notifications"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/notifications') ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Bell className="h-5 w-5" />
              <span>Alertas</span>
            </Link>
            
            <Link
              to="/chat"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/chat') ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>MivoBot</span>
            </Link>


            <div className="flex items-center space-x-4">
              <Link to="/"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50">
              <LogOut className="h-5 w-5" />
               <span>Salir</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;