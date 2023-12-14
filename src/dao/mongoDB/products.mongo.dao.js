import productsModel from "../../schemas/products.schema.js";

export default class ProductsMONGO {

    constructor () {};

    createProduct = async (product, next) => {
        
        try {
            const addProd = await productsModel.create([product]);
            return addProd;
        } catch (error) {
            error.from = "ProductsMongo";
            return next(error);
        }
    };

    getProducts = async (next) => {
        
        try {
            const prods = await productsModel.find();
            return prods;
        } catch (error) {
            error.from = "ProductsMongo";
            return next(error);
        }
    };

    getProductById = async (productId, next) => {
        
        try {
            const getProd = await productsModel.findById(productId);
            return getProd;
        } catch (error) {
            error.from = "ProductsMongo";
            return next(error);
        }
    };

    getProductByCode = async (code, next) => {
        
        try {
            const getProd = await productsModel.find({ code: code });
            return getProd;
        } catch (error) {
            error.from = "ProductsMongo";
            return next(error);
        }
    };

    updateProduct = async (id, product, next) => {
        
        try {  
            const updateProd = await productsModel.updateOne({_id: id}, {$set: product});
            return updateProd;
        } catch (error) {
            error.from = "ProductsMongo";
            return next(error);
        }
    };

    updateProductStockAfterPurchase = async (id, newStock, next) => {
        
        try {              
            const updateProd = await productsModel.updateOne({_id: id}, {$set: {stock: newStock}}); 
            return updateProd;
        } catch (error) {
            error.from = "ProductsMongo";
            return next(error);
        }                                                           
    };

    deleteProduct = async (id, next) => {
        
        try {
            const deleteProd = await productsModel.deleteOne({_id: id});
            return deleteProd;
        } catch (error) {
            error.from = "ProductsMongo";
            return next(error);
        }
    };
    
}

    
