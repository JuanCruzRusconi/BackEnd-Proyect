import args from "../config/args.js";
import env from "../config/env.js";
import { connect } from "mongoose";

let dao = {};

switch(args.mode) {

    case "dev":
        console.log("Connected to Fs");
        const { default: CartsFS} = await import("./fileSystem/carts.fs.dao.js");
        const { default: ProductsFS} = await import("./fileSystem/products.fs.dao.js");
        const { default: UsersFS} = await import("./fileSystem/users.fs.dao.js");
        const { default: TicketsFS} = await import("./fileSystem/tickets.fs.dao.js");
        dao = {
            Cart: CartsFS,
            Product: ProductsFS,
            User: UsersFS,
            Ticket: TicketsFS,
        };
        break;

    default: // "prod" || "test"
        connect(env.MONGO_URI).then(() => console.log("Connected to MongoDB"));
        const { default: CartsMONGO } = await import("./mongoDB/carts.mongo.dao.js");
        const { default: ProductsMONGO } = await import("./mongoDB/products.mongo.dao.js");
        const { default: UsersMONGO } = await import("./mongoDB/users.mongo.dao.js");
        const { default: TicketsMONGO } = await import("./mongoDB/tickets.mongo.dao.js");
        dao = {
            Cart: CartsMONGO,
            Product: ProductsMONGO,
            User: UsersMONGO,
            Ticket: TicketsMONGO,
        };
        break; 
};

export default dao;