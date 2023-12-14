import dao from "../dao/factory.dao.js";
import ProductsDTOReturn from "../dto/products.dto.js";

const { Product } = dao;

export default class ProductsRepository {

    constructor () {
        this.model = new Product();
    };

    createProduct = async (data, next) => {
        
        try {
            data = new ProductsDTOReturn(data);
            let response = await this.model.createProduct(data, next);
            return response;
        } catch (error) {
            error.from = "ProductsRepository";
            return next(error);
        }
    };

    getProducts = async (next) => {
        
        try {
            let products = await this.model.getProducts(next);
            const responseDto = products.map((prod) => new ProductsDTOReturn(prod));
            return responseDto;
        } catch (error) {
            error.from = "ProductsRepository";
            return next(error);
        }
    };
    
    getProductById = async (productId, next) => {
        
        try {
            let response = await this.model.getProductById(productId, next);
            const responseDto = new ProductsDTOReturn(response);
            return responseDto;
        } catch (error) {
            error.from = "ProductsRepository";
            return next(error);
        }
    };
    
    getProductByCode = async (code, next) => {
        
        try {
            let response = await this.model.getProductByCode(code, next);
            const responseDto = new ProductsDTOReturn(response);
            return responseDto;
        } catch (error) {
            error.from = "ProductsRepository";
            return next(error);
        }
    };
    
    updateProduct = async (id, product, next) => {
        
        try {  
            let response = await this.model.updateProduct(id, product, next);
            return response;
        } catch (error) {
            error.from = "ProductsRepository";
            return next(error);
        }
    };

    updateProductStockAfterPurchase = async (id, newStock, next) => {
        
        try {              
            let response = await this.model.updateProductStockAfterPurchase(id, newStock, next);
            return response;
        } catch (error) {
            error.from = "ProductsRepository";
            return next(error);
        }                                                           
    };
    
    deleteProduct =  async (id, next) => {
        
        try {
            let response = await this.model.deleteProduct(id, next);
            return response;
        } catch (error) {
            error.from = "ProductsRepository";
            return next(error);
        }
    };
    
}

