import express from "express";
import handlebars from "express-handlebars";
//import __dirname from "./config/dirname.js";
import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import { dirname } from "path";
import { fileURLToPath } from "url";
//import productsRouter from "./routes/products.js";
//import cartsRouter from "./routes/carts.js";
import productsViewsRouter from "./routes/products.views.js";
//import ProductManager from "./ProductManager.js";
//const productManager = new ProductManager("./products.json");

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

//app.use("/api/products", productsRouter);
//app.use("/api/carts", cartsRouter);
app.use("/products", productsViewsRouter);
/*
app.get("/", (req, res) => {
    const {
        nombre
    } = req.query
    res.render("index", {
        nombre: nombre
    })
});
*/
app.get("/", (req, res) => {
    res.render("index");
});

//const appServer = app.listen(8081, () => {
//    console.log("escuchando")
//});
//const socketServer = new Server(appServer);

const httpServer = HTTPServer(app);

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    
    console.log("cliente conectado");

    socket.emit("nuevoProducto", "");
    socket.on()

});

httpServer.listen(8081, () => {
    console.log("escuchando..")
});
