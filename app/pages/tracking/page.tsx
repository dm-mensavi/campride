"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { busList } from '../../data/buses';
import GoogleMapComponent from '@/app/components/Common/GoogleMap';

const Tracking = () => {
  const searchParams = useSearchParams();
  const busIds = searchParams.get('busIds')?.split(',') || [];

  const trackedBuses = busIds.map(id => 
    busList.find(bus => bus.number === id)
  ).filter(Boolean); // filter out any undefined values

  const coordinates = trackedBuses.map(bus => ({
    locationX: bus.locationX,
    locationY: bus.locationY
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Tracking Buses</h1>
        <ul className="list-none p-0 mb-4">
          {trackedBuses.map((bus: any, index) => (
            <li key={index} className="mb-2">
              <p className="font-bold">Bus Number: {bus.number}</p>
              <p>Driver: {bus.driver}</p>
              <p>Coordinates: ({bus.locationX}, {bus.locationY})</p>
            </li>
          ))}
        </ul>
        <GoogleMapComponent coordinates={coordinates} />
      </div>
    </div>
  );
};

export default Tracking;
