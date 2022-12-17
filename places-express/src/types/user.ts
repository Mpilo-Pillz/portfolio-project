import { Request } from "express";

export interface CheckAuthRequest extends Request {
  userData?: {
    userId?: string;
  };
}
