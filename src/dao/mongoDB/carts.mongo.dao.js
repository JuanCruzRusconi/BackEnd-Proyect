import cartsModel from "../../schemas/carts.schema.js";
import CustomError from "../../utils/customError.js";
import ErrorsDictionary from "../../utils/errorsDictionary.js";

export default class CartsMONGO  {

    constructor() {};

    createCart = async (cart, next) => {

        const { products } = cart
        try {
            const addCart = await cartsModel.create([cart]);
            return addCart;
        } catch (error) {
            error.from = "CartsMongo";
            return next(error);
        }
    };

    createUserCart = async (user, next) => {

        try {
            const addCart = await cartsModel.create({ user: user._id, products: [] });
            return addCart;
        } catch (error) {
            error.from = "CartsMongo";
            return next(error);
        }
    };

    getCarts = async (next) => {

        try {
            const carts = await cartsModel.find();
            return carts;
        } catch (error) {
            error.from = "CartsMongo";
            return next(error);
        }
    };    

    getCartById = async (cid, next) => {

        try {
            const getCart = await cartsModel.findById(cid);
            return getCart;
        } catch (error) {
            error.from = "CartsMongo";
            return next(error);
        }
    };

    updateProductInCartById = async (cid, pid, next) => {

        try {
            const filter = {
                _id: cid,
                "products._id": pid
            };
            console.log(cid)
            const cart = await cartsModel.findById(cid);
            console.log(cart);
            if (cart.products.find((p) => p._id == pid)){//.toString())) {
                const update = {
                    $inc: {
                        "products.$.quantity": 1
                    },
                }
                await cartsModel.findOneAndUpdate(filter, update);
            } else {
                const update2 = {
                    $push: {
                        products: {
                            _id: pid,
                            quantity: 1
                        },
                    }
                }
                await cartsModel.findByIdAndUpdate(cid, update2);
            }
            return await cartsModel.findById(cid);
        } catch (error) {
            error.from = "CartsMongo";
            return next(error);
        }
    };

    updateProductQuantity = async (cid, pid, quantity, next) => {

        try {
            let update = await cartsModel.findById(cid);
            update.products.map((p) => {
                if (p._id == pid._id.toString()) {
                    p.quantity = quantity;
                }
                return p;
            });
            update.save();
            return update;
        } catch (error) {
            error.from = "CartsMongo";
            return next(error);
        }
    };

    deleteCart = async (cid, next) => {

        try {
            const remove = await cartsModel.findByIdAndDelete(cid);
            return remove;
        } catch (error) {
            error.from = "CartsMongo";
            return next(error);;
        }
    };

    deleteProductsInCart = async (cid, next) => {

        try {
            const deleteProds = await cartsModel.updateOne({_id: cid}, {$set: {products: []}}); 
            return deleteProds;
        } catch (error) {
            error.from = "CartsMongo";
            return next(error);
        }
    };

    deleteProductInCartById = async (cid, pid, next) => {

           try {
            const filter = {
                   _id: cid,
                "products._id": pid
            };
            const cart = await cartsModel.findById(cid).lean();
            if (cart.products.find((p) => p._id == pid._id.toString() && p.quantity > 1)) {
                const update = {
                    $inc: {
                        "products.$.quantity": -1,
                       },
                   }
                await cartsModel.findOneAndUpdate(filter, update);
            } else {
                const update2 = {
                    $pull: {
                        products: {
                             _id: pid,
                        },
                    }
                };
                await cartsModel.findByIdAndUpdate(cid, update2);
            }
            return await cartsModel.findById(cid);
        } catch (error) {
            error.from = "CartsMongo";
            return next(error);
        }
    };    

    deleteAllProductsByIdInCartById = async (cid, pid, next) => {
        
        try {
            const cart = await cartsModel.findByIdAndUpdate({_id: cid}, { $pull: { products: { _id: pid }}});
            return cart;
        } catch (error) {
            error.from = "CartsMongo";
            return next(error);
        }
    }

};