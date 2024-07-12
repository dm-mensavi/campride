"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import tw from 'tailwind-styled-components';
import { locations } from '../../../data/locations';
import SignOutButton from '@/app/components/Auth/SignOutButton';

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
    <Wrapper>
      <FormContainer>
        <Title>Select Pickup and Drop-off</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Pickup Location</Label>
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
          </InputGroup>
          <InputGroup>
            <Label>Dropoff Location</Label>
            <Select value={dropoff} onChange={(e) => setDropoff(e.target.value)} disabled={!pickup}>
              <option value="" disabled>
                Select dropoff location
              </option>
              {pickup &&
                locations
                  .find((location) => location.name === pickup)
                  ?.allowed_drop_offs.map((dropoffLocation, index) => (
                    <option key={index} value={dropoffLocation}>
                      {dropoffLocation}
                    </option>
                  ))}
            </Select>
          </InputGroup>
          <Button type="submit">Submit</Button>
          <SignOutButton />
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default SelectPickupDropoff;
const Wrapper = tw.div`
  min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4
`;

const FormContainer = tw.div`
  w-full max-w-lg bg-white p-8 rounded-xl shadow-xl
`;

const Title = tw.h1`
  text-2xl md:text-3xl font-extrabold mb-8 text-center text-gray-900
`;

const Form = tw.form`
  space-y-8
`;

const InputGroup = tw.div`
  flex flex-col
`;

const Label = tw.label`
  mb-2 font-semibold text-gray-700
`;

const Select = tw.select`
  p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ease-in-out bg-gray-50 text-gray-700
`;

const Button = tw.button`
  mt-8 w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-blue-700 transition-colors duration-300 ease-in-out font-semibold text-xl shadow-md
`;
