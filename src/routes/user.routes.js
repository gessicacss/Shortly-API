import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import getUsersUrl from "../controllers/user.controllers.js";

const userRoutes = Router();

userRoutes.get("/users/me", authValidation, getUsersUrl);

export default userRoutes;