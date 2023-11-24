import { Console } from "console";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cartsModel from "../../schemas/carts.schema.js";
import mongoose from "mongoose";
import { pid } from "process";
import e from "express";
//import e from "express";

export default class CartsDAO {

    constructor() {
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
    }

    createCart = async (cart) => {

        const { products } = cart
        try {
            const addCart = await cartsModel.create([cart]);
            return addCart;
        } catch (e) {
            console.log(e);
        }
    };

    createUserCart = async (user) => {

        try {
            const addCart = await cartsModel.create({ user: user._id, products: [] });
            return addCart;
        } catch (e) {
            console.log(e);
        }
    };
    /*
    addProductInCartById = async (cidCart, productById) => {

           try {
            const addProdInCart = await cartsModel.updateOne({_id: cidCart}, {$push: {products: productById}});
            return addProdInCart;
        } catch (e) {
            console.log(e);
        }
        return "Product added to cart succesfully";
    };
    */

    addProductInCartById = async (cidCart, productById) => {

        try {
            const filter = {
                _id: cidCart,
                "products._id": productById
            };
            console.log(cidCart)
            const cart = await cartsModel.findById(cidCart);
            console.log(cart);
            if (cart.products.find((p) => p._id == productById)){//.toString())) {
                const update = {
                    $inc: {
                        "products.$.quantity": 1
                    },
                }
                await cartsModel.findOneAndUpdate(filter, update);
            } else {
                const update2 = {
                    $push: {
                        products: {
                            _id: productById,
                            quantity: 1
                        },
                    }
                }
                await cartsModel.findByIdAndUpdate(cidCart, update2);
            }
            return await cartsModel.findById(cidCart);
            //const addProdInCart = await cartsModel.updateOne({_id: cidCart}, {$push: {products: productById}});
            return find;
        } catch (e) {
            console.log(e);
        }
    };

    deleteCart = async (cid) => {

        try {
            const remove = await cartsModel.findByIdAndDelete(cid);
            return remove;
        } catch (e) {
            console.log(e);
        }
    };

    deleteProducts = async (cid) => {

        try {
            const deleteProds = await cartsModel.updateOne({_id: cid}, {$set: {products: []}}); 
            return deleteProds;
        } catch (e) {
            console.log(e);
        }
    };
    /*
    deleteProductInCartById = async (cid) => {

           try {
               const deleteProd = await cartsModel.aggregate([
                  {
                       $match: {_id: cid}
                   },
               ]);
            return deleteProd;
        } catch (e) {
            console.log(e);
        }
    }*/

    deleteProductInCartById = async (cidCart, productById) => {

           try {
            const filter = {
                   _id: cidCart,
                "products._id": productById
            };
            const cart = await cartsModel.findById(cidCart).lean();
            if (cart.products.find((p) => p._id == productById._id.toString() && p.quantity > 1)) {
                const update = {
                    $inc: {
                        "products.$.quantity": -1,
                       },
                   }
                await cartsModel.findOneAndUpdate(filter, update);
            } else {
                const update2 = {
                    $pull: {
                        products: {
                             _id: productById,
                        },
                    }
                };
                await cartsModel.findByIdAndUpdate(cidCart, update2);
            }
               return await cartsModel.findById(cidCart);
            //const addProdInCart = await cartsModel.updateOne({_id: cidCart}, {$push: {products: productById}});
            return find;
        } catch (e) {
            console.log(e);
        }
    };    

    deleteAllProductsByIdInCartById = async (cid, pid) => {
        
        try {
            const cart = await cartsModel.findByIdAndUpdate({_id: cid}, { $pull: { products: { _id: pid }}});
            return cart;
        } catch (e) {
            console.log(e);
        }
    }

    updateProductQuantity = async (cid, pid, quantity) => {

        try {
            let update = await cartsModel.findById(cid);
            update.products.map((p) => {
                if (p._id == pid._id.toString()) {
                    p.quantity = quantity;
                }
                return p;
            });
            update.save();
            return update;
        } catch (e) {
            console.log(e);
        }
    };
};