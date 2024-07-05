"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { drivers } from '../../data/drivers';
import GoogleMapComponent from '../../components/Common/GoogleMapComponent';
import GoogleMapLoader from '../../components/Common/GoogleMapLoader';
import { Driver } from '../../types';

const Tracking = () => {
  const searchParams = useSearchParams();
  const selectedDriverIds = searchParams.get('driverIds')?.split(',') || [];
  const pickupLat = parseFloat(searchParams.get('pickupLat') || '0');
  const pickupLng = parseFloat(searchParams.get('pickupLng') || '0');
  const dropoffLat = parseFloat(searchParams.get('dropoffLat') || '0');
  const dropoffLng = parseFloat(searchParams.get('dropoffLng') || '0');

  console.log('Selected drivers IDs from Tracking', selectedDriverIds);
  
  const trackedDrivers: Driver[] = drivers.filter(driver => 
    selectedDriverIds.includes(driver.id)
  );

  console.log('Tracked drivers', trackedDrivers);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Tracking Buses</h1>
        <GoogleMapLoader apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
          <GoogleMapComponent
            drivers={trackedDrivers}
            pickup={{ lat: pickupLat, lng: pickupLng }}
            dropoff={{ lat: dropoffLat, lng: dropoffLng }}
          />
        </GoogleMapLoader>
        <ul className="list-none p-0">
          {trackedDrivers.map((driver: Driver, index) => (
            <li key={index} className="mb-2">
              <p className="font-bold">Bus Number: {driver.shuttle_number}</p>
              <p>Driver: {driver.name}</p>
              <p>Route: {driver.route}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tracking;
