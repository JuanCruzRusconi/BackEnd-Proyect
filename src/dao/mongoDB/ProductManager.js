import { json } from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import productsModel from "../../schemas/products.schema.js";
import mongoose from "mongoose";

export default class ProductManager {

    constructor () {
        //nodethis.products = [];
    };

    getProducts = async () => {
        try {
            const getProds = await productsModel.find();
            return getProds;
        } catch (e) {
            return [];
        }
    };

    addProduct = async (product) => {

        //const {title, description, price, thumbnail, code, stock} = product
        try {
            const addProd = await productsModel.create([product]);
            return addProd;
        } catch (e) {
            console.log(e);
        }
       //console.log(`Product ${product} submitted successfully`);
    };

    getProductById = async (productId) => {
        
        try {
            const getProd = await productsModel.findOne({_id: productId});
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
        //console.log(`Producto has been actualized`);
    };

    deleteProduct =  async (id) => {
        
        try {
            const deleteProd = await productsModel.deleteOne({_id: id});
            return deleteProd;
        } catch (e) {
            console.log(e);
        }
    };
};
