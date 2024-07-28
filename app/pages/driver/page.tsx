"use client";

import {
	APIProvider,
	Map,
	useMap,
	useMapsLibrary,
	AdvancedMarker,
	MapCameraProps,
	MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import {
	useMemo,
	useState,
	useEffect,
	createContext,
	useContext,
	SetStateAction,
} from "react";
import Image from "next/image";
import { shuttles } from "@/app/data/buses";
import { drivers } from "@/app/data/drivers";
// import { locations as stops } from "@/app/data/locations";
import { Driver, Coordinates } from "@/app/types";

// Context to manage user location state
const CurrentOriginContext = createContext<{
	userLocation: { lat: number; lng: number };
	setUserLocation: React.Dispatch<SetStateAction<{ lat: number; lng: number }>>;
}>(null);

const GoogleMapComponent: React.FC = () => {
	// const drivers = [
	//   { name: "John Doe", route: "Commercial Area to KSB", location: { lat: 6.67342, lng: -1.567498 }, shuttle_number: "S1" },
	//   { name: "Jane Smith", route: "Brunei to KSB", location: { lat: 6.68275, lng: -1.57699 }, shuttle_number: "S2" },
	//   { name: "Bob Johnson", route: "CCB to Medical Village", location: { lat: 6.67300, lng: -1.56450 }, shuttle_number: "S3" },
	// ];

	const stops = [
		// { name: "Stop 1", location: { lat: 6.67142, lng: -1.566498 } },
		// { name: "Stop 2", location: { lat: 6.67242, lng: -1.567498 } },
		{
			name: "Central Bus Stop (Commercial Area)",
			coordinates: { lat: 6.68275, lng:-1.57699  },
		},
		{ name: "KSB Bus Stop", coordinates: { lat:6.66932 , lng: -1.56719 } },
	];

	const [userLocation, setUserLocation] = useState<{
		lat: number;
		lng: number;
	}>({ lat: 6.68275, lng: -1.57699 });

	const getShuttleImage = (shuttle_number: string) => {
		const shuttle = shuttles.find(
			(shuttle) => shuttle.shuttle_number === shuttle_number
		);
		return shuttle ? shuttle.shuttle_image_url : "/Rides/shuttle-green.png";
	};

	const INITIAL_CAMERA = useMemo(
		() => ({
			center: { lat: 6.675424, lng: -1.56788 }, //-1.56788, 6.675424
			zoom: 15,
		}),
		[]
	);

	const [cameraProp, setCameraProp] = useState<MapCameraProps>(INITIAL_CAMERA);
	const handleCameraChange = (camera: MapCameraChangedEvent) => {
		setCameraProp(camera.detail);
	};

	// const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
	// const randomPickup = stops[Math.floor(Math.random() * stops.length)];
	// const randomDropoff = stops[Math.floor(Math.random() * stops.length)];

	return (
		<div style={{ display: "flex", height: "100dvh", width: "100%" }}>
			<APIProvider
				apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
				<Map
					{...cameraProp}
					onCameraChanged={handleCameraChange}
					mapId="33570c96c3587029">
					<AdvancedMarker position={{ lat:  6.6793, lng:-1.57281 }}>
						<Image
							src={getShuttleImage(drivers[0].shuttle_number)}
							alt="shuttle"
							width={50}
							height={50}
						/>
					</AdvancedMarker>

					<AdvancedMarker position={stops[0].coordinates}>
						<Image
							src="/shuttle_stop.png"
							alt="pickup"
							width={50}
							height={50}
						/>
					</AdvancedMarker>

					<AdvancedMarker position={stops[1].coordinates}>
						<Image
							src="/shuttle_stop.png"
							alt="dropoff"
							width={50}
							height={50}
						/>
					</AdvancedMarker>

					<CurrentOriginContext.Provider
						value={{ userLocation, setUserLocation }}>
						<Directions destination={stops[0].coordinates} />
					</CurrentOriginContext.Provider>
				</Map>
			</APIProvider>
		</div>
	);
};

export default GoogleMapComponent;

// Directions Component
const Directions = ({ destination }) => {
	const map = useMap();
	const routeLibrary = useMapsLibrary("routes");
	// const { userLocation, setUserLocation } = useContext(CurrentOriginContext);
	const [directionsRenderer, setDirectionsRenderer] =
		useState<google.maps.DirectionsRenderer | null>(null);
	const [directionService, setDirectionService] =
		useState<google.maps.DirectionsService | null>(null);

	// useEffect(() => {
	// 	if (navigator.geolocation) {
	// 		const watchId = navigator.geolocation.watchPosition(
	// 			(position) => {
	// 				const userLoc = {
	// 					lat: position.coords.latitude,
	// 					lng: position.coords.longitude,
	// 				};
	// 				setUserLocation(userLoc);
	// 			},
	// 			(error) => console.error("Error getting the user location:", error),
	// 			{ enableHighAccuracy: true, maximumAge: 0, timeout: 30000 }
	// 		);
	// 		return () => navigator.geolocation.clearWatch(watchId);
	// 	} else {
	// 		console.error("Geolocation is not supported by this browser.");
	// 	}
	// }, [setUserLocation]);

	useEffect(() => {
		if (!map || !routeLibrary) return;
		setDirectionService(new routeLibrary.DirectionsService());
		setDirectionsRenderer(new routeLibrary.DirectionsRenderer({ map }));
	}, [map, routeLibrary]);

	useEffect(() => {
		if (!directionService || !directionsRenderer) return;
		directionService
			.route({
				origin: { lat:  6.66932, lng: -1.56719 },
				destination: { lat: 6.68275, lng: -1.57699, },
				travelMode: google.maps.TravelMode.WALKING,
			})
			.then((result) => {
				directionsRenderer.setDirections(result);
			})
			.catch((er) => console.error(er));
	}, [directionService, directionsRenderer, destination]);

	return null;
};
