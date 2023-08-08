import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js"
import productsViewsRouter from "./routes/products.views.js";

//import ProductManager from "./ProductManager.js";
//const productManager = new ProductManager("./products.json");

const app = express();

app.use(express.static("public"));
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
 
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/products", productsViewsRouter);

app.get("/", (req, res) => {
    const {nombre} = req.query
    res.render("index", {nombre : nombre})
})

app.listen(8081, () => {
    console.log("escuchando")
})
