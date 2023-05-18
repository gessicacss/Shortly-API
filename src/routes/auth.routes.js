import { Router } from "express";
import { handleLogOut, handleSignIn, handleSignUp } from "../controllers/auth.controllers.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js";
import { validateSignInUser, validateSignUpUser } from "../middlewares/auth.middlewares.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const authRouter = Router();

authRouter.post("/signin", validateSchema(signInSchema), validateSignInUser, handleSignIn);
authRouter.post("/signup", validateSchema(signUpSchema), validateSignUpUser, handleSignUp);
authRouter.post("/logout", authValidation, handleLogOut);

export default authRouter;