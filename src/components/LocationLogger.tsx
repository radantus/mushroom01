import React, { useState, useEffect } from 'react';
import { MapPin, Download, Trash2 } from 'lucide-react';
import LogEntryList from './LogEntryList';
import { LogEntry } from '../types/types';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { downloadLogs } from '../utils/downloadUtils';

const LocationLogger: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { getCurrentPosition, isLoading, error } = useGeoLocation();

  // Load logs from localStorage on component mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('geoLogs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save logs to localStorage whenever logs change
  useEffect(() => {
    localStorage.setItem('geoLogs', JSON.stringify(logs));
  }, [logs]);

  const handleLogLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        comment: ''
      };
      setLogs(prevLogs => [newLog, ...prevLogs]);
pushToDataLayer('clk_btn', { event: 'click', button: 'log' });
    } catch (error) {
      console.error('Błąd zapisu:', error);
    }
  };

	function pushToDataLayer(eventName: string, eventData: Record<string, any> = {}): void {
  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...eventData
  });
}
	
  const handleUpdateComment = (id: string, comment: string) => {
    setLogs(prevLogs => 
      prevLogs.map(log => 
        log.id === id ? { ...log, comment } : log
      )
    );
  };

  const handleDeleteLog = (id: string) => {
    setLogs(prevLogs => prevLogs.filter(log => log.id !== id));
  };

  const handleClearLogs = () => {
    if (window.confirm('Czy na pewno chcesz usunąć wszystkie pinezki?')) {
      setLogs([]);
    }
  };

  const handleDownloadLogs = () => {
    downloadLogs(logs);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Zapisz Swoje Położenie</h2>
        <p className="text-gray-600 mb-6">
          Kliknij poniższy przycisk, aby zapisać swoją aktualną lokalizację. Do każdego wpisu możesz dodać komentarz.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleLogLocation}
            disabled={isLoading}
            id="01"
className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
	>
            <MapPin className="h-5 w-5" />
            {isLoading ? 'Getting Location...' : 'Zapisz pinezkę'}
          </button>
          <button
            onClick={handleDownloadLogs}
            disabled={logs.length === 0}
            className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-teal-400 disabled:cursor-not-allowed"
	id="02"
          >
            <Download className="h-5 w-5" />
            Zapisz
          </button>
          {logs.length > 0 && (
            <button
              onClick={handleClearLogs}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
	id="03"
            >
              <Trash2 className="h-5 w-5" />
              Kasuj wszystko
            </button>
          )}
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
            Error: {error.message || 'Nie udało się pobrać lokalizacji. Sprawdź uprawnienia aplikacji.'}
          </div>
        )}
      </div>

      <LogEntryList 
        logs={logs} 
        onUpdateComment={handleUpdateComment} 
        onDeleteLog={handleDeleteLog} 
      />
    </div>
  );
};

export default LocationLogger;
