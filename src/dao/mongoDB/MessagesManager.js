import messagesModel from "../../schemas/messages.schema.js";
import mongoose from "mongoose";

export default class MessagesManager {

    constructor () {}

    getMessages = async () => {

        try {
            const messages = await messagesModel.find();
            return messages;

        } catch (e) {
            console.log(e);
        }
    }

    addMessage = async (message) => {

        try {
            const newMessage = await messagesModel.insertOne(message);
            newMessage.toObject();
            newMessage.save();
            return newMessage;

        } catch (e) {
            console.log(e);
        }
    }
}