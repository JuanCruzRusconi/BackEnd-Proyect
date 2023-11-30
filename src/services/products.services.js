import ProductsDAO from "../dao/mongoDB/products.mongo.dao.js";
import ProductsDTOReturn from "../dto/products.dto.js";
import productsModel from "../schemas/products.schema.js";

const ProductsDao = new ProductsDAO();

export const GetProducts = async () => {
    try {
        const products = await ProductsDao.getProducts();
        const prodsDto = products.map((prod) => new ProductsDTOReturn(prod));
        return prodsDto;
    } catch (e) {
        return [];
    }
 };

export const PostProduct = async (product) => {
    
    const {title, description, price, thumbnail, code, stock} = product

    try {
        //if(!product.title || !product.description || !product.price || !product.code || !product.stock) throw new Error ("Faltan parametros");
        const products = await GetProducts();
        if(products.find((prod) => prod.code === code)) throw new Error("Code in use!");
        const addProd = await ProductsDao.createProduct(product);
        return addProd;
    } catch (e) {
        throw e
    }
};

export const GetProductById = async (productId) => {
        
     try {
         const product = await ProductsDao.getProductById(productId);
         const productDto = new ProductsDTOReturn(product);
         return productDto;
     } catch (e) {
         console.log(e);
     }
};

export const GetProductStockById = async (productId) => {
        
    try {
        const prod = await ProductsDao.getProductById(productId);
        return prod.stock;
    } catch (e) {
        console.log(e);
    }
};

export const PutProduct = async (id, product) => {
     
    try {  
         const updateProd = await ProductsDao.updateProduct(id, product);
        return updateProd;
    } catch (e) {
         console.log(e);
     }
 };

export const DeleteProduct =  async (id) => {
     
     try {
         const deleteProd = await ProductsDao.deleteProduct(id);
         return deleteProd;
     } catch (e) {
         console.log(e);
     }
 };

 export const UpdateProductStockAfterPurchase =  async (id, quantity) => {
     
    try {
        const prod = await ProductsDao.getProductById(id);
        if(prod.stock < quantity) throw new Error("No hay stock disponible");
        const newStock = prod.stock - quantity;
        const updateProd = await ProductsDao.updateProductStockAfterPurchase(id, newStock);
        return updateProd;
    } catch (e) {
        throw e;
    }
};
