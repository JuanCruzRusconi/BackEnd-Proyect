import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo"
import sessionFilesStore from "session-file-store";
import passport from "passport";
import InitLocalStrategy from "./config/passport.js";

import { Server as HTTPServer } from "http";
import { Server } from "socket.io";
import { dirname } from "path";
import { fileURLToPath } from "url";

import cartsRouter from "./routers/carts.api.router.js";
import productsRouter from "./routers/products.api.router.js";
import productsViewsRouter from "./routers/products.views.router.js";
import userViewsRouter from "./routers/users.views.router.js";
import userApiRouter from "./routers/users.api.router.js";
import authRouter from "./routers/auth.api.router.js"

import ProductsDAO from "./dao/mongoDB/products.mongo.dao.js";
import MessagesDAO from "./dao/mongoDB/messages.mongo.js";
import { sendEmail, transport } from "./config/nodemailer.js";



const app = express();

const prodManager = new ProductsDAO();
const msgManager = new MessagesDAO();

const mongooseConect = await mongoose.connect("mongodb+srv://juancruzrusconi:ecommerce@cluster0.eqrmymr.mongodb.net/ecommerce");

const __dirname = dirname(fileURLToPath(import.meta.url));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.urlencoded({extended: true}));
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
}));

InitLocalStrategy();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/public`));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/products", productsViewsRouter);
app.use("/user", userViewsRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userApiRouter);
app.use("/mail", sendEmail);

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

const PORT = 8081;

httpServer.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
});
