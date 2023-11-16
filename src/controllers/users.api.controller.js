import { generateToken } from "../utils/jwt.js";
import * as UsersServices from "../services/users.services.js";
import * as CartsServices from "../services/carts.services.js";
import e from "express";

export const GETUsers = async (req, res) => {

    await UsersServices.GetAllUsers();
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
    res.send({ error: false, accessToken: token });
};

export const GETSessionCurrent = async (req, res) => {

    try {
        if(!req.user) throw new Error("Debes loguearte");
        res.send({ error: false, user: req.user });
    } catch (e) {
        throw e;
    }
};

export const GETLogout = async (req,res) => {
    
    try {
        req.session.destroy((error) => {
            res.send("Sesion culmianda")
        });
    } catch (e) {
        throw e;
    }
};

export const POSTCart = async (req, res) => {

    try {
    const { prod } = req.params;
    const cart = req.user.cart;
    await CartsServices.PostProductInCartById(cart, prod);
    res.send({error: false, user: req.user.cart});    //await UsersServices.CreateUser 
    //await CartsServices.PostCart(prod)
    } catch (e) {

    }
};