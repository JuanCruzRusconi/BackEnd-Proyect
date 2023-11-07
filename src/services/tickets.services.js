import TicketsDAO from "../dao/mongoDB/tickets.mongo.dao.js";

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

export const PostTicket = async () => {

    try {
        const ticket = await TicketsDao.createTicket();
        return ticket;

    } catch (e) {

    }
}