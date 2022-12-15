import { Router } from "express";
import {
  createPlace,
  deletePlace,
  getPlaceById,
  getPlacesByUserId,
  updatePlace,
} from "../controllers/places-controller";
import { check } from "express-validator";
import fileUpload from "../middleware/file-upload";
import checkAuth from "../middleware/check-auth";

const placesRoutes = Router();

placesRoutes.get("/:pid", getPlaceById);
placesRoutes.get("/user/:uid", getPlacesByUserId);

/**
 * Adding a guard to protect these routes form unauthorized access
 */
placesRoutes.use(checkAuth as any);

placesRoutes.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);
placesRoutes.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePlace
);
placesRoutes.delete("/:pid", deletePlace);

export default placesRoutes;
