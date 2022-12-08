import * as dotenv from "dotenv";
import axios from "axios";
import HttpError from "../src/models/http-error";

dotenv.config();

export async function getCoordsForAddress(address: string): Promise<{
  lat: number;
  lng: number;
}> {
  // return {
  //   lat: -26.3152423,
  //   lng: 31.1196755,
  // };

  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  console.log("response-->", response);

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );

    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}
