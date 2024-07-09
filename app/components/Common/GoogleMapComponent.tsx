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
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { drivers } from "@/app/data/drivers";
import { shuttles } from "@/app/data/buses";
import { Driver, Coordinates } from "@/app/types";

interface GoogleMapComponentProps {
	drivers: Driver[];
	pickup: Coordinates;
	dropoff: Coordinates;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
	drivers,
	pickup,
	dropoff,
}) => {
	//write a function to get the user location
	// useEffect(() => {
	//   if (navigator.geolocation) {
	//     navigator.geolocation.getCurrentPosition(
	//       (position) => {
	//         const userLoc = {
	//           lat: position.coords.latitude,
	//           lng: position.coords.longitude,
	//         };
	//         setUserLocation(userLoc);
	//       },
	//       (error) => {
	//         console.error("Error getting the user location:", error);
	//       }
	//     );
	//   } else {
	//     console.error("Geolocation is not supported by this browser.");
	//   }
	// }, []);

	// useeffect for pickup marker
	// useEffect(() => {
	//   if (userLocation && pickup) {
	//     const directionsService = new google.maps.DirectionsService();
	//     directionsService.route(
	//       {
	//         origin: userLocation,
	//         destination: pickup,
	//         travelMode: google.maps.TravelMode.WALKING,
	//       },
	//       (result, status) => {
	//         if (status === google.maps.DirectionsStatus.OK && result) {
	//           setWalkingDirections(result);
	//         } else {
	//           console.error("Error fetching walking directions:", status);
	//         }
	//       }
	//     );
	//   }
	// }, [userLocation, pickup]);
	const userLocation = { lat: 6.68275, lng: -1.57699 };

	const INITIAL_CAMERA = useMemo(
		() => ({
			center: userLocation ? userLocation : { lat: 6.68275, lng: -1.57699 },
			zoom: 15,
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
					{/* <Driver Marks/> */}
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

					{/* Pickup Marker */}
					{pickup && (
						<AdvancedMarker position={pickup}>
							<Image
								src="/shuttle_stop.png"
								alt="pickup"
								width={50}
								height={50}
							/>
						</AdvancedMarker>
					)}
					{/* Dropoff Marker */}
					{dropoff && (
						<AdvancedMarker position={dropoff}>
							<Image
								src="/shuttle_stop.png"
								alt="dropoff"
								width={50}
								height={50}
							/>
						</AdvancedMarker>
					)}
					{/* User Location*/}
          {userLocation && (
            <AdvancedMarker position={userLocation}>
              <Image
                src="/user-female.png"
                alt="user"
                width={40}
                height={40}
              />
            </AdvancedMarker>
          )}
				</Map>
			</APIProvider>
		</div>
	);
};

// const shuttle = shuttles.filter((shuttle) => shuttle.shuttle_number === shuttle.shuttle_number);

export default GoogleMapComponent;
