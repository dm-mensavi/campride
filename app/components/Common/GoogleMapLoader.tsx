// import React, { FC } from 'react';
// import { useLoadScript } from '@react-google-maps/api';

// interface GoogleMapLoaderProps {
//   apiKey: string;
//   children: React.ReactNode;
// }

// const GoogleMapLoader: FC<GoogleMapLoaderProps> = ({ apiKey, children }) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: apiKey,
//     libraries: ['places'],
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return <>{children}</>;
// };

// export default GoogleMapLoader;
