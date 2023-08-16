import { Router } from "express";
//import ProductManager from "../dao/fileSystem/ProductManager.js";
import ProductManager from "../dao/mongoDB/ProductManager.js";
const productManager = new ProductManager("./products.json");

const productsViewsRouter = Router();

productsViewsRouter.get("/", async (req, res) => {
   
    try {  
    const isAdmin = req.query.admin; 
    const productos = await productManager.getProducts() 
    res.render("home", {products: productos, isAdmin: isAdmin})
    } catch {
        res.status(502).send({error : true})
    }
})

productsViewsRouter.get("/realtimeproducts", async (req, res) => {
   
    try {  
    const productos = await productManager.getProducts(); 
    res.render("realTimeProducts", {products: productos});
    //socket.emit("listaProductos", productos);
    } catch {
        res.status(502).send({error : true})
    }
})
/*
productsViewsRouter.get("/:pid", async (req, res) => {
    
    try {
    const { pid } = req.params
    //const productId = products.find((product) => product.id == pid)
    const products = await productManager.getProducts()
    res.send(products.find((product) => product.id == pid));
    //res.send(productId);
    } catch {
        res.status(502).send({error : true})
    }
})

productsViewsRouter.post("/", async (req, res) => {

    const body = req.body;
    try {
        const addNewProduct = await productManager.addProduct(body);
        res.send(addNewProduct);
    } catch {
        res.status(502).send({error : true})
    }
});

productsViewsRouter.put("/:pid", async (req, res) => {
    
    try {
    const { pid } = req.params;
    const product = req.body; 
    await productManager.updateProduct(+pid, product);
    res.send(await productManager.getProducts());
    } catch {
        res.status(502).send({error : true})
    }
})

productsViewsRouter.delete("/:pid", async (req, res) => {
    
    try {
    const { pid } = req.params;
    await productManager.deleteProduct(+pid);
    res.send({delete: true});
    } catch {
        res.status(502).send({error : true})
    }
})
*/
export default productsViewsRouter


