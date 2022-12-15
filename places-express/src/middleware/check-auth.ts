import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import HttpError from "../models/http-error";

interface CheckAuthRequest extends Request {
  userData: {
    userId: string;
  };
}

dotenv.config();

export default (req: CheckAuthRequest, res: Response, next: NextFunction) => {
  try {
    const tokenWithoutBearer = req.headers.authorization?.split("")[1];
    const token = tokenWithoutBearer;

    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken: string | JwtPayload | any = jwt.verify(
      token,
      process.env.SECRET_KEY || ""
    );
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed", 401);
    return next(error);
  }
};
