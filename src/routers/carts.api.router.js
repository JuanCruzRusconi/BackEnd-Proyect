import { Router } from "express";
import * as CartsApiController from "../controllers/carts.api.controller.js"
//import protectedView from "../utils/mddw.js"
import { JWTCookieMW, JWTMW } from "../utils/jwt.js";
import passportMW from "../utils/jwt.middleware.js";
import { verifyAuthentication, verifyRole } from "../utils/mddw.js";

const cartsRouter = Router();

cartsRouter.get("/", passportMW("jwt"), CartsApiController.GETCarts);

cartsRouter.get("/:cid", passportMW("jwt"), CartsApiController.GETCartById);

cartsRouter.post("/", passportMW("jwt"), verifyRole("admin"), CartsApiController.POSTCart);

cartsRouter.post("/:cid/product/:pid", passportMW("jwt"), verifyRole("admin"), CartsApiController.POSTProductByIdInCartById);

cartsRouter.put("/:cid/product/:pid", passportMW("jwt"), verifyRole("admin"), CartsApiController.PUTProductQuantityByIdInCartById);

cartsRouter.delete("/:cid", passportMW("jwt"), verifyRole("admin"), CartsApiController.DELETECart);

cartsRouter.delete("/:cid/products", passportMW("jwt"), verifyRole("admin"), CartsApiController.DELETEProductsInCartById);

cartsRouter.delete("/:cid/product/:pid", passportMW("jwt"), verifyRole("admin"), CartsApiController.DELETEProductByIdInCartById);

cartsRouter.get("/:cid/purchase", passportMW("jwt"), verifyRole("admin"), CartsApiController.GETPurchase);

cartsRouter.post("/:cid/purchase", passportMW("jwt"), verifyRole("admin"), CartsApiController.POSTPurchase);

export default cartsRouter;