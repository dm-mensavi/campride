import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { Driver, Coordinates } from '@/app/types';

// Define the mapContainerStyle as a constant outside the component
const mapContainerStyle = {
  width: '400px',
  height: '400px'
};

interface GoogleMapComponentProps {
  drivers: Driver[];
  pickup: Coordinates;
  dropoff: Coordinates;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ drivers, pickup, dropoff }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
  });
  
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

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

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    if (userLocation) {
      map.setCenter(userLocation);
    }
  }, [userLocation]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={userLocation? userLocation : { lat: 6.68275, lng: -1.57699 }} // default center if user location is not available
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {drivers.map((driver, index) => (
        <MarkerF key={index} position={driver.location} label={driver.shuttle_number} />
      ))}
      {userLocation && (
        <MarkerF
          position={userLocation}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: new google.maps.Size(40, 40),
          }}
          label="User"
        />
      )}
      {pickup && (
        <MarkerF
          position={pickup}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
            scaledSize: new google.maps.Size(40, 40),
          }}
          label="Pickup"
        />
      )}
      {dropoff && (
        <MarkerF
          position={dropoff}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new google.maps.Size(40, 40),
          }}
          label="Dropoff"
        />
      )}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
