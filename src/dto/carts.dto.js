import args from "../config/args.js";
import crypto from "crypto";

export default class CartsDTOReturn {

    constructor (cart) {

        if(args.mode === "dev") { 
            this._id = crypto.randomBytes(12).toString("hex")
        } else this._id = cart._id;
        this.user = cart.user,
        this.products = cart.products
    }
}