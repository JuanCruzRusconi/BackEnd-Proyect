import { Router } from "express";
import passport from "passport";
import * as UsersViewsController from "../controllers/users.views.controller.js";
import * as UsersServices from "../services/users.services.js";

const userViewsRouter = Router();

const protectedView = (req, res, next) => {
    
    if(!req.user) return res.redirect("/user/login");
    next();
};

const isLogged = (req, res, next) => {

    if(req.user) return res.redirect("/user/profile");
    next();
};

userViewsRouter.get("/login", isLogged, UsersViewsController.GETLogin);

userViewsRouter.get("/register", isLogged, UsersViewsController.GETRegister);
/*
userViewsRouter.post("/login", isLogged, async (req, res) => {

    try {
    const { username, password } = req.body;
    const user = await UsersServices.ValidateUser(username, password);
    if(!user) return res.status(401).send({error: true, msg: "Credenciales inexistentes"});
    delete user.password;
    delete user.salt;
    req.session.user = user;
    res.redirect("/user/profile");
    } catch {
        res.status(502).send({error : true});
    }
});


userViewsRouter.post("/register", isLogged, async (req, res) => {

    try {
    const { name, surname, username, password } = req.body;
    //const body = req.body;
    const user = await UsersServices.CreateUser({
        name: name,
        surname: surname,
        username: username,
        password: password,
        role: username === "admincoder@coder.com" ? "admin" : "user"});
    res.redirect("/user/profile");
    } catch {
        res.status(502).send({error : true});
    }
});
*/
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

userViewsRouter.get("/profile", protectedView, UsersViewsController.GETProfile);

userViewsRouter.get("/profile/products", protectedView, UsersViewsController.GETProfileProducts);

userViewsRouter.get("/logout", protectedView, UsersViewsController.GETLogout);

export default userViewsRouter;