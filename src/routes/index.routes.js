import { Router } from "express";
import authRouter from "./auth.routes.js";
import urlRouter from "./urls.routes.js";

const router = Router();
router.use(authRouter);
router.use(urlRouter);

export default router;