import ProductsDAO from "../dao/mongoDB/products.mongo.dao.js";

const ProductsDao = new ProductsDAO();

export const GetProducts = async () => {
     try {
         const getProds = await ProductsDao.getProducts();
         return getProds;
     } catch (e) {
        return [];
     }
 };

export const PostProduct = async (product) => {
    
    const {title, description, price, thumbnail, code, stock} = product

    try {
        const codeValid = await ProductsDao.getProductById({code: code});
        if (codeValid) return "Code in use";
        const addProd = await ProductsDao.createProduct(product);
        return addProd;
    } catch (e) {
        console.log(e);
    }
};

export const GetProductById = async (productId) => {
        
     try {
         const getProd = await ProductsDao.getProductById({_id: productId});
         return getProd;
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