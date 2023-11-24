import { Router } from "express";
import * as CartsApiController from "../controllers/carts.api.controller.js"
//import protectedView from "../utils/mddw.js"
import { JWTCookieMW, JWTMW } from "../utils/jwt.js";
import passportMW from "../utils/jwt.middleware.js";
import { verifyAuthentication, verifyRole } from "../utils/mddw.js";

const cartsRouter = Router();

cartsRouter.post("/", passportMW("jwt"), CartsApiController.POSTCart);

cartsRouter.post("/:cid/product/:pid", CartsApiController.POSTProductByIdInCartById);

cartsRouter.get("/", CartsApiController.GETCarts);

cartsRouter.get("/:cid", CartsApiController.GETCartById);

//cartsRouter.get("/:cid/product/:pid", );

//cartsRouter.put("/:cid", );

cartsRouter.put("/:cid/product/:pid", verifyAuthentication, verifyRole, CartsApiController.PUTProductQuantityByIdInCartById);

cartsRouter.delete("/:cid", verifyAuthentication, verifyRole, CartsApiController.DELETECart);

cartsRouter.delete("/:cid/products", passportMW("jwt"), CartsApiController.DELETEProductsInCartById);

cartsRouter.delete("/:cid/product/:pid", passportMW("jwt"), CartsApiController.DELETEProductByIdInCartById);

cartsRouter.get("/:cid/purchase", passportMW("jwt"), CartsApiController.GETPurchase);

cartsRouter.post("/:cid/purchase", CartsApiController.POSTPurchase);

export default cartsRouter;