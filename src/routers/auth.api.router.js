import { Router } from "express";
import UsersApiControllers from "../controllers/users.api.controller.js";
import { JWTCookieMW, JWTMW, generateToken } from "../utils/jwt.js";
import passportMW from "../utils/jwt.middleware.js";
import passport from "passport";

const userApiRouter = Router();

const UsersApiController = new UsersApiControllers();

userApiRouter.get("/", UsersApiController.GETUsers);

userApiRouter.get("/:pid", UsersApiController.GETUserById);

userApiRouter.get("/:uid", UsersApiController.GETUserByUsername);

userApiRouter.get("/github", passport.authenticate("github", {
    scope: ["user: email"]
}), (req, res) => {});

userApiRouter.get("/callback", passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/profile"
}, (req, res) => {}));

userApiRouter.post("/login", UsersApiController.POSTLogin);

userApiRouter.post("/register", UsersApiController.POSTRegister);

userApiRouter.get("/session/current", passportMW("jwt"), UsersApiController.GETSessionCurrent);

userApiRouter.post("/signout", passportMW("jwt"), UsersApiController.POSTSignout);

userApiRouter.post("/my-cart", passportMW("jwt"), UsersApiController.GETUserCart);

userApiRouter.post("/cart/:pid", passportMW("jwt"), UsersApiController.POSTProductInUserCartById);

userApiRouter.post("/purchase-cart", passportMW("jwt"), UsersApiController.POSTPurchaseUserCart);

userApiRouter.delete("/", passportMW("jwt"), UsersApiController.DELETEUser);

userApiRouter.post("/user/premium", passportMW("jwt"), UsersApiController.POSTChangeRole);

export default userApiRouter;