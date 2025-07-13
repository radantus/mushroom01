import { useState } from 'react';

interface Position {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  timestamp: number;
}

export const useGeoLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  const getCurrentPosition = (): Promise<Position> => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setError(null);

      if (!navigator.geolocation) {
        const error = new Error('Twoja przeglądarka nie obsługuje geolokalizacji');
        setError(error as unknown as GeolocationPositionError);
        setIsLoading(false);
        reject(error);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLoading(false);
          resolve(position);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
          reject(error);
        },
        // Options
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  };

  return {
    getCurrentPosition,
    isLoading,
    error
  };
};
