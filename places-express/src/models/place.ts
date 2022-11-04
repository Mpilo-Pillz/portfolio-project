import mongoose from "mongoose";

export interface Place {
  title: string;
  description: string;
  image: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  creator: any;
}
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

// module.exports = mongoose.model("Place", placeSchema);
export default mongoose.model<Place>("Place", placeSchema);
