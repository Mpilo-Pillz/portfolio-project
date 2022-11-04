import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { Place } from "./place";

export interface User {
  name: string;
  email: string;
  password: string;
  image: string;
  places: Place[];
}
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});

userSchema.plugin(uniqueValidator);

// module.exports = mongoose.model("User", userSchema);
export default mongoose.model<User>("User", userSchema);
