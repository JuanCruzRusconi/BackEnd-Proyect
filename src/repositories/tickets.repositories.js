import dao from "../dao/factory.dao.js";
import TicketsDTOReturn from "../dto/tickets.dto.js";

const { Ticket } = dao;

export default class TicketsRepository {

    constructor () {
        this.model = new Ticket();
    };

    createTicket = async (ticket, next) => {

        try {
            const response = await this.model.createTicket(ticket, next);
            return response;
        } catch (error) {
            error.from = "TicketsRepository";
            return next(error);
        }
    };

    getTickets = async (next) => {
        
        try {
            const tickets = await this.model.getTickets(next);
            const responseDto = tickets.map((ticket) => new TicketsDTOReturn(ticket));
            return responseDto;
        } catch (error) {
            error.from = "TicketsRepository";
            return next(error);
        }
    };

    getTicketById = async (pid, next) => {

        try {
            let ticket = await this.model.getTicketById(pid, next);
            const responseDto = new TicketsDTOReturn(ticket);
            return responseDto;
        } catch (error) {
            error.from = "TicketsRepository";
            return next(error);
        }
    };

    updateUserTicket = async (pid, ticket, next) => {

        try {
            const response = await this.model.updateUserTicket(pid, ticket, next);
            return response;
        } catch (error) {
            error.from = "TicketsRepository";
            return next(error);
        }
    };

    deleteTicket = async (id, next) => {

        try {
            const response = await this.model.deleteTicket(id, next);
            return response;
        } catch (error) {
            error.from = "TicketsRepository";
            return next(error);
        }
    };

}