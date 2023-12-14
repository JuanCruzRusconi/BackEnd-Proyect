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
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import cors from "cors";

import { Server as HTTPServer } from "http";
import { dirname } from "path";
import { fileURLToPath } from "url";

import indexViewsRouter from "./routers/index.router.js";
import cartsRouter from "./routers/carts.api.router.js";
import productsRouter from "./routers/products.api.router.js";
import productsViewsRouter from "./routers/products.views.router.js";
import userViewsRouter from "./routers/users.views.router.js";
import userApiRouter from "./routers/auth.api.router.js";
import chatViewsRouter from "./routers/chat.views.router.js";
import ticketsRouter from "./routers/tickets.api.router.js";
import performanceRouter from "../test/products.mocks.test.js";
import loggersRouter from "./routers/loggers.api.router.js";

import { sendEmail } from "./config/nodemailer.js";
import env from "./config/env.js";
import winston from "./utils/winston.js";
import errorHandler from "./utils/errorHandler.js";
import notFoundHandler from "./utils/notFoundHandler.js";
import config from "./config/swagger.js";



const app = express();

const mongooseConect = mongoose.connect(process.env.MONGO_URI);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

const specs = swaggerJSDoc(config);

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(winston);
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

app.use("/api/docs", serve, setup(specs));

app.use("/index", indexViewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/products", productsViewsRouter);
app.use("/users", userViewsRouter);
//app.use("/api/auth/github", authRouter);
app.use("/api/auth", userApiRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/mail", sendEmail);
app.use("/chat", chatViewsRouter);
app.use("/api/performance", performanceRouter)
app.use("/api/loggers", loggersRouter);

app.use(errorHandler);
app.use(notFoundHandler);

const httpServer = HTTPServer(app);

const PORT = process.env.PORT || 9000
const ENV = env.ENV

httpServer.listen(PORT, () => {
    console.log(`${ENV}: Server ready on port ${PORT}`)
});
