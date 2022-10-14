import { Router } from "express";
import {
  createPlace,
  getPlaceById,
  getPlaceByUserId,
} from "../controllers/places-controller";

const placesRoutes = Router();

placesRoutes.get("/:pid", getPlaceById);

placesRoutes.get("/user/:uid", getPlaceByUserId);

placesRoutes.post("/", createPlace);

export default placesRoutes;
