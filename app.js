import express from "express"
import ProductManager from "./Desafios/desafio2.js";

const app = express();

const productManager = new ProductManager("./products.json");

app.get("/products", async (req, res) => {

    const products = await productManager.getProducts()
    res.send(products);
    //res
})

app.get("/product/:id", async (req, res) => {

    const { id } = req.params
    //const productId = products.find((product) => product.id == id)
    const products = await productManager.getProducts()
    res.send(products.find((product) => product.id == id));
    //res
})

app.listen(8080, () => {
    console.log("escuchando")

})
//   node Desafios/desafio3.jss