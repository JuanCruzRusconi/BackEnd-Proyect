import { Router } from "express";
import { JWTCookieMW, JWTMW, generateToken } from "../utils/jwt.js";
import passportMW from "../utils/jwt.middleware.js";
import * as UsersApiController from "../controllers/users.api.controller.js"

const userApiRouter = Router();

userApiRouter.get("/", UsersApiController.GETUsers);

userApiRouter.post("/login", UsersApiController.POSTLogin);

userApiRouter.get("/session/current", passportMW("jwt"), UsersApiController.GETSessionCurrent);

export default userApiRouter;