import args from "../config/args.js";
import crypto from "crypto";

export default class UsersDTOReturn {

    constructor (user) {

        if(args.mode === "dev") { 
            this._id = crypto.randomBytes(12).toString("hex")
        } else this._id = user._id;
        this.name = user.name,
        this.surname = user.surname,
        this.username = user.username,
        this.email = user.email,
        this.role = user.role,
        this.cart = user.cart,
        this.tickets = user.tickets
    }
}