import mongoose, { Document, Model, Schema } from "mongoose";
import { Shuttle as ShuttleType } from "../types/index";

interface ShuttleDocument extends ShuttleType, Document {}

const shuttleSchema: Schema = new mongoose.Schema({
  shuttle_number: {
    type: String,
    required: true,
  },
  shuttle_type: {
    type: String,
    required: true,
  },
  shuttle_image_url: {
    type: String,
    required: true,
  },
  shuttle_icon: {
    type: String,
    required: true,
  }
});

const Shuttle: Model<ShuttleDocument> = mongoose.models.Shuttle || mongoose.model<ShuttleDocument>("Shuttle", shuttleSchema);

export default Shuttle;
