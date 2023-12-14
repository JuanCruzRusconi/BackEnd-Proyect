import { Router } from "express";
import passport from "passport";
import UsersViewsControllers from "../controllers/users.views.controller.js";
import passportMW from "../utils/jwt.middleware.js";
import { isLogged, protectedView, verifyAuthentication } from "../utils/mddw.js";

const userViewsRouter = Router();

const UsersViewsController = new UsersViewsControllers();

userViewsRouter.get("/login", UsersViewsController.GETLogin);

userViewsRouter.get("/register", UsersViewsController.GETRegister);

userViewsRouter.post("/login", UsersViewsController.POSTLoginJWT);

userViewsRouter.post("/register", passport.authenticate("register", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/register"
}),async (req, res) => {});

userViewsRouter.get("/auth/github", passport.authenticate("github", {
    scope: ["user: email"]
}), (req, res) => {});


userViewsRouter.get("/auth/callback", passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/profile"
}, (req, res) => {}));

userViewsRouter.get("/profile", passportMW("jwt"), UsersViewsController.GETProfile);

userViewsRouter.get("/profile/products", passportMW("jwt"), UsersViewsController.GETProfileProducts);

userViewsRouter.get("/logout", passportMW("jwt"), UsersViewsController.GETLogoutJWT);

export default userViewsRouter;