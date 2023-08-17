import { json } from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import productsModel from "../../schemas/products.schema.js";
import mongoose from "mongoose";

export default class ProductManager {

    constructor () {
        //nodethis.products = [];
    }

    getProducts = async () => {
        try {
            const products = await productsModel.find();
            return products;
        } catch (e) {
            return [];
        }
    }

    addProduct = async (product) => {

        const {title, description, price, thumbnail, code, stock} = product

        try {
            const add = await productsModel.create([product]);
            return add;
        } catch (e) {
            console.log(e);
        }
        
       console.log(`Product ${product.title} submitted successfully`);
    };

    getProductById = async (productId) => {
        
        try {
            const get = await productsModel.findOne({_id: productId});
            return get;
        } catch (e) {
            console.log(e);
        }
    }

    updateProduct = async (id, product) => {
        
        try {  
            const update = await productsModel.findOne({_id: id});
            const mod2 = await update.updateOne({product});
            //const mod = await productsModel.updateOne({product});
            //mod.toJSON();
            //await mod.save()
            //update.save()
            //await update.save()
            //const updateJSON = update.toJSON();
            return mod2;
        } catch (e) {
            console.log(e)
        }
        //console.log("Producto a actualizar:", await productManager.updateProduct(idUpdate, productUpdate));
    }

    deleteProduct =  async (id) => {
        
        try {
            const deleteProd = await productsModel.deleteOne({id})
            return deleteProd;
        } catch (e) {
            console.log(e)
        }
    }
}

//const productManager = new ProductManager()
/*
await productManager.addProduct({
    title: "Remera", 
    description: "Blanco", 
    price: 20000, 
    thumbnail: "Ruta de imagen", 
    code: 1111, 
    stock: 1000
});
await productManager.addProduct({
    title: "Buzo", 
    description: "Negro", 
    price: 40000, 
    thumbnail: "Ruta de imagen", 
    code: 2222, 
    stock: 700
});
await productManager.addProduct({
    title: "Jogger", 
    description: "Beige", 
    price: 35000, 
    thumbnail: "Ruta de imagen", 
    code: 3333, 
    stock: 5000
});
await productManager.addProduct({
    title: "Jean", 
    description: "Azul", 
    price: 37000, 
    thumbnail: "Ruta de imagen", 
    code: 4444, 
    stock: 800
});
await productManager.addProduct({
    title: "Campera", 
    description: "Verde", 
    price: 70000, 
    thumbnail: "Ruta de imagen", 
    code: 4444, 
    stock: 300
});


// ------- CAMBIOS A REALIZAR ------- //

let idUpdate = 1;
let productUpdate = {
            title: "MAC", 
            description: "Negro", 
            price: 40000, 
            thumbnail: "Ruta de imagen", 
            code: 2222, 
            stock: 700
        };

let idDelete = 7;
*/
/*
console.log(await productManager.getProducts());

console.log("Producto a actualizar:", await productManager.updateProduct());

console.log("Producto eliminado:", await productManager.deleteProduct());
*/

