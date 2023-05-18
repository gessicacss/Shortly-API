import { Router } from "express";
import { createUrl, deleteUrl, findUrl, redirectToUrl } from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schemas.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateSchema(urlSchema), authValidation, createUrl);
urlRouter.get("/urls/:id", findUrl);
urlRouter.get("/urls/open/:shortUrl", redirectToUrl);
urlRouter.delete("/urls/:id", authValidation, deleteUrl);

export default urlRouter;