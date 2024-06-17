import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

interface Coordinate {
  lat: number;
  lng: number;
}

interface GoogleMapComponentProps {
  coordinates: Coordinate[];
  pickup: Coordinate;
  dropoff: Coordinate;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ coordinates, pickup, dropoff }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(userLoc);
          if (map) {
            map.setCenter(userLoc);
          }
        },
        (error) => {
          console.error('Error getting the user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [map]);

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
    if (userLocation) {
      map.setCenter(userLocation);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={userLocation || { lat: 6.68275, lng: -1.57699 }} // default center if user location is not available
      zoom={14}
      onLoad={onLoad}
    >
      {coordinates.map((coord, index) => (
        <Marker key={index} position={{ lat: coord.lat, lng: coord.lng }} />
      ))}
      {userLocation && (
        <Marker
          position={userLocation}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: new google.maps.Size(40, 40),
          }}
        />
      )}
      {pickup && (
        <Marker
          position={pickup}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            scaledSize: new google.maps.Size(40, 40),
          }}
        />
      )}
      {dropoff && (
        <Marker
          position={dropoff}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new google.maps.Size(40, 40),
          }}
        />
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
