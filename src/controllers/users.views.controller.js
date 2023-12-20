import UsersServices from "../services/users.services.js";
import ProductsServices from "../services/products.services.js";
import { generateToken } from "../utils/jwt.js";
import CustomError from "../utils/customError.js";
import ErrorsDictionary from "../utils/errorsDictionary.js";

const ProductService = new ProductsServices();

export default class UsersViewsControllers {

    constructor () {
        this.service = new UsersServices();
    };

    // ------- Passport + JWT ------- //

    POSTLoginJWT = async (req, res, next) => {
        
        try {
            const user = await this.service.ValidateUser(req.body.username, req.body.password, next);
            if(!user) return CustomError.createError(ErrorsDictionary.AUTH_ERROR);

            const token = generateToken({sub: user._id, user: {email: user.username}});

            res.cookie("accessToken", token, {
            maxAge: (24*60*60)*1000,
            httpOnly: true
            });
            //res.send({ error: false, accessToken: token, user: user });
            res.redirect("/user/profile")   
        } catch (error) {
            error.from = "UsersViewsControllers";
            return next(error);
        }
    };

    POSTRegisterJWT = async (req, res, next) => {
        
        try {
            const userExists = await this.service.GetUserByUsername(username, next);
            if(userExists) return CustomError.createError(ErrorsDictionary.AUTH_DATA_ERROR);

            const { name, surname, username, password } = req.body;

            const user = await this.service.CreateUser({
                name: name,
                surname: surname,
                username: username,
                password: password,
                role: username === "admin@coder.com" ? "admin" : "user", 
                next
            });

            const token = generateToken({sub: user._id, user: {email: user.username}});

            res.cookie("accessToken", token, {
            maxAge: (24*60*60)*1000,
            httpOnly: true
            });
            //res.send({ error: false, accessToken: token, user: user });
            res.redirect("/user/profile");    
        } catch (error) {
            error.from = "UsersViewsControllers";
            return next(error);
        }
    };

    GETLogin = async (req, res, next) => {
        
        try {
            res.render("login");
        } catch (error) {
            error.from = "UsersViewsControllers";
            return next(error);
        }
    };

    GETRegister = async (req, res, next) => {
        
        try {
            res.render("register");
        } catch (error) {
            error.from = "UsersViewsControllers";
            return next(error);
        }
    };
    
    GETProfile = async (req, res, next) => {
        
        try {
            if(!req.user) CustomError.createError(ErrorsDictionary.NOT_LOGGED);
            const { name, surname, username } = req.user;
            console.log("Inicio de sesion:", req.user)
            //if(!req.user) return res.redirect("/user/login");
            res.render("profile", req.user); 
        } catch (error) {
            error.from = "UsersViewsControllers";
            return next(error);
        }
    };

    GETProfileProducts = async (req, res, next) => {
        
        try {
            const { nombre, apellido, username } = req.user;
            const isAdmin = req.query.admin;
            const productos = await ProductService.GetProducts(next);
            if(!productos) return CustomError.createError(ErrorsDictionary.NOT_FOUND);
            res.render("home", { products: productos.map(producto => producto.toJSON()), isAdmin: true }); 
        } catch (error) {
            error.from = "UsersViewsControllers";
            return next(error);
        }
    };

    GETLogoutJWT = async (req, res, next) => {
        
        try {
            res.cookie("accessToken", "", { expires: new Date(0), httpOnly: true });
            //res.send({ error: false, message: 'Cierre de sesión exitoso' });
            res.redirect("/user/login");
        } catch (error) {
            error.from = "UsersViewsControllers";
            return next(error);
        }
    };

}

