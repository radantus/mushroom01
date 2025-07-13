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
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NBG58HVX');</script>
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
