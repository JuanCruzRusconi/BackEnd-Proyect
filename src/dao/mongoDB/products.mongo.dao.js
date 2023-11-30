import { json } from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import productsModel from "../../schemas/products.schema.js";
import mongoose from "mongoose";

export default class ProductsDAO {

    constructor () {
        //nodethis.products = [];
    };

    getProducts = async () => {
        
        try {
            const prods = await productsModel.find();
            return prods;
        } catch (e) {
            return [];
        }
    };

    createProduct = async (product) => {
        
        try {
            const addProd = await productsModel.create([product]);
            return addProd;
        } catch (e) {
            console.log(e);
        }
    };

    getProductById = async (productId) => {
        
        try {
            const getProd = await productsModel.findById({ _id: productId});
            return getProd;
        } catch (e) {
            console.log(e);
        }
    };

    getProductByCode = async (code) => {
        
        try {
            const getProd = await productsModel.find({ code: code });
            return getProd;
        } catch (e) {
            console.log(e);
        }
    };

    updateProduct = async (id, product) => {
        
        try {  
            const updateProd = await productsModel.updateOne({_id: id}, {$set: product});
            return updateProd;
        } catch (e) {
            console.log(e);
        }
    };

    deleteProduct =  async (id) => {
        
        try {
            const deleteProd = await productsModel.deleteOne({_id: id});
            return deleteProd;
        } catch (e) {
            console.log(e);
        }
    };

    updateProductStockAfterPurchase = async (id, newStock) => {
        
        try {              
            const updateProd = await productsModel.updateOne({_id: id}, {$set: {stock: newStock}}); 
            return updateProd;
        } catch (e) {
            console.log(e);
        }                                                           
    };
};
