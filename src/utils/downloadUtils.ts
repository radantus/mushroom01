import { LogEntry } from '../types/types';
import { formatDate, formatTime } from './dateUtils';

export const downloadLogs = (logs: LogEntry[]) => {
  // Create a formatted version of the logs for the file
  const formattedLogs = logs.map(log => {
    const timestamp = new Date(log.timestamp);
    return {
      date: formatDate(timestamp),
      time: formatTime(timestamp),
      latitude: log.latitude,
      longitude: log.longitude,
      comment: log.comment
    };
  });

  // Create the JSON file
  const jsonString = JSON.stringify(formattedLogs, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Create a download link and trigger it
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = `geo-logs-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  
  // Clean up
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
};