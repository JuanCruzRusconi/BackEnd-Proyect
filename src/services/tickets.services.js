import TicketsDAO from "../dao/mongoDB/tickets.mongo.dao.js";
import * as UsersServices from "../services/users.services.js";
import bcrypt from "bcrypt";

const TicketsDao = new TicketsDAO();

export const GetTickets = async () => {

    try {
        const tickets = await TicketsDao.getTickets();
        return tickets;
    } catch (e) {
        return [];
    }
};

export const GetTicketById = async (id) => {

    try {
        const ticket = await TicketsDao.getTicketById(id);
        return ticket;
    } catch (e) {
        throw e;
    }
};

export const PostTicket = async (user) => {

    try {
        const dateTime = new Date();
        const bd = await TicketsDao.getTickets()
        const code = bd.length + 1;
        const ticket = await TicketsDao.createTicket({title: "Purchase", code: code, purchase_datetime: dateTime, amount: 1000, purchaser: user});

        const ticketId = await TicketsDao.getTicketById(ticket._id);
        console.log(ticketId)
        await UsersServices.PurchaseOrder(user, ticketId);
        const ticketAct = await TicketsDao.updateUserTicket(ticketId, user);
        return ticketAct;
    } catch (e) {
        throw e;
    }
};