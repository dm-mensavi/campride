import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

const center = {
  lat: -1.56719,
  lng: 6.66932
};

interface Coordinate {
  locationX: number;
  locationY: number;
}

interface GoogleMapComponentProps {
  coordinates: Coordinate[];
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ coordinates }) => {
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
      >
        {coordinates.map((coord, index) => (
          <Marker key={index} position={{ lat: coord.locationX, lng: coord.locationY }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
