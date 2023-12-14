import { Router } from "express";
import * as LoggersController from "../controllers/loggers.api.controller.js"

const loggersRouter = Router();

loggersRouter.post("/", LoggersController.POSTProduct);

loggersRouter.get("/", LoggersController.GETProducts);

loggersRouter.get("/:pid", LoggersController.GETProductById);

loggersRouter.put("/:pid", LoggersController.PUTProductById);

loggersRouter.delete("/:pid", LoggersController.DELETEProduct);

export default loggersRouter;