import { Router } from "express";
import UsersApiControllers from "../controllers/auth.api.controller.js";
import { JWTCookieMW, JWTMW, generateToken } from "../utils/jwt.js";
import passportMW from "../utils/jwt.middleware.js";
import passport from "passport";
import { verifyRole } from "../utils/mddw.js";

const authApiRouter = Router();

const UsersApiController = new UsersApiControllers();

// ------- Rutas orientadas al usuario, acceso de usuario logueado ------- //
authApiRouter.get("/github", passport.authenticate("github", {
    scope: ["user: email"]
}), (req, res) => {});

authApiRouter.get("/callback", passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/profile"
}, (req, res) => {}));

authApiRouter.post("/login", UsersApiController.POSTLogin);

authApiRouter.post("/register", UsersApiController.POSTRegister);

authApiRouter.get("/session/current", passportMW("jwt"), UsersApiController.GETSessionCurrent);

authApiRouter.post("/signout", passportMW("jwt"), UsersApiController.POSTSignout);

authApiRouter.post("/mycart", passportMW("jwt"), UsersApiController.GETUserCart);

authApiRouter.post("/user/premium", passportMW("jwt"), UsersApiController.POSTChangeRole);

// ------- Rutas orientadas al administrador, acceso unicamente admin ------- //
authApiRouter.get("/", passportMW("jwt"), verifyRole("admin"), UsersApiController.GETUsers);

authApiRouter.get("/:uid", passportMW("jwt"), verifyRole("admin"), UsersApiController.GETUserById);

authApiRouter.get("/:uid", passportMW("jwt"), verifyRole("admin"), UsersApiController.GETUserByUsername);

authApiRouter.delete("/:uid", passportMW("jwt"), verifyRole("admin"), UsersApiController.DELETEUser);


export default authApiRouter;