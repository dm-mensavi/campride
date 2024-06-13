export interface Bus {
  route: string;
  imgUrl: string;
  driver: string;
  number: string;
  lat: number;
  long: number;
}

export interface Coordinate {
  lat: number;
  long: number;
}