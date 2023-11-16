import { Router } from "express";
import { JWTCookieMW, JWTMW, generateToken } from "../utils/jwt.js";
import passportMW from "../utils/jwt.middleware.js";
import * as UsersApiController from "../controllers/users.api.controller.js"
import ensureAuthenticated from "../utils/mddw.js";
import InitLocalStrategy from "../config/passport.js";

const userApiRouter = Router();

userApiRouter.get("/", UsersApiController.GETUsers);

userApiRouter.post("/login", UsersApiController.POSTLogin);

userApiRouter.get("/session/current", passportMW("jwt"), UsersApiController.GETSessionCurrent);

userApiRouter.get("/session/current/logout", passportMW("jwt"), UsersApiController.GETLogout);

userApiRouter.post("/cart/:pid", passportMW("jwt"), UsersApiController.POSTCart);

export default userApiRouter;