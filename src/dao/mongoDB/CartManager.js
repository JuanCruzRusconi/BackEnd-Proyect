import { Console } from "console";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cartsModel from "../../schemas/carts.schema.js";
import mongoose from "mongoose";
//import e from "express";

export default class CartManager {

    constructor () {
       //this.carts = [];
    }

    getCarts = async () => {
        
        try {
        const carts = await cartsModel.find();
        return carts;
        } catch (e) {
            return [];
        }
    }

    getCartById = async (cid) => {

        try {
            const get = await cartsModel.findOne({_id: cid});
            return get;
        } catch (e) {
            console.log(e);
        }
    }

    addCart = async (cart) => {

        const {products} = cart
        
        try {
            const add = await cartsModel.create([cart]);
            return add;
        } catch (e) {
            console.log(e);
        }
    }

    addProductInCartById = async (cidCart, productById) => {

        try {
            const find = await cartsModel.findOne({cidCart});
            const add = await find.insertOne({productById})
            return add;
        } catch (e) {
            console.log(e);
        }
        
        return "Product added to cart succesfully";

    };
}