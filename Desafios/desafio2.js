import fs from "fs/promises"

class ProductManager {

    constructor () {
        this.products = [];
    }

    #id = 0;

    getProducts = async () => {
        const file = await fs.readFile("./Desafios/products.json", "utf-8");
        const products = JSON.parse(file);
        return products;
    }

    addProduct = async (product) => {

        const {title, description, price, thumbnail, code, stock} = product

        try {
            const file = await fs.readFile("./Desafios/products.json", "utf-8");
            const products = JSON.parse(file);

            const itsValid = this.products.some((productFind) => productFind.code === code);
            if (itsValid) {
                console.log(`ERROR: Code in use in ${product.title}`);
                return;
            }

            const newProduct = {
                //id: this.#id++,
                id: products.length,
                ...product,
            }

            //this.products = products;
            products.push(newProduct);
            await fs.writeFile("./Desafios/products.json", JSON.stringify(products));
            //return product;
        } catch (e) {
            console.log(e);
        }
        
       // this.products.push(newProduct);
       console.log(`Product ${product.title} submitted successfully`);
    };

    getProductById = (productId) => {
        
        const productById = this.products.find((product) => product.id === productId);

        if(!productById) return "Not Found";

        console.log("Producto encontrado");
        return productById;
    }
/*
    updateProduct = async () => {
        try {
            const file = await fs.readFile("./Desafios/products.json", "utf-8");
            const products = JSON.parse(file);
            
            const update = await products.find((product) => product.id === 2)
            console.log("Producto a actualizar:")
            return update;
            
        } catch (e) {
            console.log(e)
        }
       //console.log(updateProduct())
    }
    */
/*
    deleteProduct =  async () => {
        try {
            const file = await fs.readFile("./Desafios/products.json", "utf-8");
            const products = JSON.parse(file);

            const deleted = await products.filter((product) => product.id === 2);
            console.log("Producto eliminado:")
            //return deleteById;
        
            await fs.writeFile("./Desafios/products.json", JSON.stringify(products));
            return deleted;
        } catch (e) {
            console.log(e)
        }
        
    }
    */
    updateProduct = async (id, product) => {
        try {
            const file = await fs.readFile("./Desafios/products.json", "utf-8");
            const products = JSON.parse(file);

            let productFound = products.find((product) => product.id === id);
            if(!productFound){
                return `No se ha encontrado el producto con id: ${id}`;
            }
            
            let update = this.products.map((p) => {
                if(p.id === id){
                    return {...p, ...product}
                }
                return p;
            });

            await fs.writeFile("./Desafios/products.json", JSON.stringify(update, null, 2));
            //console.log("Producto a actualizar:")
            //return update;
            
        } catch (e) {
            console.log(e)
        }
        
       //console.log(updateProduct())
    }

    deleteProduct =  async (id) => {
        try {
            const file = await fs.readFile("./Desafios/products.json", "utf-8");
            const products = JSON.parse(file);

            let productFound = products.find((product) => product.id === this.#id);
            if(!productFound){
                return `No se ha encontrado el producto con id: ${id}`;
            }

            let deleteProduct = products.filter((p) => p.id !== id)
        
            await fs.writeFile("./Desafios/products.json", JSON.stringify(deleteProduct, null, 2));
            return productFound;
        } catch (e) {
            console.log(e)
        }
        
    }
}


const productManager = new ProductManager()
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
*/
console.log(await productManager.getProducts())

console.log("Producto a actualizar:", await productManager.updateProduct())

console.log("Producto a eliminar:", await productManager.deleteProduct())
