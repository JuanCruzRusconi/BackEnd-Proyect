import { Router } from "express";
import CartsApiControllers from "../controllers/carts.api.controller.js";
//import protectedView from "../utils/mddw.js"
import { JWTCookieMW, JWTMW } from "../utils/jwt.js";
import passportMW from "../utils/jwt.middleware.js";
import { verifyAuthentication, verifyRole } from "../utils/mddw.js";

const cartsApiRouter = Router();

const CartsApiController = new CartsApiControllers();

// ------- Rutas orientadas al usuario, acceso de usuario logueado ------- //
cartsApiRouter.get("/mycart", passportMW("jwt"), CartsApiController.GETUserCart);

cartsApiRouter.post("/mycart/product/:pid", passportMW("jwt"), CartsApiController.POSTProductInUserCartById);

cartsApiRouter.post("/purchase-cart", passportMW("jwt"), CartsApiController.POSTPurchaseUserCart);

cartsApiRouter.put("/mycart/product/:pid", passportMW("jwt"), CartsApiController.PUTProductQuantityByIdInUserCart);

cartsApiRouter.delete("/mycart/products", passportMW("jwt"), CartsApiController.DELETEProductsInUserCart);

cartsApiRouter.delete("/mycart/product/:pid", passportMW("jwt"), CartsApiController.DELETEProductInUserCartById);

// ------- Rutas orientadas al administrador, acceso unicamente admin ------- //
cartsApiRouter.get("/", passportMW("jwt"), verifyRole("admin"), CartsApiController.GETCarts);

cartsApiRouter.get("/:cid", passportMW("jwt"), verifyRole("admin"), CartsApiController.GETCartById);

cartsApiRouter.post("/", passportMW("jwt"), verifyRole("admin"), CartsApiController.POSTCart);

cartsApiRouter.post("/:cid/product/:pid", passportMW("jwt"), verifyRole("admin"), CartsApiController.POSTProductInCart);

cartsApiRouter.post("/:cid/purchase", passportMW("jwt"), verifyRole("admin"), CartsApiController.POSTPurchase);

cartsApiRouter.put("/:cid/product/:pid", passportMW("jwt"), verifyRole("admin"), CartsApiController.PUTProductQuantityById);

cartsApiRouter.delete("/:cid", passportMW("jwt"), verifyRole("admin"), CartsApiController.DELETECart);

cartsApiRouter.delete("/:cid/products", passportMW("jwt"), verifyRole("admin"), CartsApiController.DELETEProductsInCart);

cartsApiRouter.delete("/:cid/product/:pid", passportMW("jwt"), verifyRole("admin"), CartsApiController.DELETEProductById);


export default cartsApiRouter;