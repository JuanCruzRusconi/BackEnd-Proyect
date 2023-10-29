import { Router } from "express";
import * as ProductsViewsController from "../controllers/products.views.controller.js"

const productsViewsRouter = Router();

productsViewsRouter.get("/", ProductsViewsController.GETProducts);

productsViewsRouter.get("/:pid", ProductsViewsController.GETProductById);

productsViewsRouter.get("/realtimeproducts", ProductsViewsController.GETRealTimeProducts);

export default productsViewsRouter


