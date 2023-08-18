import messagesModel from "../../schemas/messages.schema.js";
import mongoose from "mongoose";

export default class MessagesManager {

    constructor () {}

    getMessages = async () => {

        try {
            const getMessgs = await messagesModel.find();
            return getMessgs;
        } catch (e) {
            console.log(e);
        }
    };

    addMessage = async (user, message) => {

        try {
            const addMessg = await messagesModel.create({user, message});
            return addMessg;
        } catch (e) {
            console.log(e);
        }
    };
};