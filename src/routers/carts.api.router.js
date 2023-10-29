import { Router } from "express";
import * as CartsApiController from "../controllers/carts.api.controller.js"

const cartsRouter = Router();

cartsRouter.post("/", CartsApiController.POSTCart);

cartsRouter.post("/:cid/product/:pid", CartsApiController.POSTProductByIdInCartById);

cartsRouter.get("/", CartsApiController.GETCarts);

cartsRouter.get("/:cid", CartsApiController.GETCartById);

//cartsRouter.get("/:cid/product/:pid", );

//cartsRouter.put("/:cid", );

cartsRouter.put("/:cid/product/:pid", CartsApiController.PUTProductQuantityByIdInCartById);

cartsRouter.delete("/:cid", CartsApiController.DELETECart);

cartsRouter.delete("/:cid/products", CartsApiController.DELETEProductsInCartById);

cartsRouter.delete("/:cid/product/:pid", CartsApiController.DELETEProductByIdInCartById);

export default cartsRouter;