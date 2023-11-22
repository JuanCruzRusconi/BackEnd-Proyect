import e from "express";
import * as CartsServices from "../services/carts.services.js";
import * as ProductsServices from "../services/products.services.js"
import * as TicketsServices from "../services/tickets.services.js";

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
        if(!await ProductsServices.GetProductById(productById)) res.send({error: true, msg: "Producto no existe"});
        else res.send(await CartsServices.PostProductInCartById(
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
    } catch (e) {
        res.status(502).send({error : true, msg: e.message})
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
        const qty = await ProductsServices.GetProductById(pid);
        if(quantity >= qty.stock) res.send({ error: true, msg: "Cantidad no dispoible" });
        else {
            const cart = await CartsServices.PutProductQuantityByIdInCartById(
                await CartsServices.GetCartById(cid),
                await ProductsServices.GetProductById(pid),
                quantity
            );
            res.send({ error: false, updated: true });
        }
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

export const GETPurchase = async (req, res) => {

    try {
        const { cid } = req.params;
        const cart = await CartsServices.GetPurchase(cid);
        res.send(cart);
    } catch {
        res.status(502).send({error : true})
    }
};

export const POSTPurchase = async (req, res) => {

    try {
        const { cid } = req.params;
        const cart = await CartsServices.GetCartById(cid);
        if(!cart.products.length >= 1) throw new Error("No posee productos en el carrito");
        const buyCart = await CartsServices.PostPurchase(cid); 
        //res.send(buyCart);
        res.send({error: false, msg: "Compra realizada, ticket enviado"})
    } catch (e) {
        res.status(502).send({error: true, msg: e.message});
    }
};
