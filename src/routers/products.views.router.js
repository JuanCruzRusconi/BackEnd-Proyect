import { Router } from "express";
import ProductsViewsControllers from "../controllers/products.views.controller.js";
import passportMW from "../utils/jwt.middleware.js";

const productsViewsRouter = Router();

const ProductsViewsController = new ProductsViewsControllers();

productsViewsRouter.get("/", ProductsViewsController.GETProducts);

productsViewsRouter.get("/:pid", passportMW("jwt"), ProductsViewsController.GETProductById);

productsViewsRouter.get("/realtimeproducts", passportMW("jwt"), ProductsViewsController.GETRealTimeProducts);

export default productsViewsRouter;


