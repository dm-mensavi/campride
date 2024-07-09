import exp from "constants";

export interface Shuttle {
	shuttle_number: string;
	shuttle_type: string;
	shuttle_image_url: string;
	shuttle_icon: string;
}

export interface Driver {
	id: string;
	name: string;
	route: string;
	shuttle_number: Shuttle.shuttle_number;
	shift_start: string;
	shift_end: string;
	location: Coordinates;
}
export interface Coordinates {
	lat: number;
	lng: number;
}


export interface User {
	id: string;
	name: string;
	fav_route: string;
	pickup_location: string;
	dropoff_location: string;
	location: Coordinates;
}

export interface Routes {
  []: string;
}

interface Location {
  name: string;
  route: string;
  coordinates: [number, number];
  allowed_drop_offs: string[];
}