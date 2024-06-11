"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import SignOutButton from '@/app/components/Auth/SignOutButton';

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
    router.push(`/pages/routeselect/user/stops?route=${encodeURIComponent(route)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Select User Route</h1>
        <ul className="list-disc ml-6 mb-4">
          {routes.map((route, index) => (
            <li key={index} className="mb-2 list-none">
              <button
                onClick={() => handleRouteSelect(route)}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                {route}
              </button>
            </li>
          ))}
        </ul>
        <SignOutButton />
      </div>
    </div>
  );
};

export default RouteSelect;
