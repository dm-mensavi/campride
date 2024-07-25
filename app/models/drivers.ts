import mongoose, { Schema, Document } from "mongoose";
import { Driver as DriverType } from "../types"; 
interface DriverDocument extends DriverType, Document {}

const locationSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const driverSchema = new Schema<DriverDocument>({
  name: { type: String, required: true },
  route: { type: String, required: true },
  shuttle_number: { type: String, required: true },
  shift_start: { type: String, required: false },
  shift_end: { type: String, required: false },
  location: { type: locationSchema, required: false },
});

// Create or retrieve the Driver model
const DriverModel = mongoose.models.Driver || mongoose.model<DriverDocument>("Driver", driverSchema);

export default DriverModel;