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

  // Helper to push button clicks to dataLayer
  const handleButtonClick = (buttonText: string) => {
    if (window && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'click',
        buttonText,
      });
    }
  };

  const handleLogLocation = async () => {
    handleButtonClick('Zapisz');
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
    } catch (error) {
      console.error('Błąd zapisu:', error);
    }
  };

  const handleUpdateComment = (id: string, comment: string) => {
    setLogs(prevLogs =>
      prevLogs.map(log =>
        log.id === id ? { ...log, comment } : log
      )
    );
  };

  const handleDeleteLog = (id: string) => {
    handleButtonClick('Usuń');
    setLogs(prevLogs => prevLogs.filter(log => log.id !== id));
  };

  const handleClearLogs = () => {
    handleButtonClick('Kasuj wszystko');
    if (window.confirm('Czy na pewno chcesz usunąć wszystkie pinezki?')) {
      setLogs([]);
    }
  };

  const handleDownloadLogs = () => {
    handleButtonClick('Pobierz');
    downloadLogs(logs);
  };

  return (
    <div>
      <h2>Zapisz Swoje Położenie</h2>
      <p>
        Kliknij poniższy przycisk, aby zapisać swoją aktualną lokalizację. Do każdego wpisu możesz dodać komentarz.
      </p>

      <button
        onClick={handleLogLocation}
        disabled={isLoading}
      >
        {isLoading ? 'Getting Location...' : 'Zapisz'}
      </button>

      {logs.length > 0 && (
        <button
          onClick={handleClearLogs}
        >
          Kasuj wszystko
        </button>
      )}

      <button
        onClick={handleDownloadLogs}
        disabled={logs.length === 0}
      >
        Pobierz
      </button>

      {error && (
        <div>
          Error: {error.message || 'Nie udało się pobrać lokalizacji. Sprawdź uprawnienia aplikacji.'}
        </div>
      )}

      <LogEntryList
        logs={logs}
        onUpdateComment={handleUpdateComment}
        onDeleteLog={handleDeleteLog}
      />
    </div>
  );
};

export default LocationLogger;