import { Router } from "express";
import { handleSignIn, handleSignUp } from "../controllers/auth.controllers.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js";
import { validateSignInUser, validateSignUpUser } from "../middlewares/auth.middlewares.js";

const authRouter = Router();

authRouter.post("/sign-in", validateSchema(signInSchema), validateSignInUser, handleSignIn);
authRouter.post("/sign-up", validateSchema(signUpSchema), validateSignUpUser, handleSignUp);

export default authRouter;