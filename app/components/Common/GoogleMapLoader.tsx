import React from 'react';
import useLoadGoogleMapsScript from '../../hooks/useLoadGoogleMapsScript';

interface GoogleMapLoaderProps {
  apiKey: string;
  children: React.ReactNode;
}

const GoogleMapLoader: React.FC<GoogleMapLoaderProps> = ({ apiKey, children }) => {
  const isLoaded = useLoadGoogleMapsScript(apiKey);

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return <>{children}</>;
};

export default GoogleMapLoader;
