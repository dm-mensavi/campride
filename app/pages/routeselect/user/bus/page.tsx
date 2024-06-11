"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { busList } from '../../../../data/buses';
import tw from 'tailwind-styled-components';

const SelectBus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const route = searchParams.get('route');
  
  const filteredBuses = busList.filter(bus => bus.route === route);
  const [selectedBuses, setSelectedBuses] = useState<string[]>([]);

  const handleSelectBus = (busNumber: string) => {
    setSelectedBuses(prevState =>
      prevState.includes(busNumber)
        ? prevState.filter(id => id !== busNumber)
        : [...prevState, busNumber]
    );
  };

  const handleSubmit = () => {
    router.push(`/pages/tracking?busIds=${selectedBuses.join(',')}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Select Bus for Route: {route}</h1>
        <ul className="list-none p-0">
          {filteredBuses.map((bus, index) => (
            <BusItem 
              key={index}
              onClick={() => handleSelectBus(bus.number)}
              className={selectedBuses.includes(bus.number) ? 'bg-gray-200' : ''}
            >
              <div>
                <p className="font-bold">{bus.driver}</p>
                <p>Bus Number: {bus.number}</p>
              </div>
            </BusItem>
          ))}
        </ul>
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-300 mt-4"
        >
          Track Selected Buses
        </button>
      </div>
    </div>
  );
};

export default SelectBus;

const BusItem = tw.li`
  flex items-center p-4 border-b border-gray-200 last:border-none cursor-pointer
`;
