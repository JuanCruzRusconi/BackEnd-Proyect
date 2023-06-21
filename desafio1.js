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

        const productCode = this.products.find((product) => product.code === productCode)
        if(productCode) return "Code in use"

        this.products.push(product)
        return product

    }

    getProductById = (productId) => {
        
        const productById = this.products.find((product) => product.id === productId)

        if(!productById) return "Not Found"
    }
}

addProduct(remera, blanca, 20000, "ruta de imagen", 0000, 10)