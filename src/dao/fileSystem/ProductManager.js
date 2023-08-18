/*
import { json } from "express";
import fs from "fs/promises";

export default class ProductManager {

    constructor () {
        this.products = [];
    }

    #id = 0;

    getProducts = async () => {
        const file = await fs.readFile("./src/products.json", "utf-8");
        this.products = JSON.parse(file);
        return this.products;
    }

    addProduct = async (product) => {

        const {title, description, price, thumbnail, code, stock} = product

        try {
            const file = await fs.readFile("./src/products.json", "utf-8");
            const products = JSON.parse(file);

            const itsValid = this.products.some((productFind) => productFind.code === code);
            
            if (itsValid) {
                console.log(`ERROR: Code in use in ${product.title}`);
                return;
            };

            const newProduct = {
                //id: this.#id++,
                id: products[products.length -1].id + 1,
                ...product,
            }

            products.push(newProduct);
            await fs.writeFile("./src/products.json", JSON.stringify(products));
            return product;
            
        } catch (e) {
            console.log(e);
        }
        
       console.log(`Product ${product.title} submitted successfully`);
    };

    getProductById = async (productId) => {
        
        const file = await fs.readFile("./src/products.json", "utf-8");
        this.products = JSON.parse(file);

        const productById = this.products.find((product) => product.id === productId);

        if(!productById) return "Not Found";

        console.log("Producto encontrado");
        return productById;
    }

    updateProduct = async (id, product) => {
        try {
            const file = await fs.readFile("./src/products.json", "utf-8");
            this.products = JSON.parse(file);

            let productFound = this.products.find((product) => product.id === id);
            if(!productFound){
                return `No se ha encontrado el producto con id: ${id}`;
            }
            
            let update = this.products.map((p) => {
                if(p.id === id){
                    return {...p, ...product};
                }
                return p;
            });

            await fs.writeFile("./src/products.json", JSON.stringify(update, null, 2));
            console.log("ProductFound:")
            return productFound;
            
        } catch (e) {
            console.log(e)
        }
        //console.log("Producto a actualizar:", await productManager.updateProduct(idUpdate, productUpdate));
    }

    deleteProduct =  async (id) => {
        try {
            const file = await fs.readFile("./src/products.json", "utf-8");
            this.products = JSON.parse(file);

            let productFound = this.products.find((product) => product.id === id);
            if(!productFound){
                return `No se ha encontrado el producto con id: ${id}`;
            }
            // Filtra los productos que quier eliminar y guarda los que no 
            let deleteProduct = this.products.filter((p) => p.id !== id)
        
            await fs.writeFile("./src/products.json", JSON.stringify(deleteProduct, null, 2));
            //console.log("DP:", deleteProduct);
            console.log("PF:", productFound)
            return productFound;
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

