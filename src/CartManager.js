import e from "express";
import fs from "fs/promises"

export default class CartManager {

    constructor () {
        this.carts = [];
    }

    #id = 0;

    getCarts = async () => {
        
        const file = await fs.readFile("./src/carts.json", "utf-8");
        this.carts = JSON.parse(file);
        return this.carts;
    }

    addCart = async (cart) => {

        const {products} = cart
        try {
            const file = await fs.readFile("./src/carts.json", "utf-8");
            const carts = JSON.parse(file);

            const newCart = {
                id: carts[carts.length -1].id + 1,
                ...cart,
            }
            carts.push(newCart);
            await fs.writeFile("./src/carts.json", JSON.stringify(carts));
            return cart;
        } catch {
            console.log(e)
        }
    }

    addProduct = async (product) => {

        const {productId, quantity} = product
        try {
            const file = await fs.readFile("./src/carts.json", "utf-8");
            const products = JSON.parse(file);
            const itsIncluded = this.product.some((productFind) => productFind.id === productId);
            if (itsIncluded) {
                product.quantity++;
                return;
            };
            const newProduct = {
                //id: this.#id++,
                id: products[products.length -1].id + 1,
                ...product,
            }
            carts.push(newProduct);
            await fs.writeFile("./src/carts.json", JSON.stringify(products));
            return product;
        } catch (e) {
            console.log(e);
        }
       console.log(`Product ${product.title} submitted successfully`);
    };
}