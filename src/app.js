import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
//import __dirname from "./config/dirname.js";
import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import { dirname } from "path";
import { fileURLToPath } from "url";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import productsViewsRouter from "./routes/products.views.js";
//import ProductManager from "./dao/fileSystem/ProductManager.js";
import ProductManager from "./dao/mongoDB/ProductManager.js";
import productsModel from "./schemas/products.schema.js";
import cartsModel from "./schemas/carts.schema.js";
//const productManager = new ProductManager("./products.json");

//const ProductManager = new ProductManager();

const app = express();

const mongooseConect = await mongoose.connect("mongodb+srv://juancruzrusconi:ecommerce@cluster0.eqrmymr.mongodb.net/ecommerce")

const __dirname = dirname(fileURLToPath(import.meta.url));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/products", productsViewsRouter);

app.get("/", (req, res) => {
    const { nombre } = req.query
    res.render("index", { nombre: nombre });
});

//const appServer = app.listen(8081, () => {
//    console.log("escuchando")
//});
//const socketServer = new Server(appServer);

const httpServer = HTTPServer(app);

const socketServer = new Server(httpServer);

app.get("/join", (req, res) => {
    res.render("join");
});

app.get("/chat", (req, res) => {
    res.render("chat");
});

const msgs = [
    { name: "eduardo", text: "primer mensaje" },
    { name: "Juan", text: "segundo mensaje" }
];

const msgsOwn = [
    { name: "Martin", text: "tercer mensaje" },
    { name: "Juan Cruz", text: "cuarto mensaje" }
];

socketServer.on("connection", (socket) => {
    
    console.log(`cliente conectado: ${socket.id}`);

    socket.on("newProd", async (data) => {
        
        productManager.addProduct(data);

        socket.emit("products", await productManager.getProducts());
    });

    socket.emit("historial", msgs);
    //socket.emit("historial2", msgsOwn);
    socket.on("sendMessage", (data) => {
        console.log(data);
        msgs.push({name: socket.id, text: data});
        socket.broadcast.emit("getMessage", {name: socket.id, text: data});
    });
    /*
    socket.on("sendMessage2", (data2) => {
        console.log('NUEVO MENSAJE: ', data2)
    });
    */
});

httpServer.listen(8081, () => {
    console.log("escuchando..")
});
