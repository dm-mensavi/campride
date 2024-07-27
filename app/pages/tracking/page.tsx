"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { drivers } from '../../data/drivers';
import GoogleMapComponent from '../../components/Common/GoogleMapComponent';
import { Driver } from '../../types';
import tw from 'tailwind-styled-components';

const Tracking = () => {
  const searchParams = useSearchParams();
  const selectedDriverIds = searchParams.get('driverIds')?.split(',') || [];
  const pickupLat = parseFloat(searchParams.get('pickupLat') || '0');
  const pickupLng = parseFloat(searchParams.get('pickupLng') || '0');
  const dropoffLat = parseFloat(searchParams.get('dropoffLat') || '0');
  const dropoffLng = parseFloat(searchParams.get('dropoffLng') || '0');

  const [isLoading, setIsLoading] = useState(true);
  const [minutesLeft, setMinutesLeft] = useState(10); // initial countdown time in minutes

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000); // Simulating loading time

    const interval = setInterval(() => {
      setMinutesLeft(prevMinutes => (prevMinutes > 0 ? prevMinutes - 1 : 0));
    }, 60000); // Decrement every minute (60000 ms)

    return () => clearInterval(interval);
  }, []);

  const trackedDrivers: Driver[] = drivers.filter(driver => 
    selectedDriverIds.includes(driver._id)
  );

  return (
    <Container>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
          <LoadingText>Loading Map...</LoadingText>
        </LoaderContainer>
      ) : (
        <>
          <MapContainer>
            <GoogleMapComponent
              drivers={trackedDrivers}
              pickup={{ lat: pickupLat, lng: pickupLng }}
              dropoff={{ lat: dropoffLat, lng: dropoffLng }}
            />
          </MapContainer>
          <DetailsContainer>
            <BusList>
              {trackedDrivers.map((driver: Driver, index) => (
                <BusItem key={index}>
                  <p className="font-bold">Bus Number: {driver.shuttle_number}</p>
                  <p>Arriving in {minutesLeft} minutes</p>
                  <ProgressBar>
                    <Progress progress={(10 - minutesLeft) * 10} />
                  </ProgressBar>
                </BusItem>
              ))}
            </BusList>
          </DetailsContainer>
        </>
      )}
    </Container>
  );
};

export default Tracking;

const Container = tw.div`
  min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-100 relative
`;

const LoaderContainer = tw.div`
  flex flex-col items-center justify-center min-h-screen w-full
`;

const Loader = tw.div`
  border-4 border-t-4 border-blue-500 border-solid rounded-full h-12 w-12 animate-spin
`;

const LoadingText = tw.p`
  mt-4 text-xl font-bold text-gray-700
`;

const MapContainer = tw.div`
  w-full h-full
`;

const DetailsContainer = tw.div`
  w-full max-w-md bg-white p-4 rounded-lg shadow-md fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 z-10
`;

const BusList = tw.ul`
  list-none p-0
`;

const BusItem = tw.li`
  mb-2
`;

const ProgressBar = tw.div`
  w-full bg-gray-200 rounded-full h-2.5 mt-2
`;

const Progress = tw.div<{ progress: number }>`
  bg-blue-500 h-2.5 rounded-full transition-width duration-300 ease-in-out
  ${({ progress }) => `width: ${progress}%;`}
`;
