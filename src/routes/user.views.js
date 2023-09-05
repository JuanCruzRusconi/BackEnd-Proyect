import { Router } from "express";
import UserModel from "../schemas/users.schema.js";
import UserManager from "../dao/mongoDB/UserManager.js";
import ProductManager from "../dao/mongoDB/ProductManager.js";

const userViewsRouter = Router();

const userManager = new UserManager()
const productManager = new ProductManager();

const protectedView = (req, res, next) => {
    
    if(!req.session.user) return res.redirect("/user/login");
    next();
};

const isLogged = (req, res, next) => {

    if(req.session.user) return res.redirect("/user/profile");
    next();
};

userViewsRouter.get("/login", isLogged, (req, res) => {
    
    res.render("login");
});

userViewsRouter.get("/register", isLogged, (req, res) => {
    
    res.render("register");
});

userViewsRouter.post("/login", isLogged, async (req, res) => {

    try {
    const { username, password } = req.body;
    const user = await userManager.validateUser(username, password);
    if(!user) return res.render("/user/login");
    delete user.password;
    delete user.salt;
    req.session.user = user;
    res.redirect("/user/profile");
    
    } catch {
        res.status(502).send({error : true})
    }
});

userViewsRouter.post("/register", isLogged, async (req, res) => {

    try {
    const { nombre, apellido, username, password } = req.body;
    //const body = req.body;
    const user = await userManager.createUser({
        nombre: nombre,
        apellido: apellido,
        username: username,
        password: password,
        role: username === "admincoder@coder.com" ? "admin" : "user"});
    //res.send(user);
    res.redirect("/user/profile");
    } catch {

    }
});

userViewsRouter.get("/profile", protectedView, async (req, res) => {

    try {
        const { nombre, apellido, username } = req.session.user;
        console.log("Inicio de sesion:")
        console.log(req.session.user);
        res.render("profile", req.session.user); 
    } catch {

    }
});

userViewsRouter.get("/profile/products", protectedView, async (req, res) => {

    try {
        const { nombre, apellido, username } = req.session.user;
        const isAdmin = req.query.admin;
        const productos = await productManager.getProducts()
        res.render("home", { products: productos.map(producto => producto.toJSON()), isAdmin: true }); 
    } catch {

    }
});

userViewsRouter.get("/logout", protectedView, (req, res) => {

    try {
        req.session.destroy((error) => {
            res.redirect("/user/login");
        })
    } catch {

    }
});

export default userViewsRouter;