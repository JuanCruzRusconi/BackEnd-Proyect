import { Router } from "express";
import * as ProductsApiController from "../controllers/products.api.controller.js";
import passportMW from "../utils/jwt.middleware.js";
import { verifyRole } from "../utils/mddw.js";

const productsRouter = Router();

productsRouter.get("/", ProductsApiController.GETProducts);

productsRouter.get("/:pid", ProductsApiController.GETProductById);

productsRouter.post("/", passportMW("jwt"), verifyRole("admin"), ProductsApiController.POSTProduct);

productsRouter.put("/:pid", passportMW("jwt"), verifyRole("admin"), ProductsApiController.PUTProductById);

productsRouter.delete("/:pid", passportMW("jwt"), verifyRole("admin"), ProductsApiController.DELETEProductById);

export default productsRouter;


