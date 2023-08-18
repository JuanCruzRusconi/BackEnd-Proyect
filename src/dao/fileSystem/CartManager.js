/*
import { Console } from "console";
import e from "express";
import fs from "fs/promises";

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

    getCartById = async (cid) => {

        const file = await fs.readFile("./src/carts.json", "utf-8");
        this.carts = JSON.parse(file);

        let cartToUpdate = this.carts.find((cart) => cart.id === cid);
        return cartToUpdate;
    }

    addCart = async (cart) => {

        const {products} = cart
        try {
            const file = await fs.readFile("./src/carts.json", "utf-8");
            const carts = JSON.parse(file);

            const newCart = {
                id: carts[carts.length -1].id + 1,
                products: [],
                ...cart,
            }
            carts.push(newCart);
            await fs.writeFile("./src/carts.json", JSON.stringify(carts));
            return cart;
        } catch {
            console.log(e)
        }
    }

    addProductInCartById = async (cidCart, productById) => {

        try {
            const file = await fs.readFile("./src/carts.json", "utf-8");
            const carts = JSON.parse(file);

           if (!cidCart) return "Cart Not Found";
           if (!productById) return "Product Not Found";

           let update = carts.map((cart) => {
            if (cart.id === cidCart.id) {
                if (!cidCart.products.some((product) => product.id === productById.id)) {
                    let productInCart = cart.products.push({
                        id: productById.id,
                        quantity: 1,
                    });

                    return {
                        ...cart,
                        ...productInCart
                    };
                }

                console.log("everithing ok");
                cart.products.map((p) => {
                    if (p.id === productById.id) {
                        return ++p.quantity;
                    }
                    return p;
                });
            }
        return cart;
        });

        await fs.writeFile("./src/carts.json", JSON.stringify(update));
        
        return "Product added to cart succesfully";

        } catch (e) {
            console.log(e);
        }
    };
}
    
*/