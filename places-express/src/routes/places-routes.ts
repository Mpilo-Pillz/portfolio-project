import express, { Router } from "express";

const placesRoutes = Router();

placesRoutes.get("/", (req, res, next) => {
  console.log("GET REQUEST in places");
  res.json({ message: "From Route" });
});

export default placesRoutes;
