import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import placesRoutes from "./routes/places-routes";
import HttpError, { ErrorResponse } from "./models/http-error";
import usersRoutes from "./routes/users-route";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not found this route", 404);

  throw error;
});

app.use(
  (error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }
    res
      .status(error.errorCode || 500)
      .json({ message: error.message || "An unknown errror occured!" });
  }
);
mongoose
  .connect(process.env.DB_CONNECTION_STRING as string)
  .then(() => app.listen(4000))
  .catch((err) => console.log(err));
