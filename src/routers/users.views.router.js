import { Router } from "express";
import passport from "passport";
import * as UsersViewsController from "../controllers/users.views.controller.js";
import * as UsersServices from "../services/users.services.js";
import passportMW from "../utils/jwt.middleware.js";
import { isLogged, protectedView, verifyAuthentication } from "../utils/mddw.js";

const userViewsRouter = Router();

userViewsRouter.get("/login", UsersViewsController.GETLogin);

userViewsRouter.get("/register", UsersViewsController.GETRegister);

// ------- Autenticacion sin estrategias ------- //
/*
userViewsRouter.post("/login", isLogged, UsersViewsController.POSTFirstLogin);

userViewsRouter.post("/register", isLogged, UsersViewsController.POSTFirstRegister);
*/
// ------- Passport Estrategia Local ------- //
/*
userViewsRouter.post("/login", passport.authenticate("login", {
        successRedirect: "/user/profile",
        failureRedirect: "/user/login"
    }),
    async (req, res) => {}
);

userViewsRouter.post("/register", passport.authenticate("register", {
        successRedirect: "/user/profile",
        failureRedirect: "/user/register"
    }),
    async (req, res) => {}
);

userViewsRouter.get("/profile", verifyAuthentication, protectedView, UsersViewsController.GETProfile);

userViewsRouter.get("/profile/products", protectedView, UsersViewsController.GETProfileProducts);

userViewsRouter.get("/logout", UsersViewsController.GETLogout);
*/
// ------- Passport Estrategia JWT ------- //

userViewsRouter.post("/login", UsersViewsController.POSTLoginJWT);

userViewsRouter.post("/register", passport.authenticate("register", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/register"
}),
async (req, res) => {}
);

userViewsRouter.get("/profile", passportMW("jwt"), UsersViewsController.GETProfile);

userViewsRouter.get("/profile/products", passportMW("jwt"), UsersViewsController.GETProfileProducts);

userViewsRouter.get("/logout", passportMW("jwt"), UsersViewsController.GETLogoutJWT);

export default userViewsRouter;