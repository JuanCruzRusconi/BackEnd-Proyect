import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo"
import sessionFilesStore from "session-file-store";
import passport from "passport";
import InitLocalStrategy from "./config/passport.js";
import compression from "express-compression";

import { Server as HTTPServer } from "http";
import { dirname } from "path";
import { fileURLToPath } from "url";

import cartsRouter from "./routers/carts.api.router.js";
import productsRouter from "./routers/products.api.router.js";
import productsViewsRouter from "./routers/products.views.router.js";
import userViewsRouter from "./routers/users.views.router.js";
import userApiRouter from "./routers/users.api.router.js";
import authRouter from "./routers/auth.api.router.js";
import chatViewsRouter from "./routers/chat.views.rouer.js";

import ProductsDAO from "./dao/mongoDB/products.mongo.dao.js";
import ChatDAO from "./dao/mongoDB/chat.mongo.dao.js";
import { sendEmail, transport } from "./config/nodemailer.js";
import ErrorMiddleware from "./utils/error.middleware.js";
import env from "./config/env.js";


const app = express();

const mongooseConect = mongoose.connect(process.env.MONGO_URI);

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
app.use(compression({ brotli: {enabled: true, zlib: {} }}));

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
app.use("/chat", chatViewsRouter);

//app.use(ErrorMiddleware);

//const appServer = app.listen(8081, () => {
//    console.log("escuchando")
//});
//const socketServer = new Server(appServer);

const httpServer = HTTPServer(app);

const PORT = env.PORT
const MODE = env.MODE

httpServer.listen(PORT, () => {
    console.log(`${MODE}: Server ready on port ${PORT}`)
});
