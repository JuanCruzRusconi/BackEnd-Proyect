import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo"
import sessionFilesStore from "session-file-store";

import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import { dirname } from "path";
import { fileURLToPath } from "url";

import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import productsViewsRouter from "./routes/products.views.js";
import userViewsRouter from "./routes/user.views.js";

import ProductManager from "./dao/mongoDB/ProductManager.js";
import MessagesManager from "./dao/mongoDB/MessagesManager.js";


const app = express();

const prodManager = new ProductManager();
const msgManager = new MessagesManager();

const mongooseConect = await mongoose.connect("mongodb+srv://juancruzrusconi:ecommerce@cluster0.eqrmymr.mongodb.net/ecommerce");

const __dirname = dirname(fileURLToPath(import.meta.url));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());

app.use(cookieParser());
//const fileStore = sessionFilesStore(session);
app.use(session({
    secret: "12345",
    resave: true,
    saveUninitialized: true,
    // FS store: new fileStore({path: "./sessions"});
    store: new MongoStore({mongoUrl: "mongodb+srv://juancruzrusconi:ecommerce@cluster0.eqrmymr.mongodb.net/ecommerce"}),
    ttl: 30,
})
);

app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/products", productsViewsRouter);
app.use("/user", userViewsRouter);

app.get("/", (req, res) => {
    const { nombre } = req.query;
    res.render("index", { nombre: nombre });
});
app.get("/api", (req, res) => {
    //console.log(req.cookies);
    res.send(req.cookies);
});
app.get("/cookies", (req, res) => {
    res.cookie("hola cookie", "datos de cookie",  {maxAge: 20000});
    res.send("ver cookies");
});
app.get("/session", (req, res) => {
    console.log(req.session);
    const { name } = req.query;
    if(!name) return res.send("nombre inexistente");
    req.session.name = name;
    res.send(req.session);

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

socketServer.on("connection", (socket) => {
    
    console.log(`cliente conectado: ${socket.id}`);

    socket.on("newProd", async (data) => {
        
        await prodManager.addProduct({data});
        socket.emit("products", await prodManager.getProducts());
    });

    socket.emit("historial", msgManager.getMessages());
   
    socket.on("sendMessage", (data) => {
        
        msgManager.addMessage(socket.id, data);
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
