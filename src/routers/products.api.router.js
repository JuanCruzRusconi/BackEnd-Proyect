import { Router } from "express";
import * as ProductsApiController from "../controllers/products.api.controller.js";

const productsRouter = Router();

productsRouter.get("/", ProductsApiController.GETProducts);

productsRouter.get("/:pid", ProductsApiController.GETProductById);

productsRouter.post("/", ProductsApiController.POSTProduct);

productsRouter.put("/:pid", ProductsApiController.PUTProductById);

productsRouter.delete("/:pid", ProductsApiController.DELETEProductById);

export default productsRouter;


