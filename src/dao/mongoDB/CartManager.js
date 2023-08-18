import { Console } from "console";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cartsModel from "../../schemas/carts.schema.js";
import mongoose from "mongoose";
//import e from "express";

export default class CartManager {

    constructor () {
       //this.carts = [];
    };

    getCarts = async () => {
        
        try {
        const getCarts = await cartsModel.find();
        return getCarts;
        } catch (e) {
            return [];
        }
    };

    getCartById = async (cid) => {

        try {
            const getCart = await cartsModel.findOne({_id: cid});
            return getCart;
        } catch (e) {
            console.log(e);
        }
    };

    addCart = async (cart) => {

        const {products} = cart
        try {
            const addCart = await cartsModel.create([cart]);
            return addCart;
        } catch (e) {
            console.log(e);
        }
    };

    addProductInCartById = async (cidCart, productById) => {

        try {
            const addProdInCart = await cartsModel.updateOne({_id: cidCart}, {$push: {products: productById}});
            return addProdInCart;
        } catch (e) {
            console.log(e);
        }
        return "Product added to cart succesfully";
    };
};