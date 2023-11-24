import { generateToken } from "../utils/jwt.js";
import * as UsersServices from "../services/users.services.js";
import * as CartsServices from "../services/carts.services.js";

export const GETUsers = async (req, res) => {

    const users = await UsersServices.GetAllUsers();
    res.send(users);
};

export const GETUserById = async (req, res) => {

    try {
        const { pid } = req.params;
        const user = await UsersServices.GetUserById(pid);
        res.send(user);
        console.log(user);
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

    try {
        const user = await UsersServices.ValidateUser(req.body.username, req.body.password);
        if(!user) return res.send({error: true, msg: "Credenciales invalidas."});

        const token = generateToken({sub: user._id, user: {email: user.username}});
        res.cookie("accessToken", token, {
            maxAge: (24*60*60)*1000,
            httpOnly: true
        });
        res.send({ error: false, accessToken: token, user: user });
    } catch (e) {
        res.status(403).send({error: true, msg: e.message});
    }
};

export const POSTRegister = async (req, res) => {

    try {
        const { name, surname, mail, username, password } = req.body;
        const userExists = await UsersServices.GetUserByUsername(username);
        if(userExists) throw new Error("Usuario ya en uso.")
        const newUser = await UsersServices.CreateUser({
            name: name,
            surname: surname,
            username: username,
            password: password,
            role: username === "admincoder@coder.com" ? "admin" : "user"
            });
        res.send({ error: false, msg: `Registro de ${username} exitoso.` });
    } catch (e) {
        res.status(403).send({error: true, msg: e.message});
    }
};

export const GETSessionCurrent = async (req, res) => {

    try {
        console.log(req.user);
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

export const POSTProductInUserCartById = async (req, res) => {

    try {
        const {pid} = req.params
        const cart = req.user.cart._id;
        const cartUser = await CartsServices.GetCartById(cart);
        const cartUserId = cartUser._id;
        const prod = await CartsServices.PostProductInCartById(cartUserId, pid);
        res.send(prod);
    } catch (e) {
        throw e
    }
};

export const POSTPurchaseUserCart = async (req, res) => {

    try {
        const user = req.user._id;
        const cart = req.user.cart;
        const cartId = cart._id;
        const cartUser = await CartsServices.GetCartById(cartId);
        if(!cart.products.length >= 1) throw new Error("No posee productos en el carrito.");
        const cartUserId = cartUser._id;
        const emptyCart = await CartsServices.PostPurchase(cartUserId, user);
        res.send({error: false, msg: "Compra realizada, ticket enviado al usuario."})
    } catch (e) {
        res.status(502).send({error: true, msg: e.message});
    }
};