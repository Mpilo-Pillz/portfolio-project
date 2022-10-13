import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import placesRoutes from "./routes/places-routes";

export interface ErrorResponse {
  code: number;
  message: string;
}
const app = express();

app.use("/api/places", placesRoutes);
app.use(
  (error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }
    res
      .status(error.code || 500)
      .json({ message: error.message || "An unknown errror occured!" });
  }
);

app.listen(4000);
