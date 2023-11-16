import TicketsDAO from "../dao/mongoDB/tickets.mongo.dao.js";
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

export const GetTicketById = async () => {

    try {
        const ticket = await TicketsDao.getTicketById();
        return ticket;
    } catch (e) {
        console.log(e);
    }
};

export const PostTicket = async (cid) => {

    try {
        const ticket = await TicketsDao.createTicket({title: "Purchase", code: "0000", purchase_datetime: "today", amount: 1000, purchaser: "me"});
        return ticket;
    } catch (e) {

    }
}