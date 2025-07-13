import React from 'react';
import { LogEntry } from '../types/types';
import LogEntryItem from './LogEntryItem';

interface LogEntryListProps {
  logs: LogEntry[];
  onUpdateComment: (id: string, comment: string) => void;
  onDeleteLog: (id: string) => void;
}

const LogEntryList: React.FC<LogEntryListProps> = ({ 
  logs, 
  onUpdateComment,
  onDeleteLog
}) => {
  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">Brak zapisanych pinezek. Kliknij "Zapisz pinezkę" aby rozpocząć. </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <h2 className="text-xl font-semibold text-gray-800">Twoje Pinezki</h2>
        <p className="text-gray-600 text-sm">Suma: {logs.length}</p>
      </div>
      <div className="divide-y divide-gray-200">
        {logs.map(log => (
          <LogEntryItem 
            key={log.id} 
            log={log} 
            onUpdateComment={onUpdateComment}
            onDeleteLog={onDeleteLog}
          />
        ))}
      </div>
    </div>
  );
};

export default LogEntryList;
