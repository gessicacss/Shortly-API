import { Router } from "express";
import getRanking from "../controllers/ranking.crontrollers.js";

const rankingRouter = Router();

rankingRouter.get("/rankings", getRanking);

export default rankingRouter;