class ProductManager {

    constructor () {
        this.products = [];
    }

    #id = 0;

    getProducts = () => {
        return this.products;
    }

    addProduct = (product) => {

        const {title, description, price, thumbnail, code, stock} = product

        const itsValid = this.products.some((productFind) => productFind.code === code);
        if(itsValid){
            console.log(`ERROR: Code in use in ${product.title}`);
            return;
        }

        const newProduct = {
            id: this.#id++,
            ...product,
        }
        this.products.push(newProduct);
        console.log(`Product ${product.title} submitted successfully`);
    }

    getProductById = (productId) => {
        
        const productById = this.products.find((product) => product.id === productId);

        if(!productById) return "Not Found";

        console.log("Producto encontrado");
        return productById;
    }
}

const productManager = new ProductManager()

productManager.addProduct({
    title: "Remera", 
    description: "Blanco", 
    price: 20000, 
    thumbnail: "Ruta de imagen", 
    code: 1111, 
    stock: 1000
});
productManager.addProduct({
    title: "Buzo", 
    description: "Negro", 
    price: 40000, 
    thumbnail: "Ruta de imagen", 
    code: 2222, 
    stock: 700
});
productManager.addProduct({
    title: "Jogger", 
    description: "Beige", 
    price: 35000, 
    thumbnail: "Ruta de imagen", 
    code: 3333, 
    stock: 5000
});
productManager.addProduct({
    title: "Jean", 
    description: "Azul", 
    price: 37000, 
    thumbnail: "Ruta de imagen", 
    code: 4444, 
    stock: 800
});
productManager.addProduct({
    title: "Campera", 
    description: "Verde", 
    price: 70000, 
    thumbnail: "Ruta de imagen", 
    code: 4444, 
    stock: 300
});

console.log(productManager.getProducts())