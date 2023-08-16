import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({

    user: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
})

const messagesModel = mongoose.model("messages", messagesSchema);

export default messagesModel;