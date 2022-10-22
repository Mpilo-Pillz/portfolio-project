import express, { Router } from "express";
import { getUsers, login, signup } from "../controllers/users-controller";

const usersRoutes = Router();

usersRoutes.get("/", getUsers);
usersRoutes.post("/signup", signup);
usersRoutes.post("/login", login);

export default usersRoutes;
