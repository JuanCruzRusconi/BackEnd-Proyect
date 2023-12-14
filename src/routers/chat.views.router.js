import { Router } from "express";
import * as ChatViewsController from "../controllers/chat.views.contoller.js"

const chatViewsRouter = Router();

chatViewsRouter.get("/join", ChatViewsController.GETJoin);

chatViewsRouter.get("/chat", ChatViewsController.GETChat);

export default chatViewsRouter;
