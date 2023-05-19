import { Router } from "express";
import authRouter from "./auth.routes.js";
import urlRouter from "./urls.routes.js";
import userRoutes from "./user.routes.js";
import rankingRouter from "./rankings.routes.js";

const router = Router();
router.use(authRouter);
router.use(urlRouter);
router.use(userRoutes);
router.use(rankingRouter);

export default router;