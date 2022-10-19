import { Router } from "express";
import {
  createPlace,
  deletePlace,
  getPlaceById,
  getPlacesByUserId,
  updatePlace,
} from "../controllers/places-controller";

const placesRoutes = Router();

placesRoutes.get("/:pid", getPlaceById);
placesRoutes.get("/user/:uid", getPlacesByUserId);
placesRoutes.post("/", createPlace);
placesRoutes.patch("/:pid", updatePlace);
placesRoutes.delete("/:pid", deletePlace);

export default placesRoutes;
