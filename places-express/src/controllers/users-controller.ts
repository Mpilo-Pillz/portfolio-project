import { NextFunction, Request, Response } from "express";

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
  const { name, email, password } = req.body;
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
  const {} = req.bod;
};
