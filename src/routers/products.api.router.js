import { Router } from "express";
import ProductsApiControllers from "../controllers/products.api.controller.js";
import passportMW from "../utils/jwt.middleware.js";
import { verifyAuthentication, verifyRole } from "../utils/mddw.js";

const productsRouter = Router();

const ProductsApiController = new ProductsApiControllers();

productsRouter.get("/", ProductsApiController.GETProducts);

productsRouter.get("/:pid", ProductsApiController.GETProductById);

productsRouter.post("/", passportMW("jwt"), verifyRole("admin", "premium"), ProductsApiController.POSTProduct);

productsRouter.put("/:pid", passportMW("jwt"), verifyRole("admin"), ProductsApiController.PUTProductById);

productsRouter.delete("/:pid", passportMW("jwt"), verifyRole("admin"), ProductsApiController.DELETEProductById);

export default productsRouter;


