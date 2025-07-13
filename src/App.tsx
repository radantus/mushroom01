import React from 'react';
import { Activity } from 'lucide-react';
import LocationLogger from './components/LocationLogger';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Activity className="h-8 w-8 mr-3" />
          <h1 className="text-2xl font-bold">GeoTracker</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <LocationLogger />
      </main>
      <footer className="bg-gray-100 border-t border-gray-200 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} GeoTracker – Twoje dane o lokalizacji pozostają na Twoim urządzeniu</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
