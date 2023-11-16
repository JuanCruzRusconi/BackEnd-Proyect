import { Router } from "express";
import * as CartsApiController from "../controllers/carts.api.controller.js"
import protectedView from "../utils/mddw.js"
import { JWTCookieMW, JWTMW } from "../utils/jwt.js";
import passportMW from "../utils/jwt.middleware.js";
import ensureAuthenticated from "../utils/mddw.js";

const cartsRouter = Router();

cartsRouter.post("/", CartsApiController.POSTCart);

cartsRouter.post("/:cid/product/:pid", CartsApiController.POSTProductByIdInCartById);

cartsRouter.get("/", ensureAuthenticated, CartsApiController.GETCarts);

cartsRouter.get("/:cid", CartsApiController.GETCartById);

//cartsRouter.get("/:cid/product/:pid", );

//cartsRouter.put("/:cid", );

cartsRouter.put("/:cid/product/:pid", CartsApiController.PUTProductQuantityByIdInCartById);

cartsRouter.delete("/:cid", CartsApiController.DELETECart);

cartsRouter.delete("/:cid/products", CartsApiController.DELETEProductsInCartById);

cartsRouter.delete("/:cid/product/:pid", CartsApiController.DELETEProductByIdInCartById);

cartsRouter.get("/:cid/purchase", CartsApiController.GETPurchase);

cartsRouter.post("/:cid/purchase", CartsApiController.POSTPurchase);

export default cartsRouter;