import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Notifications from './pages/Notifications';
import ChatBot from './pages/ChatBot';
import PestDetection from './pages/PestDetection';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/map" element={<Map />} />
                  <Route path="/pest-detection" element={<PestDetection />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/chat" element={<ChatBot />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;