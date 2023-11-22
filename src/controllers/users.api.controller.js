import { generateToken } from "../utils/jwt.js";
import * as UsersServices from "../services/users.services.js";
import * as CartsServices from "../services/carts.services.js";
import CartsDAO from "../dao/mongoDB/carts.mongo.dao.js";

const CartsDao = new CartsDAO()

export const GETUsers = async (req, res) => {

    const users = await UsersServices.GetAllUsers();
    res.send(users);
};

export const GETUserById = async (req, res) => {

    try {
        const { pid } = req.params;
        const user = await UsersServices.GetUserById(pid);
        res.send(user);
    } catch (e) {

    }
};

export const GETUserByUsername = async (req, res) => {

    try {
        const { uid } = req.params;
        const user = await UsersServices.GetUserByUsername(uid);
        res.send(user);
    } catch (e) {

    }
};

export const POSTLogin = async (req, res) => {

    console.log(req.body);
    
    const user = await UsersServices.ValidateUser(req.body.username, req.body.password);
    if(!user) return res.send({error: true});

    const token = generateToken({sub: user._id, user: {email: user.username}});

    res.cookie("accessToken", token, {
        maxAge: (24*60*60)*1000,
        httpOnly: true
    });
    res.send({ error: false, accessToken: token, user: user });
};

export const GETSessionCurrent = async (req, res) => {

    try {
        if(!req.user) throw new Error("Debes loguearte");
        res.send({ error: false, user: req.user });
    } catch (e) {
        throw e;
    }
};

export const POSTLogout = (req, res) => {
    // Elimina la cookie llamada "accessToken" estableciendo su tiempo de expiración en el pasado
    res.cookie("accessToken", "", { expires: new Date(0), httpOnly: true });
    res.send({ error: false, message: 'Cierre de sesión exitoso' });
  };

export const POSTProdCart = async (req, res) => {

    try {
    const { prod } = req.params;
    const cart = req.user.cart;
    await CartsServices.PostCart();
    res.send({error: false, cart});    //await UsersServices.CreateUser 
    //await CartsServices.PostCart(prod)
    } catch (e) {

    }
};