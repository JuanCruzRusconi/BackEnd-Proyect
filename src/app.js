import express from "express"
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
//import ProductManager from "./ProductManager.js";
//const productManager = new ProductManager("./products.json");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8081, () => {
    console.log("escuchando")
})
