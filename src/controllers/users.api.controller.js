import UsersServices from "../services/users.services.js";
import { generateToken } from "../utils/jwt.js";
import CartsServices from "../services/carts.services.js";
import CustomError from "../utils/customError.js";
import ErrorsDictionary from "../utils/errorsDictionary.js";


const CartService = new CartsServices();

export default class UsersApiControllers {

    constructor () {
        this.service = new UsersServices();
    };

    POSTLogin = async (req, res, next) => {
    
        try {
            const user = await this.service.ValidateUser(req.body.username, req.body.password, next);
            if(!user) return CustomError.createError(ErrorsDictionary.AUTH_ERROR);
    
            const token = generateToken({sub: user._id, user: {email: user.username}});
            res.cookie("accessToken", token, {
                maxAge: (24*60*60)*1000,
                httpOnly: true
            });
            const profile = await this.service.GetUserById(user._id, next);
            res.send({ error: false, accessToken: token, message: "Looged in", info: profile });
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };
    
    POSTRegister = async (req, res, next) => {
    
        try {
            const { name, surname, mail, username, password } = req.body;
            const userExists = await this.service.GetUserByUsername(username, next);
            if(userExists) return CustomError.createError(ErrorsDictionary.AUTH_DATA_ERROR);
            const newUser = await this.service.CreateUser({
                name: name,
                surname: surname,
                username: username,
                password: password,
                role: username === "admincoder@coder.com" ? "admin" : "user", 
                next
                });
            res.status(200).send({ error: false, payload: newUser._id, msg: `Registro de ${username} exitoso.` });
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };

    POSTProductInUserCartById = async (req, res, next) => {
    
        try {
            const { pid } = req.params
            const cart = req.user.cart._id;
            const cartUser = await CartService.GetCartById(cart, next);
            if(!cartUser) return CustomError.createError(ErrorsDictionary.NOT_FOUND_ONE);
            const cartUserId = cartUser._id;
            const prod = await CartService.UpdateProductInCartById(cartUserId, pid, next);
            if(!prod) return CustomError.createError(ErrorsDictionary.PRODUCT_INPUT_ERROR);
            res.send(prod);
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };
    
    POSTPurchaseUserCart = async (req, res, next) => {
    
        try {
            const user = req.user._id;
            const cart = req.user.cart;
            const cartId = cart._id;
            const cartUser = await CartService.GetCartById(cartId, next);
            if(!cart.products.length >= 1) return CustomError.createError(ErrorsDictionary.DOCUMENT_EMPTY);
            const cartUserId = cartUser._id;
            const buyCart = await CartService.CreatePurchase(cartUserId, user, next);
            if(!buyCart) return CustomError.createError(ErrorsDictionary.USER_INPUT_ERROR);
            res.send({error: false, msg: "Compra realizada, ticket enviado al usuario."})
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };

    POSTChangeRole = async (req, res, next) => {
    
        try {
            const user = req.user._id;
            console.log(user);
            const role = req.user.role
            console.log(role);
            const changeRole = await this.service.UpdateUserRole(user, role, next);
            if(!changeRole) return CustomError.createError(ErrorsDictionary.AUTH_ERROR)
            res.send(await this.service.GetUserById(user, next));
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };

    POSTSignout = (req, res, next) => {
        
        try {
            // Elimina la cookie llamada "accessToken" estableciendo su tiempo de expiración en el pasado
            const cookie = res.cookie("accessToken", "", { expires: new Date(0), httpOnly: true });
            if(!cookie) return CustomError.createError(ErrorsDictionary.COOKIE_NOT_FOUND);
            res.send({ error: false, message: 'Signet out.' });
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };

    GETUsers = async (req, res, next) => {

        try {
            const users = await this.service.GetUsers(next);
            if(!users) return CustomError.createError(ErrorsDictionary.NOT_FOUND);
            res.send(users);
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };
    
    GETUserById = async (req, res, next) => {
    
        try {
            const { pid } = req.params;
            const user = await this.service.GetUserById(pid, next);
            if(!user) return CustomError.createError(ErrorsDictionary.NOT_FOUND_ONE);
            res.send(user);
            console.log(user);
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };
    
    GETUserByUsername = async (req, res, next) => {
    
        try {
            const { uid } = req.params;
            const user = await this.service.GetUserByUsername(uid, next);
            if(!user) return CustomError.createError(ErrorsDictionary.NOT_FOUND_ONE);
            res.send(user);
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };
    
    GETSessionCurrent = async (req, res, next) => {
    
        try {
            console.log(req.user);
            if(!req.user) return CustomError.createError(ErrorsDictionary.NOT_LOGGED);
            res.send({ error: false, user: req.user });
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };
    
    GETUserCart = async (req, res, next) => {
    
        try {
            const cart = req.user.cart;
            if(!req.user) return CustomError.createError(ErrorsDictionary.NOT_LOGGED);
            res.send(cart);
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };
    
    DELETEUser = async (req, res, next) => {
    
        try {
            const user = req.user._id;
            if(!user) return CustomError.createError(ErrorsDictionary.NOT_FOUND_ONE);
            const deleteUser = await this.service.DeleteUser(user, next);
            res.send({error: false, msg: "Usuario eliminado."})
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };

}

