"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { busList } from '../../data/buses';
import GoogleMapComponent from '../../components/Common/GoogleMapComponent';
import GoogleMapLoader from '../../components/Common/GoogleMapLoader';
import { Bus } from '../../types';

const Tracking = () => {
  const searchParams = useSearchParams();
  const busIds = searchParams.get('busIds')?.split(',') || [];
  
  const trackedBuses: Bus[] = busIds.map(id => 
    busList.find(bus => bus.number === id)
  ).filter((bus): bus is Bus => !!bus);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Tracking Buses</h1>
        <GoogleMapLoader apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
          <GoogleMapComponent coordinates={trackedBuses.map(bus => ({ lat: bus.lat, lng: bus.long }))} />
        </GoogleMapLoader>
        <ul className="list-none p-0">
          {trackedBuses.map((bus, index) => (
            <li key={index} className="mb-2">
              <p className="font-bold">Bus Number: {bus.number}</p>
              <p>Driver: {bus.driver}</p>
              <p>Coordinates: ({bus.lat}, {bus.long})</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tracking;
