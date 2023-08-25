import { Router } from "express";
import ProductManager from "../dao/mongoDB/ProductManager.js";
import productsModel from "../schemas/products.schema.js";

const productManager = new ProductManager("products");

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
   
    try {  
    const { limit = 2, page = 1, sort = 1, query = {}  } = req.query;
    const products = await productManager.getProducts() 
    const paginate = await productsModel.paginate({
        limit, page, sort, query
    });
    res.send(products);
    } catch {
        res.status(502).send({error : true})
    }
})

productsRouter.get("/:pid", async (req, res) => {
    
    try {
    const { pid } = req.params
    //const productId = products.find((product) => product.id == pid)
    const product = await productManager.getProductById(pid);
    //res.send(products.find((product) => product.id == pid));
    res.send(product);
    } catch {
        res.status(502).send({error : true})
    }
})

productsRouter.post("/", async (req, res) => {

    const body = req.body;
    try {
        const addNewProduct = await productManager.addProduct(body);
        //const mongo = await productsModel.insertMany([body]);
        res.send(addNewProduct);
    } catch {
        res.status(502).send({error : true})
    }
});

productsRouter.put("/:pid", async (req, res) => {
    
    try {
    const { pid } = req.params;
    const product = req.body; 
    await productManager.updateProduct(pid, product);
    res.send(await productManager.getProducts());
    } catch {
        res.status(502).send({error : true})
    }
})

productsRouter.delete("/:pid", async (req, res) => {
    
    try {
    const { pid } = req.params;
    await productManager.deleteProduct(pid);
    res.send({delete: true});
    } catch {
        res.status(502).send({error : true})
    }
})

export default productsRouter


