"use client";
import GoogleMapComponent from '@/app/components/Common/GoogleMapComponent';
import withAuth from '../../hoc/withAuth';

const DriverDashboard = () => {
  return (
    <div>
      <h1>Driver Dashboard</h1>
      {/* Driver dashboard content */}
      {/* <GoogleMapComponent /> */}
    </div>
  );
};

export default withAuth(DriverDashboard);
