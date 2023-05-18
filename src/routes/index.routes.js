import { Router } from "express";
import authRouter from "./auth.routes.js";
import urlRouter from "./urls.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();
router.use(authRouter);
router.use(urlRouter);
router.use(userRoutes);

export default router;