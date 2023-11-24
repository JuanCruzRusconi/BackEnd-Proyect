import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    purchase_datetime: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
});

const ticketModel = mongoose.model("tickets", ticketSchema);

export default ticketModel;