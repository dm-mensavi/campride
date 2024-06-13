import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

interface Coordinate {
  lat: number;
  lng: number;
}

interface GoogleMapComponentProps {
  coordinates: Coordinate[];
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ coordinates }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinate | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.onload = initializeGoogleMap;
      document.body.appendChild(googleMapsScript);
    };

    const initializeGoogleMap = () => {
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 6.68275, lng: -1.57699 },
        zoom: 14
      });
      setMap(map);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          },
          (error) => {
            console.error('Error getting the user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    if (!window.google || !window.google.maps) {
      loadGoogleMapsScript();
    } else {
      initializeGoogleMap();
    }
  }, []);

  useEffect(() => {
    if (map && userLocation) {
      map.setCenter({ lat: userLocation.lat, lng: userLocation.lng });
    }
  }, [map, userLocation]);

  return (
    <div id="map" style={mapContainerStyle}>
      {map && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat: 6.68275, lng: -1.57699 }}
          zoom={14}
          onLoad={(map) => setMap(map)}
        >
          {coordinates.map((coord, index) => (
            <Marker key={index} position={{ lat: coord.lat, lng: coord.lng }} />
          ))}
          {userLocation && (
            <Marker
              position={{ lat: userLocation.lat, lng: userLocation.lng }}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new google.maps.Size(40, 40)
              }}
            />
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default GoogleMapComponent;
