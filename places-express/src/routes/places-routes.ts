import { Router } from "express";
import {
  getPlaceById,
  getPlaceByUserId,
} from "../controllers/places-controller";

const placesRoutes = Router();

placesRoutes.get("/:pid", getPlaceById);

placesRoutes.get("/user/:uid", getPlaceByUserId);

export default placesRoutes;
