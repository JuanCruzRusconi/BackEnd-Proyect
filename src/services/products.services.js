import ProductsRepository from "../repositories/products.repositories.js";


export default class ProductsServices {

    constructor () {
        this.repository = new ProductsRepository(); 
    };

    CreateProduct = async (product, next) => {
    
        const {title, description, price, thumbnail, code, stock} = product
    
        try {
            //if(!product.title || !product.description || !product.price || !product.code || !product.stock) throw new Error ("Faltan parametros");
            const products = await this.GetProducts(next);
            if(products.find((prod) => prod.code === code)) throw new Error("Code in use!");
            const addProd = await this.repository.createProduct(product, next);
            return addProd;
        } catch (error) {
            error.from = "ProductsServices";
            return next(error);
        }
    };

    GetProducts = async (next) => {
        try {
            const products = await this.repository.getProducts(next);
            return products;
        } catch (error) {
            error.from = "ProductsServices";
            return next(error);
        }
     };

    GetProductById = async (productId, next) => {
        
        try {
            const product = await this.repository.getProductById(productId, next);
            return product;
        } catch (error) {
            error.from = "ProductsServices";
            return next(error);
        }
    };

    GetProductStockById = async (productId, next) => {
        
        try {
            const prod = await this.repository.getProductById(productId, next);
            return prod.stock;
        } catch (error) {
            error.from = "ProductsServices";
            return next(error);
        }
    };

    UpdateProduct = async (id, product, next) => {
     
        try {  
            const updateProd = await this.repository.updateProduct(id, product, next);
            return updateProd;
        } catch (error) {
            error.from = "ProductsServices";
            return next(error);
        }  
    };

    UpdateProductStockAfterPurchase =  async (id, quantity, next) => {
     
        try {
            const prod = await this.GetProductById(id, next);
            if(prod.stock < quantity) throw new Error("No hay stock disponible");
            const newStock = prod.stock - quantity;
            const updateProd = await this.repository.updateProductStockAfterPurchase(id, newStock, next);
            return updateProd;
        } catch (error) {
            error.from = "ProductsServices";
            return next(error);
        }
    };

    DeleteProduct =  async (id, next) => {
     
        try {
            const deleteProd = await this.repository.deleteProduct(id, next);
            return deleteProd;
        } catch (error) {
            error.from = "ProductsServices";
            return next(error);
        }
    };

}