// import {
// 	APIProvider,
// 	Map,
// 	AdvancedMarker,
// 	useMap,
// 	useMapsLibrary,
// } from "@vis.gl/react-google-maps";
// import React, { useEffect, useState } from "react";
// import { Driver, Coordinates } from "@/app/types";

// interface GoogleMapComponentProps {
// 	drivers: Driver[];
// 	pickup: Coordinates;
// 	dropoff: Coordinates;
// }

// const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
// 	drivers,
// 	pickup,
// 	dropoff,
// }) => {
// 	const map = useMap();
// 	const routeLibrary = useMapsLibrary("routes");
// 	const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
// 	const [walkingDirections, setWalkingDirections] =
// 		useState<google.maps.DirectionsResult | null>(null);

// 	useEffect(() => {
// 		if (navigator.geolocation) {
// 			navigator.geolocation.getCurrentPosition(
// 				(position) => {
// 					const userLoc = {
// 						lat: position.coords.latitude,
// 						lng: position.coords.longitude,
// 					};
// 					setUserLocation(userLoc);
// 					if (map) {
// 						map.setCenter(userLoc);
// 					}
// 				},
// 				(error) => {
// 					console.error("Error getting the user location:", error);
// 				}
// 			);
// 		} else {
// 			console.error("Geolocation is not supported by this browser.");
// 		}
// 	}, [map]);

// 	// useEffect(() => {
// 	// 	if (userLocation && pickup) {
// 	// 		const directionsService = new google.maps.DirectionsService();
// 	// 		directionsService.route(
// 	// 			{
// 	// 				origin: userLocation,
// 	// 				destination: pickup,
// 	// 				travelMode: google.maps.TravelMode.WALKING,
// 	// 			},
// 	// 			(result, status) => {
// 	// 				if (status === google.maps.DirectionsStatus.OK && result) {
// 	// 					setWalkingDirections(result);
// 	// 				} else {
// 	// 					console.error(`Error fetching walking directions: ${status}`);
// 	// 				}
// 	// 			}
// 	// 		);
// 	// 	}
// 	// }, [userLocation, pickup]);

// 	useEffect(
// 		() => {
// 			if (!routeLibrary && !map) {
// 				return;
// 			}
//       console.log("Testing: ",(routeLibrary)
// 		} // Add a comma here
// 	);

// 	return (
// 		<APIProvider
// 			solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
// 			apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
// 			<Map
// 				defaultZoom={8}
// 				defaultCenter={{ lat: -34.397, lng: 150.644 }}
// 				gestureHandling={"greedy"}
// 				disableDefaultUI={true}>
// 				{drivers.map((driver, index) => (
// 					<AdvancedMarker
// 						key={index}
// 						position={driver.location}
// 						// label={driver.shuttle_number}
// 					/>
// 				))}
// 				{userLocation && <AdvancedMarker position={userLocation} />}
// 				{pickup && <AdvancedMarker position={pickup} />}
// 				{dropoff && <AdvancedMarker position={dropoff} />}
// 				{/* {walkingDirections && (
// 					<DirectionsRenderer
// 						directions={walkingDirections}
// 						options={{
// 							polylineOptions: {
// 								strokeColor: "#0000FF",
// 								strokeWeight: 4,
// 								strokeOpacity: 0.6,
// 							},
// 						}}
// 					/>
// 				)} */}
// 			</Map>
// 		</APIProvider>
// 	);
// };

// export default GoogleMapComponent;
