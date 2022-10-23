import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import HttpError from "../models/http-error";

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Mpi Dlam",
    email: "test@test.com",
    password: "mockpassword",
  },
];

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  res.json({ users: DUMMY_USERS });
};
export const signup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(422).json({ message: errors });

    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    throw new HttpError("user already exists", 422);
  }

  const createdUser = {
    id: "u2",
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Invalid username oir password", 401);
  }

  res.json({ message: "Logged in!" });
};
