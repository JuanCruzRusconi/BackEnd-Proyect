import args from "../config/args.js";
import crypto from "crypto";

export default class TicketsDTOReturn {

    constructor (ticket) {

        if(args.mode === "dev") { 
            this._id = crypto.randomBytes(12).toString("hex")
        } else this._id = ticket._id;
        this.title = ticket.title,
        this.code = ticket.code,
        this.user = ticket.user,
        this.purchase_datetime = ticket.purchase_datetime,
        this.amount = ticket.amount
    }
}