import fs from "fs/promises";

export default class CartsFS {

    constructor () {
        this.carts = [];
    }

    #id = 0;

    getCarts = async (next) => {
         
        try {
            const file = await fs.readFile("./src/carts.json", "utf-8");
            this.carts = JSON.parse(file);
            return this.carts;
        } catch (error) {
            error.from = "CartsFileSystem";
            return next(error);
        }
    };

    getCartById = async (cid, next) => {

        try {
            const file = await fs.readFile("./src/carts.json", "utf-8");
            this.carts = JSON.parse(file);
            let cartToUpdate = this.carts.find((cart) => cart.id === cid);
            return cartToUpdate;
        } catch (error) {
            error.from = "CartsFileSystem";
            return next(error);
        }
    };

    createCart = async (cart, next) => {

        const {products} = cart;
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
        } catch (error) {
            error.from = "CartsFileSystem";
            return next(error);
        }
    };

    updateProductInCartById = async (cidCart, productById, next) => {

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
        } catch (error) {
            error.from = "CartsFileSystem";
            return next(error);
        }
    };

    deleteTicket = async (id, next) => {
        
        try {
            const file = await fs.readFile("./src/carts.json", "utf-8");
            this.carts = JSON.parse(file);
            let cartFound = this.carts.find((cart) => cart.id === id);
            if(!cartFound){
                return `No se ha encontrado el cart con id: ${id}`;
            }
            let deletecart = this.carts.filter((cart) => cart.id !== id)
            await fs.writeFile("./src/carts.json", JSON.stringify(deletecart, null, 2));
            return cartFound;
        } catch (error) {
            error.from = "CartsFileSystem";
            return next(error);
        }
    };

}