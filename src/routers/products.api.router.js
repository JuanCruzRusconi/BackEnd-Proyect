import { Router } from "express";
import ProductsApiControllers from "../controllers/products.api.controller.js";
import passportMW from "../utils/jwt.middleware.js";
import { verifyAuthentication, verifyRole } from "../utils/mddw.js";

const productsApiRouter = Router();

const ProductsApiController = new ProductsApiControllers();

productsApiRouter.get("/", ProductsApiController.GETProducts);

productsApiRouter.get("/:pid", ProductsApiController.GETProductById);

productsApiRouter.post("/", passportMW("jwt"), verifyRole("admin", "premium"), ProductsApiController.POSTProduct);

productsApiRouter.put("/:pid", passportMW("jwt"), verifyRole("admin"), ProductsApiController.PUTProductById);

productsApiRouter.delete("/:pid", passportMW("jwt"), verifyRole("admin"), ProductsApiController.DELETEProductById);


export default productsApiRouter;


