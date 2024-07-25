// import { Shuttle} from '../types';

// const getShuttleImage = (shuttle_id: Shuttle.shuttle_number) => { 
//   const shuttleImage = Shuttle.find((bus) => bus.shuttle_number === shuttle);
//   return shuttleImage?.shuttle_image_url || '/public/Rides/shuttle-green.png';
// }

// import { drivers } from '@/app/data/drivers';
// async function populateDrivers() {
//   try {
//     await initMongoose();
//     const driverPromises = drivers.map(driver => new DriverModel(driver).save());
//     await Promise.all(driverPromises);
//     console.log('Database populated with drivers data.');
//   } catch (error) {
//     console.error('Error populating the database:', error);
//   } finally {
//     await mongoose.connection.close();
//   }
// }
// populateDrivers();