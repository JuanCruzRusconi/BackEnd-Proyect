import { Router } from "express";
import CartsApiControllers from "../controllers/carts.api.controller.js";
//import protectedView from "../utils/mddw.js"
import { JWTCookieMW, JWTMW } from "../utils/jwt.js";
import passportMW from "../utils/jwt.middleware.js";
import { verifyAuthentication, verifyRole } from "../utils/mddw.js";

const cartsRouter = Router();

const CartsApiController = new CartsApiControllers();

cartsRouter.get("/", CartsApiController.GETCarts);

cartsRouter.get("/:cid", CartsApiController.GETCartById);

cartsRouter.post("/", CartsApiController.POSTCart);

cartsRouter.post("/:cid/product/:pid", passportMW("jwt"), verifyRole("admin"), CartsApiController.POSTProductInCartById);

cartsRouter.put("/:cid/product/:pid",  CartsApiController.PUTProductQuantityByIdInCartById);

cartsRouter.delete("/:cid", passportMW("jwt"), verifyRole("admin"), CartsApiController.DELETECart);

cartsRouter.delete("/:cid/products", passportMW("jwt"), verifyRole("admin"), CartsApiController.DELETEProductsInCartById);

cartsRouter.delete("/:cid/product/:pid", passportMW("jwt"), verifyRole("admin"), CartsApiController.DELETEProductByIdInCartById);

cartsRouter.get("/:cid/purchase", passportMW("jwt"), verifyRole("admin"), CartsApiController.GETPurchase);

cartsRouter.post("/:cid/purchase", passportMW("jwt"), verifyRole("admin"), CartsApiController.POSTPurchase);

cartsRouter.post("/mycart", passportMW("jwt"), CartsApiController.GETUserCart);

cartsRouter.post("/mycart/product/:pid", passportMW("jwt"), CartsApiController.POSTProductInUserCartById);

cartsRouter.post("/purchase-cart", passportMW("jwt"), CartsApiController.POSTPurchaseUserCart);

export default cartsRouter;