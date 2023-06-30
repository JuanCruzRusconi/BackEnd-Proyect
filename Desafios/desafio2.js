import fs from "fs/promises"

class ProductManager {

    constructor () {
        this.products = [];
    }

    #id = 0;

    getProducts = async () => {
        return this.products;

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

            this.products.push(newProduct);
            products.push(newProduct);
            await fs.writeFile("./Desafios/products.json", JSON.stringify(products))
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

    updateProduct = async () => {
        try {
            const file = await fs.readFile("./Desafios/products.json", "utf-8");
            const products = JSON.parse(file);
            
            const update = products.find((product) => product.id === 2)
            console.log(update)
        } catch (e) {
            console.log(e)
        }

    }

    deleteProduct =  async () => {
        try {
            const file = await fs.readFile("./Desafios/products.json", "utf-8");
            const products = JSON.parse(file);

            const deleteById = products.filter((product) => product.id === 2);
            console.log(deleteById);
        } catch (e) {
            console.log(e)
        }
        
    }
}


const productManager = new ProductManager()

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

console.log(await productManager.getProducts())