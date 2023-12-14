import TicketsRepository from "../repositories/tickets.repositories.js";
import UsersServices from "./users.services.js";
import crypto from "crypto";

//const UserService = new UsersServices();

export default class TicketsServices {

    constructor () {
        this.repository = new TicketsRepository();
        this.user = new UsersServices();
    };

    CreateTicket = async (user, next) => {

        try {
            const dateTime = new Date();
            const ticketCode = crypto.randomBytes(12).toString("hex");
            const ticket = await this.repository.createTicket({
                    title: "Purchase",
                    code: ticketCode,
                    purchase_datetime: dateTime,
                    amount: 1000,
                    purchaser: user
                },
                next);
            const ticketId = await this.repository.getTicketById(ticket._id, next);
            console.log(ticketId)
            await this.user.UpdateUserTicket(user, ticketId, next);
            const ticketAct = await this.repository.updateUserTicket(ticketId, user, next);
            return ticketAct;
        } catch (error) {
            error.from = "TicketsServices";
            return next(error);
        }
    };

    GetTickets = async (next) => {

        try {
            const tickets = await this.repository.getTickets(next);
            return tickets;
        } catch (error) {
            error.from = "TicketsServices";
            return next(error);
        }
    };
    
    GetTicketById = async (pid, next) => {
    
        try {
            const ticket = await this.repository.getTicketById(pid, next);
            return ticket;
        } catch (error) {
            error.from = "TicketsServices";
            return next(error);
        }
    };

    GetTicketsUser = async (data, next) => {
    
        try {
            console.log(data)
            const ticket = data.map(async (ticket) => {
                let ticketId = ticket._id;
                await this.GetTicketById(ticketId, next);
                const result = await this.GetTicketById(ticketId, next);
                return result;
            });
            return await Promise.all(ticket);
        } catch (error) {
            error.from = "TicketsServices";
            return next(error);
        }
    };

    UpdateUserTicket = async (pid, ticket, next) => {

        try {
            const updateTicket = await this.repository.updateUserTicket(pid, ticket, next);
            return updateTicket;
        } catch (error) {
            error.from = "TicketsServices";
            return next(error);
        }
    };

    DeleteTicket = async (user, ticket, next) => {

        try {
            const deleteTicket = await this.repository.deleteTicket(ticket, next);
            await this.user.DeleteTicketUser(user, ticket, next);
            return deleteTicket;
        } catch (error) {
            error.from = "TicketsServices";
            return next(error);
        }
    };

}
