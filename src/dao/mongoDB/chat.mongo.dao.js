import messagesModel from "../../schemas/messages.schema.js";

export default class ChatMONGO {

    constructor () {}

    createMessage = async (user, message) => {

        try {
            const addMessg = await messagesModel.create({user, message});
            return addMessg;
        } catch (e) {
            console.log(e);
        }
    };
    
    getMessages = async () => {

        try {
            const getMessgs = await messagesModel.find();
            return getMessgs;
        } catch (e) {
            console.log(e);
        }
    };

};