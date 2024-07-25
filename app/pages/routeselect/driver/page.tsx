"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import tw from 'tailwind-styled-components';
import SignOutButton from '@/app/components/Auth/SignOutButton';


const Wrapper = tw.div`
  min-h-screen -mt-1 sm:mt-0 flex items-center justify-center sm:bg-gradient-to-r sm:from-green-400 sm:to-blue-500 p-4
`;

const FormContainer = tw.div`
  w-full sm:max-w-lg bg-white sm:p-8 sm:rounded-xl
`;

const Title = tw.h1`
  text-2xl md:text-3xl font-extrabold mb-8 text-center text-gray-900
`;

const Button = tw.button`
  mt-8 w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-blue-700 transition-colors duration-300 ease-in-out font-semibold text-xl shadow-md
`;

const Card = tw.div`
  w-full max-w-md bg-white p-6 rounded-lg 
`;

const ListItem = tw.li`
  @apply list-none list-style-none;
`;

const SignOutWrapper = tw.div`
  @apply mt-4 flex justify-center;
`;

const RouteSelect = () => {
  const routes = [
    "Commercial Area to KSB",
    "Brunei to KSB",
    "CCB to Medical Village",
    "Gaza to CCB",
    "Gaza to Medical Village"
  ];

  const router = useRouter();

  const handleRouteSelect = (route: string) => {
    router.push(`/pages/driver?route=${encodeURIComponent(route)}`);
  };

  return (
    <Wrapper>
      <Card>
        <Title>Select Route</Title>
        <FormContainer>
          {routes.map((route, index) => (
            <ListItem key={index}>
              <Button onClick={() => handleRouteSelect(route)}>
                {route}
              </Button>
            </ListItem>
          ))}
        </FormContainer>
        <SignOutWrapper>
          <SignOutButton />
        </SignOutWrapper>
      </Card>
    </Wrapper>
  );
};

export default RouteSelect;
