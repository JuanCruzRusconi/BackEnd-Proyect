import args from "../config/args.js";
import crypto from "crypto";

export default class ProductsDTOReturn {

    constructor (product) {

        if(args.mode === "dev") { 
            this._id = crypto.randomBytes(12).toString("hex")
        } else this._id = product._id;
        this.title = product.title,
        this.description = product.description,
        this.price = product.price,
        this.thumbnail = product.thumbnail,
        this.code = product.code,
        this.stock = product.stock,
        this.category = product.category
    }
}