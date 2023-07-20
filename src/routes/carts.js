import { Router } from "express";
import CartManager from "../CartManager.js";
const cartManager = new CartManager("./carts.json");

const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
    
    const body = req.body;
    try {
        const createCart = await cartManager.addCart(body);
        res.send(createCart);
    } catch {
        res.status(502).send({error : true})
    }
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    
    const body = req.body;
    try {
        const { cid, pid } = req.params;
        const addProductToCart = await cartManager.addProduct(+cid, +pid, body);
        res.send(createCart);
    } catch {
        res.status(502).send({error : true})
    }
})

cartsRouter.get("/", async (req, res) => {

    try {
        const carts = await cartManager.getCarts();
        res.send(carts);
    } catch {
        res.status(502).send({error : true})
    }
})

cartsRouter.get("/:pid", async (req, res) => {

    try {
        const { pid } = req.params;
        const carts = await cartManager.getCarts();
        res.send(carts.find((cart) => cart.id == pid));
    } catch {
        res.status(502).send({error : true})
    }
})

export default cartsRouter