import CartsDAO from "../dao/mongoDB/carts.mongo.dao.js";
import ProductsDAO from "../dao/mongoDB/products.mongo.dao.js";
import * as ProductsServices from "../services/products.services.js";
import * as TicketsServices from "../services/tickets.services.js";

const CartsDao = new CartsDAO();
const ProductsDao = new ProductsDAO();


export const GetCarts = async () => {

    try {
        const getCarts = await CartsDao.getCarts();
        return getCarts;
    } catch (e) {
        return [];
    }
};

export const GetCartById = async (cid) => {

    try {
        const getCart = await CartsDao.getCartById(cid);
        return getCart;
    } catch (e) {
        console.log(e);
    }
};

export const PostCart = async (cart) => {

    const { products } = cart
    try {
        const addCart = await CartsDao.createCart(cart);
        return addCart;
    } catch (e) {
        console.log(e);
    }
};

export const PostProductInCartById = async (cidCart, productById) => {

    try {
        await CartsDao.addProductInCartById(cidCart, productById)
        return await CartsDao.getCartById(cidCart);
    } catch (e) {
        console.log(e);
    }
};

export const DeleteCart = async (cid) => {

    try {
        const remove = await CartsDao.deleteCart(cid);
        return remove;
    } catch (e) {
        console.log(e);
    }
};

export const DeleteAllProductsInCartById = async (cid) => {

    try {
        const deleteProds = await CartsDao.deleteProducts(cid); 
        return deleteProds;
    } catch (e) {
        console.log(e);
    }
};

export const DeleteAllProductsByIdInCartById = async (cid, pid) => {
    
    try {
        const cart = await CartsDao.deleteAllProductsByIdInCartById(cid, pid);
        return cart;
    } catch {

    }
}

export const DeleteProductInCartById = async (cidCart, productById) => {

    try {
        await CartsDao.deleteProductInCartById(cidCart, productById)
        return await CartsDao.getCartById(cidCart);
    } catch (e) {
        console.log(e);
    }
};    

export const PutProductQuantityByIdInCartById = async (cid, pid, quantity) => {

    try {
        return await CartsDao.updateProductQuantity(cid, pid, quantity);
    } catch (e) {
        console.log(e);
    }
};

export const GetPurchase = async (cid) => {

    try {
        const cart = await CartsDao.getCartById(cid);
        const prods = cart.products.map(prod => prod); 
        return prods;
    } catch (e) {
        throw e;
    }
};

export const PostPurchase = async (cid) => {

    try {
        const cart = await CartsDao.getCartById(cid);
        const map = cart.products.map(async (e) => {
            let prodId = e._id; 
            let prodQty = e.quantity; 
            if (!await ProductsServices.GetProductStockById(prodId) >= prodQty) throw new Error("Producto/s con stock insuficiente");
            // ------- Resta de stock en products ------- // 
            await ProductsServices.UpdateProductStockAfterPurchase(prodId, prodQty);
            // ------- Elimina del cart los productos que se pudieron comprar ------- //
            await DeleteAllProductsByIdInCartById(cid, prodId);
            await TicketsServices.PostTicket();
            return await GetCartById(cid);
        });
        return await Promise.all(map);
    } catch (e) {
        throw e;
    }
};