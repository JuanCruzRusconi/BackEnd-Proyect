import { Router } from "express";
import { JWTCookieMW, JWTMW, generateToken } from "../utils/jwt.js";
import passportMW from "../utils/jwt.middleware.js";
import * as UsersApiController from "../controllers/users.api.controller.js"
import InitLocalStrategy from "../config/passport.js";

const userApiRouter = Router();

userApiRouter.get("/", UsersApiController.GETUsers);

userApiRouter.get("/:pid", UsersApiController.GETUserById);

userApiRouter.get("/:uid", UsersApiController.GETUserByUsername);

userApiRouter.post("/login", UsersApiController.POSTLogin);

userApiRouter.get("/session/current", passportMW("jwt"), UsersApiController.GETSessionCurrent);

userApiRouter.post("/session/current/logout", passportMW("jwt"), UsersApiController.POSTLogout);

userApiRouter.post("/cart/:pid", passportMW("jwt"), UsersApiController.POSTProdCart);

export default userApiRouter;