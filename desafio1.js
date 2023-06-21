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

        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.stock || !product.code){
            return "All camps will be neccesary"
        } else {
            this.products.push(product)
            return product
        }

    }
/*
    getProductCode = (productCode) => {

        const productCode = this.products.find((product) => product.code === productCode)

        if(productCode) return "Code in use"
    }
*/
    getProductById = (productId) => {
        
        const productById = this.products.find((product) => product.id === productId)

        if(!productById) return "Not Found"
    }
}

const products = new ProductManager()
products.addProduct("Remera", "Blanco", 15000, "Ruta de imagen", 1000)
products.addProduct("Buzo", "Negro", 40000, "Ruta de imagen", 700)
products.addProduct("Jogger", "Beige", 35000, "Ruta de imagen", 500)
products.addProduct("Jean", "Azul", 37000, "Ruta de imagen", 1000)
products.addProduct("Campera", "Verde", 70000, "Ruta de imagen", 300)
console.log(products.getProducts())

