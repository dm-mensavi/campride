import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 6.68275,  // Example latitude for center
  lng: -1.57699  // Example longitude for center
};

interface Coordinate {
  lat: number;
  long: number;
}

interface GoogleMapComponentProps {
  coordinates: Coordinate[];
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ coordinates }) => {
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={14}
    >
      {coordinates.map((coord, index) => (
        <Marker key={index} position={{ lat: coord.lat, lng: coord.long }} />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
