import React from 'react';
import { Activity } from 'lucide-react';
import LocationLogger from './components/LocationLogger';
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import FeedbackForm from './components/FeedbackForm';

function App() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
        <div className="container mx-auto px-2 py-2 flex items-center">
          <Activity className="h-2 w-2 mr-2" />
          <h1 className="text-2xl font-bold">GeoTracker</h1>
        </div>
      </header>
      <main className="container mx-auto px-2 py-4">
        <LocationLogger />
      </main>
      <footer className="bg-gray-100 border-t border-gray-200 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} GeoTracker – Twoje dane o lokalizacji pozostają na Twoim urządzeniu</p>
          </br>
          </br>
          </br>
        </div>
        <div className="bg-gray-100 flex items-center justify-center">
        
        {/* Feedback Button */}
        <div className="fixed right-6">
          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="bg-blue-600 hover:bg-blue-900 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <MessageSquare className="w-2 h-2" />
            Wyślij opinię
          </button>
        </div>
        
        {/* Feedback Form Modal */}
        <FeedbackForm 
          isOpen={isFeedbackOpen} 
          onClose={() => setIsFeedbackOpen(false)} 
        />
    </div>
      </footer>
    </div>
  );
}

export default App;
