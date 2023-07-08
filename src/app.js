import express from "express"
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({extended: true}))

const productManager = new ProductManager("./products.json");

app.get("/products", async (req, res) => {

    const { limit } = req.query;

    const products = await productManager.getProducts()
    res.send(limit ? 
        products.slice(0, limit) 
        : products);
})

app.get("/product/:pid", async (req, res) => {

    const { pid } = req.params
    //const productId = products.find((product) => product.id == pid)
    const products = await productManager.getProducts()
    res.send(products.find((product) => product.id == pid));
    //res.send(productId);
})

app.get("/product", async (req, res) => {

    const { price } = req.query;
    //const productId = products.find((product) => product.id == pid)
    const products = await productManager.getProducts()
    res.send(price ? products.filter((product) => product.price == price) : products);
    //res.send(productId);
})

app.get("/product", async (req, res) => {

    const { limit } = req.query;
    //const productId = products.find((product) => product.id == pid)
    const products = await productManager.getProducts()
    res.send(limit ? 
        products.slice(0, limit) 
        : products);
    //res.send(productId);
})

app.listen(8080, () => {
    console.log("escuchando")
})
