"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { drivers } from "../../../../data/drivers";
import { Driver } from "../../../../types";
import tw from "tailwind-styled-components";

const SelectBus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const route = searchParams.get("route");
  const pickup = searchParams.get("pickup");
  const dropoff = searchParams.get("dropoff");
  const pickupLat = searchParams.get("pickupLat");
  const pickupLng = searchParams.get("pickupLng");
  const dropoffLat = searchParams.get("dropoffLat");
  const dropoffLng = searchParams.get("dropoffLng");

  const filteredDrivers: Driver[] = drivers.filter(
    (driver) => driver.route === route
  );
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);

  const handleSelectDriver = (driver_id: string) => {
    setSelectedDrivers((prev) =>
      prev.includes(driver_id)
        ? prev.filter((id) => id !== driver_id)
        : [...prev, driver_id]
    );
  };

  useEffect(() => {
    console.log("Selected drivers are", selectedDrivers);
  }, [selectedDrivers]);

  const handleSubmit = () => {
    const selectedDriversString = selectedDrivers.join(",");
    router.push(
      `/pages/tracking?driverIds=${selectedDriversString}&pickup=${pickup}&dropoff=${dropoff}&pickupLat=${pickupLat}&pickupLng=${pickupLng}&dropoffLat=${dropoffLat}&dropoffLng=${dropoffLng}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Select Bus for Route: {route}</h1>
        <ul className="list-none p-0">
          {filteredDrivers.map((driver, index) => (
            <BusItem
              key={index}
              onClick={() => handleSelectDriver(driver.id)}
              className={
                selectedDrivers.includes(driver.id) ? "bg-gray-200" : ""
              }
            >
              <div>
                <p className="font-bold">{driver.name}</p>
                <p>Bus Number: {driver.id}</p>
                <p>Bus Number: {driver.shuttle_number}</p>
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
