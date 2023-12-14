import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import ChatMONGO from "../dao/mongoDB/chat.mongo.dao.js";
import ProductsServices from "../services/products.services.js";

const ChatMongo = new ChatMONGO();
const ProductService = new ProductsServices();
const httpServer = HTTPServer();
const socketServer = new Server(httpServer);


const msgs = [
    { name: "eduardo", text: "primer mensaje" },
    { name: "Juan", text: "segundo mensaje" }
];

socketServer.on("connection", (socket) => {
    
    console.log(`cliente conectado: ${socket.id}`);

    socket.on("newProd", async (data) => {
        
        await ProductService.CreateProduct({data});
        socket.emit("products", await ProductService.GetProducts());
    });

    socket.emit("historial", ChatMongo.getMessages());
   
    socket.on("sendMessage", (data) => {
        
        ChatMongo.createMessage(socket.id, data);
        console.log(data);
        msgs.push({name: socket.id, text: data});
        socket.broadcast.emit("getMessage", {name: socket.id, text: data});
    });
    
    socket.on("sendMessage2", (data2) => {
        console.log('NUEVO MENSAJE: ', data2)
    });
    
});
