import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import ChatDAO from "../dao/mongoDB/chat.mongo.dao.js";
import * as ProductsServices from "../services/products.services.js"

const ChatDao = new ChatDAO();

const httpServer = HTTPServer();
const socketServer = new Server(httpServer);


const msgs = [
    { name: "eduardo", text: "primer mensaje" },
    { name: "Juan", text: "segundo mensaje" }
];

socketServer.on("connection", (socket) => {
    
    console.log(`cliente conectado: ${socket.id}`);

    socket.on("newProd", async (data) => {
        
        await ProductsServices.PostProduct({data});
        socket.emit("products", await ProductsServices.GetProducts());
    });

    socket.emit("historial", ChatDao.getMessages());
   
    socket.on("sendMessage", (data) => {
        
        ChatDao.addMessage(socket.id, data);
        console.log(data);
        msgs.push({name: socket.id, text: data});
        socket.broadcast.emit("getMessage", {name: socket.id, text: data});
    });
    /*
    socket.on("sendMessage2", (data2) => {
        console.log('NUEVO MENSAJE: ', data2)
    });
    */
});
