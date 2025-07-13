import React, { useState } from 'react';
import { formatDate, formatTime } from '../utils/dateUtils';
import { MapPin, Calendar, Clock, Trash } from 'lucide-react';
import { LogEntry } from '../types/types';

interface LogEntryItemProps {
  log: LogEntry;
  onUpdateComment: (id: string, comment: string) => void;
  onDeleteLog: (id: string) => void;
}

const LogEntryItem: React.FC<LogEntryItemProps> = ({ 
  log, 
  onUpdateComment,
  onDeleteLog
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(log.comment);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSave = () => {
    onUpdateComment(log.id, comment);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommentSave();
    }
  };

  const timestamp = new Date(log.timestamp);

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center text-gray-600 text-sm gap-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
            <span>{formatDate(timestamp)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            <span>{formatTime(timestamp)}</span>
          </div>
        </div>
        <button 
          onClick={() => onDeleteLog(log.id)}
          className="text-red-600 hover:text-red-800 p-1 transition-colors self-end sm:self-auto"
          title="Kasuj wpis"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex items-start gap-2 mb-3">
        <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <div className="font-medium text-gray-800">
            {log.latitude.toFixed(6)}, {log.longitude.toFixed(6)}
          </div>
          <a 
            href={`https://www.google.com/maps?q=${log.latitude},${log.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
          >
            View on map
          </a>
        </div>
      </div>
      
      <div>
        {isEditing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={handleCommentChange}
              onKeyDown={handleKeyDown}
              placeholder="Add a comment..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <button
              onClick={handleCommentSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors text-sm"
            >
              Save
            </button>
          </div>
        ) : (
          <div 
            onClick={() => setIsEditing(true)}
            className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 cursor-text transition-colors"
          >
            {log.comment ? (
              <p className="text-gray-800">{log.comment}</p>
            ) : (
              <p className="text-gray-400 italic">Dodaj komentarz</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogEntryItem;
