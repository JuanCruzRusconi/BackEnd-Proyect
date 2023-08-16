import { Router } from "express";
//import CartManager from "../dao/fileSystem/CartManager.js";
//import ProductManager from "../dao/fileSystem/ProductManager.js"
import CartManager from "../dao/mongoDB/CartManager.js";
import ProductManager from "../dao/mongoDB/ProductManager.js";
const cartManager = new CartManager("./carts.json");
const productManager = new ProductManager("./products.json");

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
    
    //const body = req.body;
    try {
        //const { cid, pid } = req.params;
        //const addProductToCart = await cartManager.addProduct(+cid);
        let cidCart = +req.params.cid;
        let productById = +req.params.pid;
        res.send(await cartManager.addProductInCartById(
            await cartManager.getCartById(cidCart),
            await productManager.getProductById(productById)
        ));
    } catch {
        res.status(502).send({error : true})
    }
})

cartsRouter.get("/:cid/product/:pid", async (req, res) => {
    
    //const body = req.body;
    try {
        const { cid, pid } = req.params;
        const addProductToCart = await cartManager.addProduct(+cid, +pid);
        res.send(addProductToCart);
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

cartsRouter.get("/:cid", async (req, res) => {

    try {
        const { cid } = req.params;
        const carts = await cartManager.getCartById(+cid);
        res.send(carts);
    } catch {
        res.status(502).send({error : true})
    }
})

export default cartsRouter