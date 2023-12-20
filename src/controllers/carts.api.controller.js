import CartsServices from "../services/carts.services.js";
import ProductsServices from "../services/products.services.js";
import CustomError from "../utils/customError.js";
import ErrorsDictionary from "../utils/errorsDictionary.js";


const ProductsService = new ProductsServices();

export default class CartsApiControllers {

    constructor () {
        this.service = new CartsServices();
    };  

    // ------- Rutas orientadas al usuario, acceso de usuario logueado ------- //
    POSTPurchaseUserCart = async (req, res, next) => {
    
        try {
            const user = req.user._id;
            const cart = req.user.cart;
            const cartId = cart._id;
            const cartUser = await this.service.GetCartById(cartId, next);
            if(!cart.products.length >= 1) return CustomError.createError(ErrorsDictionary.DOCUMENT_EMPTY);
            const cartUserId = cartUser._id;
            const newTicket = await this.service.CreatePurchase(cartUserId, user, next);
            const ticketId = newTicket[0]._id;
            if(!newTicket) return CustomError.createError(ErrorsDictionary.USER_INPUT_ERROR);
            res.status(200).send({ status: "sucess", payload: ticketId, message: `Compra dirigida a la seccion de tickets, informacion enviada al usuario.` })
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };

    GETUserCart = async (req, res, next) => {
    
        try {
            const cart = req.user.cart._id;
            if(!req.user) return CustomError.createError(ErrorsDictionary.NOT_LOGGED);
            const userCart = await this.service.GetCartById(cart, next)
            res.status(200).send({ status: "success", payload: userCart });
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };

    PUTProductQuantityByIdInUserCart = async (req, res, next) => {
    
        try {
            const { pid } = req.params;
            const { quantity } = req.body;
            const user = req.user.cart;
            const product = await ProductsService.GetProductById(pid, next);
            if(quantity >= product.stock) return CustomError.createError(ErrorsDictionary.PRODUCT_INPUT_ERROR);
            else {
                const cart = await this.service.UpdateProductQuantityByIdInCartById(
                    user._id,
                    product._id,
                    quantity,
                    next
                );
                res.status(200).send({ status: "success", updated: true });
            }
        } catch (error) {
            error.from = "CartsApiControllers";
            return next(error);
        }
    };

    DELETEProductsInUserCart = async (req, res, next) => {
    
        try {
            const user = req.user.cart;
            const getCart = await this.service.GetCartById(user._id, next);
            if(getCart.products.length == 0) return CustomError.createError(ErrorsDictionary.DOCUMENT_EMPTY);
            else { await this.service.DeleteAllProductsInCartById(user._id, next);}
            res.status(200).send({ status: "success", deleted: true });
        } catch (error) {
            error.from = "CartsApiControllers";
            return next(error);
        }
    };
    
    DELETEProductInUserCartById = async (req, res, next) => {
    
        try {
            const { pid } = req.params;
            const user = req.user.cart;
            const cart = await this.service.GetCartById(user._id, next);
            if(!cart.products.length >= 1) return CustomError.createError(ErrorsDictionary.DOCUMENT_EMPTY);
            const cartDeleted = await this.service.DeleteProductInCartById(
                user._id,
                await ProductsService.GetProductById(pid, next),
                next
            );
            res.status(200).send({ status: "success", response: "Product deleted." });
        } catch (error) {
            error.from = "CartsApiControllers";
            return next(error);
        }
    };

    // ------- Rutas orientadas al administrador, acceso unicamente admin ------- //
    POSTCart = async (req, res, next) => {
    
        try {
            const body = req.body;
            const createCart = await this.service.CreateCart(body, next);
            if(!createCart) return CustomError.createError(ErrorsDictionary.DOCUMENT_ERROR);
            res.status(201).send({ status: "success", payload: createCart });
        } catch (error) {
            error.from = "CartsApiControllers";
            return next(error);
        }
    };
    
    POSTProductInCart = async (req, res, next) => {
        
        try {
            const { cid, pid } = req.params;
            if(!await this.service.GetCartById(cid, next) || !await ProductsService.GetProductById(pid, next)) {
               return CustomError.createError(ErrorsDictionary.USER_INPUT_ERROR);
            }
            else {
                const cart = await this.service.UpdateProductInCartById(
                    await this.service.GetCartById(cid, next),
                    await ProductsService.GetProductById(pid, next),
                    next);
                    res.status(200).send({ status: "success", response: cart });
                }
        } catch (error) {
            error.from = "CartsApiControllers";
            return next(error);
        }
    };

    POSTPurchase = async (req, res, next) => {
    
        try {
            const { cid } = req.params;
            const cart = await this.service.GetCartById(cid, next);
            if(!req.user) return CustomError.createError(ErrorsDictionary.NOT_LOGGED);
            if(!cart.products.length >= 1) return CustomError.createError(ErrorsDictionary.DOCUMENT_EMPTY);
            const buyCart = await this.service.CreatePurchase(cid, next); 
            res.status(200).send({error: false, msg: "Compra realizada." })
        } catch (error) {
            error.from = "CartsApiControllers";
            return next(error);
        }
    };

    POSTProductInUserCartById = async (req, res, next) => {
    
        try {
            const { pid } = req.params
            const cart = req.user.cart._id;
            console.log(cart)
            const cartUser = await this.service.GetCartById(cart, next);
            if(!cartUser) return CustomError.createError(ErrorsDictionary.NOT_FOUND_ONE);
            const cartUserId = cartUser._id;
            const prod = await this.service.UpdateProductInCartById(cartUserId, pid, next);
            if(!await ProductsService.GetProductById(pid, next)) return CustomError.createError(ErrorsDictionary.PRODUCT_INPUT_ERROR);
            res.status(200).send({ status: "success", mycart: await this.service.GetCartById(cart, next) });
        } catch (error) {
            error.from = "UsersApiControllers";
            return next(error);
        }
    };

    GETCarts = async (req, res, next) => {
    
        try {
            const carts = await this.service.GetCarts(next);
            if(!carts) return CustomError.createError(ErrorsDictionary.NOT_FOUND);
            res.status(200).json({ status: "sucess", payload: carts })
        } catch (error) {
            error.from = "CartsApiControllers";
            return next(error);
        }
    };
    
    GETCartById = async (req, res, next) => {
    
        try {
            const { cid } = req.params;
            const cart = await this.service.GetCartById(cid, next);
            if(!cart) return CustomError.createError(ErrorsDictionary.NOT_FOUND_ONE);
            res.status(200).send({ status: "success", response: cart });
        } catch (error) {
            error.from = "CartsApiControllers";
            return next(error);
        }
    };

    PUTProductQuantityById = async (req, res, next) => {
    
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const qty = await ProductsService.GetProductById(pid, next);
            if(quantity >= qty.stock) return CustomError.createError(ErrorsDictionary.PRODUCT_INPUT_ERROR);
            else {
                const cart = await this.service.UpdateProductQuantityByIdInCartById(
                    await this.service.GetCartById(cid, next),
                    await ProductsService.GetProductById(pid, next),
                    quantity,
                    next
                );
                res.status(200).send({ status: "success", updated: true });
            }
        } catch (error) {
            error.from = "CartsApiControllers";
            return next(error);
        }
    };

    DELETECart = async (req, res, next) => {
    
        try {
            const { cid } = req.params;
            const cart = await this.service.DeleteCart(cid, next);
            if(!cart) return CustomError.createError(ErrorsDictionary.NOT_FOUND_ONE);
            res.status(200).json({ status: "success", message: "Cart deleted"});
        } catch (error) {
            error.from = "CartsApiControllers";
            return next(error);
        }
    };

    DELETEProductsInCart = async (req, res, next) => {
    
        try {
            const { cid } = req.params;
            const cart = await this.service.DeleteAllProductsInCartById(cid, next);
            if(!cart.products >= 1) return CustomError.createError(ErrorsDictionary.DOCUMENT_EMPTY);
            res.status(200).send({ status: "success", response: cart });
        } catch (error) {
            error.from = "CartsApiControllers";
            return next(error);
        }
    };
    
    DELETEProductById = async (req, res, next) => {
    
        try {
            const { cid, pid } = req.params;
            const cart = await this.service.DeleteProductInCartById(
                await this.service.GetCartById(cid, next),
                await ProductsService.GetProductById(pid, next),
                next
            );
            if(!cart.length >= 1) return CustomError.createError(ErrorsDictionary.DOCUMENT_EMPTY);
            res.status(200).send({ status: "success", response: cart });
        } catch (error) {
            error.from = "CartsApiControllers";
            return next(error);
        }
    };

}
