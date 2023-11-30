import * as ChatServices from "../services/chat.services.js";

export const GETJoin = (req, res) => {
    
    res.render("join");
};

export const GETChat = (req, res) => {
    
    res.render("chat");
};