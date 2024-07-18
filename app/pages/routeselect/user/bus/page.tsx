"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { drivers } from "../../../../data/drivers";
import { shuttles } from "@/app/data/buses";
import { Driver } from "../../../../types";
import tw from "tailwind-styled-components";

const Container = tw.div`
  min-h-screen flex flex-col items-center justify-center p-4 sm:bg-gradient-to-br sm:from-blue-200 sm:to-green-300
`;

const Card = tw.div`
  sm:w-full -mt-16 sm:mt-0 sm:max-w-md sm:bg-white sm:px-4 sm:py-10 sm:rounded-lg sm:shadow-md
`;

const Title = tw.h1`
  text-xl text-center lg:text-2xl font-bold mb-4 text-gray-800
`;

const BusList = tw.ul`
  list-none p-0
`;

const BusItem = tw.li`
  flex items-center p-6 border-b border-gray-200 last:border-none cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-200
`;

const BusInfo = tw.div`
  flex flex-col ml-5
`;

const DriverName = tw.p`
  font-bold text-lg lg:text-xl text-gray-900 mb-1
`;

const BusNumber = tw.p`
  text-gray-700 text-base lg:text-lg
`;

const ShuttleNumber = tw.p`
  text-gray-700 text-base lg:text-lg
`;

const SubmitButton = tw.button`
  w-full mt-4 bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-blue-700 transition-colors duration-300 ease-in-out font-semibold text-xl shadow-md
`;

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

  const getShuttleImage = (shuttle_number: string) => {
    const shuttle = shuttles.find(
      (shuttle) => shuttle.shuttle_number === shuttle_number
    );
    return shuttle ? shuttle.shuttle_image_url : "/Rides/shuttle-green.png";
  };

  const handleSubmit = () => {
    const selectedDriversString = selectedDrivers.join(",");
    router.push(
      `/pages/tracking?driverIds=${selectedDriversString}&pickup=${pickup}&dropoff=${dropoff}&pickupLat=${pickupLat}&pickupLng=${pickupLng}&dropoffLat=${dropoffLat}&dropoffLng=${dropoffLng}`
    );
  };

  return (
    <Container>
      <Card>
        <Title>Select Bus for Route: {route}</Title>
        <BusList>
          {filteredDrivers.map((driver, index) => (
            <BusItem
              key={index}
              onClick={() => handleSelectDriver(driver.id)}
              className={
                selectedDrivers.includes(driver.id) ? "bg-blue-100" : ""
              }
            >
              <Image
                src={getShuttleImage(driver.shuttle_number)}
                alt={`Shuttle ${driver.shuttle_number}`}
                width={100}
                height={100}
                className="mr-4 rounded-lg"
              />
              <BusInfo>
                <DriverName>{driver.name}</DriverName>
                <BusNumber>Bus Number: {driver.id}</BusNumber>
                <ShuttleNumber>Shuttle Number: {driver.shuttle_number}</ShuttleNumber>
              </BusInfo>
            </BusItem>
          ))}
        </BusList>
        <SubmitButton onClick={handleSubmit}>Track Selected Buses</SubmitButton>
      </Card>
    </Container>
  );
};

export default SelectBus;
