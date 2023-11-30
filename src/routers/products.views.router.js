import { Router } from "express";
import * as ProductsViewsController from "../controllers/products.views.controller.js"
import passportMW from "../utils/jwt.middleware.js";

const productsViewsRouter = Router();

productsViewsRouter.get("/", passportMW("jwt"), ProductsViewsController.GETProducts);

productsViewsRouter.get("/:pid", passportMW("jwt"), ProductsViewsController.GETProductById);

productsViewsRouter.get("/realtimeproducts", passportMW("jwt"), ProductsViewsController.GETRealTimeProducts);

export default productsViewsRouter


