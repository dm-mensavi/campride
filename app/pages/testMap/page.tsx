"use client";
import {
	APIProvider,
	Map,
	AdvancedMarker,
	useMap,
	useMapsLibrary,
	MapCameraProps,
	MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { useMemo, useState } from "react";
import Image from "next/image";
import { drivers } from "@/app/data/drivers";
import { shuttles } from "@/app/data/buses";
import { Driver, Coordinates } from "@/app/types";
import { get } from "http";

interface GoogleMapComponentProps {
	drivers: Driver[];
	pickup: Coordinates;
	dropoff: Coordinates;
}

const GoogleMapComponent = () => {
	const INITIAL_CAMERA = useMemo(
		() => ({
			center: { lat: 6.68275, lng: -1.57699 },
			zoom: 14,
		}),
		[]
	);

	const [cameraProp, setCameraProp] = useState<MapCameraProps>(INITIAL_CAMERA);
	const handleCameraChange = (camera: MapCameraChangedEvent) => {
		// console.log("Camera changed", camera.detail)
		return setCameraProp(camera.detail);
	};

	return (
		<div style={{ display: "flex", height: "100dvh", width: "100%" }}>
			<APIProvider
				apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
				<Map
					{...cameraProp}
					onCameraChanged={handleCameraChange}
					mapId="33570c96c3587029">
					{/* <Markers/> */}
					{drivers.map((driver, index) => {
						// console.log("Driver location", driver.location);
						return (
							<AdvancedMarker key={index} position={driver.location}>
								<Image
									src={
										shuttles.at(index).shuttle_image_url
											? shuttles.at(index).shuttle_image_url
											: "../../../public/Rides/campride-green.png"
									}
									alt="shuttle"
									width={50}
									height={50}
								/>
							</AdvancedMarker>
						);
					})}
				</Map>
			</APIProvider>
		</div>
	);
};

// const shuttle = shuttles.filter((shuttle) => shuttle.shuttle_number === shuttle.shuttle_number);

export default GoogleMapComponent;
