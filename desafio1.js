class ProductManager {

    constructor() {
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        
        const product = {
            id: this.products.length+1,
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        }

        this.products.push(product)
        return product

    }

    getProductById = (productId) => {
        
        const productById = this.products.find((product) => product.id === productId)

        if(!productById) return "Not Found"
    }
}

const productManager = new ProductManager()

productManager.addProduct("Remera", "Blanco", 20000, "Ruta de imagen", 1111, 1000);
productManager.addProduct("Buzo", "Negro", 40000, "Ruta de imagen", 2222, 700);
productManager.addProduct("Jogger", "Beige", 35000, "Ruta de imagen", 3333, 500);
productManager.addProduct("Jean", "Azul", 37000, "Ruta de imagen", 4444, 800);
productManager.addProduct("Campera", "Verde", 70000, "Ruta de imagen", 500, 300);

console.log(productManager.getProducts())
