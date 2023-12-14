import dao from "../dao/factory.dao.js";
import CartsDTOReturn from "../dto/carts.dto.js";

const { Cart } = dao;

export default class CartsRepository {

    constructor () {
        this.model = new Cart();
    };

    createCart = async (cart, next) => {

        try {
            const response = await this.model.createCart(cart, next);
            return response;
        } catch (error) {
            error.from = "CartsRepository";
            return next(error);
        }
    };

    createUserCart = async (user, next) => {

        try {
            const response = await this.model.createUserCart(user, next);
            return response;
        } catch (error) {
            error.from = "CartsRepository";
            return next(error);
        }
    };

    getCarts = async (next) => {

        try {
            let carts = await this.model.getCarts(next);
            const responseDto = carts.map((cart) => new CartsDTOReturn(cart));
            return responseDto;
        } catch (error) {
            error.from = "CartsRepository";
            return next(error);
        }
    };

    getCartById = async (cid, next) => {

        try {
            const response = await this.model.getCartById(cid, next);
            const responseDto = new CartsDTOReturn(response);
            return responseDto;
        } catch (error) {
            error.from = "CartsRepository";
            return next(error);
        }
    };

    updateProductInCartById = async (cid, pid, next) => {

        try {
            const response = await this.model.updateProductInCartById(cid, pid, next);
            return response;
        } catch (error) {
            error.from = "CartsRepository";
            return next(error);
        }
    };

    updateProductQuantity = async (cid, pid, quantity, next) => {

        try {
            const response = await this.model.updateProductQuantity(cid, pid, quantity, next);
            return response;
        } catch (error) {
            error.from = "CartsRepository";
            return next(error);
        }
    };

    deleteCart = async (cid, next) => {

        try {
            const response = await this.model.deleteCart(cid, next);
            return response;
        } catch (error) {
            error.from = "CartsRepository";
            return next(error);
        }
    };

    deleteProductsInCart = async (cid, next) => {

        try {
            const response = await this.model.deleteProductsInCart(cid, next); 
            return response;
        } catch (error) {
            error.from = "CartsRepository";
            return next(error);
        }
    };

    deleteProductInCartById = async (cid, pid, next) => {

        try {
            const response = await this.model.deleteProductInCartById(cid, pid, next);
            return response
        } catch (error) {
            error.from = "CartsRepository";
            return next(error);
        }
    };    

    deleteAllProductsByIdInCartById = async (cid, pid, next) => {
        
        try {
            const response = await this.model.deleteAllProductsByIdInCartById(cid, pid, next);
            return response;
        } catch (error) {
            error.from = "CartsRepository";
            return next(error);
        }
    };

}