import { Router } from "express";
import IndexViewsControllers from "../controllers/index.views.controller.js";

const indexViewsRouter = Router();

const IndexViewsController = new IndexViewsControllers

indexViewsRouter.get("/home", IndexViewsController.GETIndex);

indexViewsRouter.get("/login", IndexViewsController.GETLogin);

indexViewsRouter.get("/register", IndexViewsController.GETRegister);

indexViewsRouter.get("/products", IndexViewsController.GETProducts);

indexViewsRouter.get("/swagger", IndexViewsController.GETSwagger);


export default indexViewsRouter;