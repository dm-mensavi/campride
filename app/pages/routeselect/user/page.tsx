"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import tw from 'tailwind-styled-components';
import { locations } from '../../../data/locations';

const SelectPickupDropoff = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const router = useRouter();

  const handlePickupChange = (e: any) => {
    setPickup(e.target.value);
    setDropoff(''); // Reset dropoff when pickup changes
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const selectedRoute = locations.find(location => location.name === pickup)?.route;
    if (selectedRoute) {
      const pickupLocation = locations.find(location => location.name === pickup)?.coordinates;
      const dropoffLocation = locations.find(location => location.name === dropoff)?.coordinates;
      if (pickupLocation && dropoffLocation) { // Add null check for pickupLocation and dropoffLocation
        router.push(`/pages/routeselect/user/bus?route=${selectedRoute}&pickup=${pickup}&dropoff=${dropoff}&pickupLat=${pickupLocation[1]}&pickupLng=${pickupLocation[0]}&dropoffLat=${dropoffLocation[1]}&dropoffLng=${dropoffLocation[0]}`);
      } else {
        console.error('Invalid pickup or dropoff location');
      }
    } else {
      console.error('No route found for the selected pickup location');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Select Pickup and Drop-off</h1>
        <form onSubmit={handleSubmit}>
          <InputBoxes>
            <label className="mb-2 font-medium text-gray-700">Pickup Location</label>
            <Select value={pickup} onChange={handlePickupChange}>
              <option value="" disabled>
                Select pickup location
              </option>
              {locations.map((location, index) => (
                <option key={index} value={location.name}>
                  {location.name}
                </option>
              ))}
            </Select>
            <label className="mt-4 mb-2 font-medium text-gray-700">Dropoff Location</label>
            <Select value={dropoff} onChange={(e) => setDropoff(e.target.value)} disabled={!pickup}>
              <option value="" disabled>
                Select dropoff location
              </option>
              {pickup &&
                locations
                  .find((location) => location.name === pickup)
                  ?.allowedDropoffs.map((dropoffLocation, index) => (
                    <option key={index} value={dropoffLocation}>
                      {dropoffLocation}
                    </option>
                  ))}
            </Select>
          </InputBoxes>
          <button
            type="submit"
            className="mt-6 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SelectPickupDropoff;

const InputBoxes = tw.div`
  flex flex-col
`;

const Select = tw.select`
  p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500
`;
