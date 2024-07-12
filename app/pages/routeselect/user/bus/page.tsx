"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { drivers } from "../../../../data/drivers";
import { shuttles } from "@/app/data/buses";
import { Driver } from "../../../../types";
import tw from "tailwind-styled-components";

const Container = tw.div`
  min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-200 to-green-300
`;

const Card = tw.div`
  w-full max-w-md bg-white px-4 py-10 rounded-lg shadow-md
`;

const Title = tw.h1`
  text-xl text-center lg:text-2xl font-bold mb-4 text-gray-800
`;

const BusList = tw.ul`
  list-none p-0
`;

const BusItem = tw.li`
  flex items-center p-4 border-b border-gray-200 last:border-none cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-200
`;

const BusInfo = tw.div`
  flex flex-col
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
  w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 mt-4
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
