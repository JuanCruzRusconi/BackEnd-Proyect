import CartsRepository from "../repositories/carts.repositories.js";
import ProductsServices from "../services/products.services.js";
import TicketsServices from "../services/tickets.services.js";

const ProductService = new ProductsServices();
const TicketService = new TicketsServices();

export default class CartsServices {

    constructor () {
        this.repository = new CartsRepository();
    };

    CreateCart = async (cart, next) => {
    
        const { products } = cart
        try {
            const newCart = await this.repository.createCart(cart, next);
            return newCart;
        } catch (error) {
            error.from = "CartsServices";
            return next(error);
        }
    };
    
    CreateUserCart = async (user, next) => {
    
        try {
            const newUserCart = await this.repository.createUserCart(user, next);
            return newUserCart;
        } catch (error) {
            error.from = "CartsServices";
            return next(error);
        }
    };
    
    CreatePurchase = async (cid, user, next) => {
    
        try {
            const cart = await this.GetCartById(cid, next);
            console.log(cart.products)
            const purchase = cart.products.map(async (e) => {
                let prodId = e._id; 
                let prodQty = e.quantity; 
                if (!await ProductService.GetProductStockById(prodId, next) >= prodQty) throw new Error("Producto/s con stock insuficiente");
                let amount = await this.GetCartAmount(cid, next);
                if(user) {
                    const ticket = await TicketService.CreateTicket(user, amount, next);
                    // ------- Resta de stock en products ------- // 
                    await ProductService.UpdateProductStockAfterPurchase(prodId, prodQty, next);
                    // ------- Elimina del cart los productos que se pudieron comprar ------- //
                    await this.DeleteAllProductsByIdInCartById(cid, prodId, next);
                    return ticket;
                };

            });
            return await Promise.all(purchase);
        } catch (error) {
            error.from = "CartsServices";
            return next(error);
        }
    };

    GetCarts = async (next) => {

        try {
            const carts = await this.repository.getCarts(next);
            return carts;
        } catch (error) {
            error.from = "CartsServices";
            return next(error);
        }
    };
    
    GetCartById = async (cid, next) => {
    
        try {
            const cart = await this.repository.getCartById(cid, next);
            return cart;
        } catch (error) {
            error.from = "CartsServices - getCarts()";
            return next(error);
        }
    };

    GetPurchase = async (cid, next) => {
    
        try {
            const cart = await this.GetCartById(cid, next);
            const prods = cart.products.map(prod => prod); 
            return prods;
        } catch (error) {
            error.from = "CartsServices";
            return next(error);
        }
    };

    GetCartAmount = async (cid, next) => {

        try {
            const cart = await this.GetCartById(cid, next);
            let total = 0;
            const products = cart.products.map(async (product) => {
                let prodId = product._id;
                let prod = await ProductService.GetProductById(prodId, next);
                const subtotal = prod.price * product.quantity;
                return subtotal;
        });
            let subtotals = await Promise.all(products);
            total = subtotals.reduce((acc, subtotal) => acc + subtotal, 0);
            return total;
        } catch (error) {
            error.from = "CartsServices";
            return next(error);
        }
    };

    UpdateProductInCartById = async (cid, pid, next) => {
    
        try {
            await this.repository.updateProductInCartById(cid, pid, next);
            const updatedCart = await this.GetCartById(pid, next);
            return updatedCart;
        } catch (error) {
            error.from = "CartsServices";
            return next(error);
        }
    };
        
    UpdateProductQuantityByIdInCartById = async (cid, pid, quantity, next) => {
    
        try {
            const updatedCart = await this.repository.updateProductQuantity(cid, pid, quantity, next);
            return updatedCart;
        } catch (error) {
            error.from = "CartsServices";
            return next(error);
        }
    };
    
    DeleteCart = async (cid, next) => {
    
        try {
            const remove = await this.repository.deleteCart(cid, next);
            return remove;
        } catch (error) {
            error.from = "CartsServices";
            return next(error);
        }
    };
    
    DeleteAllProductsInCartById = async (cid, next) => {
    
        try {
            const deleteProds = await this.repository.deleteProductsInCart(cid, next); 
            return deleteProds;
        } catch (error) {
            error.from = "CartsServices";
            return next(error);
        }
    };

    DeleteProductInCartById = async (cid, pid, next) => {
    
        try {
            await this.repository.deleteProductInCartById(cid, pid, next)
            return await this.GetCartById(cid, next);
        } catch (error) {
            error.from = "CartsServices";
            return next(error);
        }
    };   
    
    DeleteAllProductsByIdInCartById = async (cid, pid, next) => {
        
        try {
            const cart = await this.repository.deleteAllProductsByIdInCartById(cid, pid, next);
            return cart;
        } catch (error) {
            error.from = "CartsServices";
            return next(error);
        }
    }; 
    
}