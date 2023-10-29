import * as CartsServices from "../services/carts.services.js";
import * as ProductsServices from "../services/products.services.js"

export const POSTCart = async (req, res) => {
    
    try {
        const body = req.body;
        const createCart = await CartsServices.PostCart(body);
        res.send(createCart);
    } catch {
        res.status(502).send({error : true})
    }
};

export const POSTProductByIdInCartById = async (req, res) => {
    
    try {
        let cidCart = req.params.cid;
        let productById = req.params.pid;
        res.send(await CartsServices.PostProductInCartById(
            await CartsServices.GetCartById(cidCart),
            await ProductsServices.GetProductById(productById)
        ));
    } catch {
        res.status(502).send({error : true})
    }
};

export const GETCarts = async (req, res) => {

    try {
        const carts = await CartsServices.GetCarts();
        res.send(carts);
    } catch {
        res.status(502).send({error : true})
    }
};

export const GETCartById = async (req, res) => {

    try {
        const { cid } = req.params;
        const carts = await CartsServices.GetCartById(cid);
        res.send(carts);
    } catch {
        res.status(502).send({error : true})
    }
};

export const PUTProductQuantityByIdInCartById = async (req, res) => {

    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const carts = await CartsServices.PutProductQuantityByIdInCartById(
            await CartsServices.GetCartById(cid),
            await ProductsServices.GetProductById(pid),
            quantity
        );
        res.send({error: false, updated: true});
    } catch {
        res.status(502).send({error : true})
    }
};

export const DELETECart = async (req, res) => {

    try {
        const { cid } = req.params;
        const cart = await CartsServices.DeleteCart(cid);
        res.send({error: false, deleted: true});
    } catch {
        res.status(502).send({error : true})
    }
};

export const DELETEProductsInCartById = async (req, res) => {

    try {
        const { cid } = req.params;
        const carts = await CartsServices.DeleteAllProductsInCartById(cid);
        res.send(carts);
    } catch {
        res.status(502).send({error : true})
    }
};

export const DELETEProductByIdInCartById = async (req, res) => {

    try {
        const { cid, pid } = req.params;
        const carts = await CartsServices.DeleteProductInCartById(
            await CartsServices.GetCartById(cid),
            await ProductsServices.GetProductById(pid)
        );
        res.send(carts);
    } catch {
        res.status(502).send({error : true})
    }
};






