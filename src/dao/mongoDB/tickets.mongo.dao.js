import ticketModel from "../../schemas/tickets.schema.js"

export default class TicketsMONGO {

    constructor () {}

    createTicket = async (ticket, next) => {

        try {
            const newTicket = await ticketModel.create(ticket);
            return newTicket;
        } catch (error) {
            error.from = "TicketsMongo";
            return next(error);
        }
    };

    getTickets = async (next) => {
        
        try {
            const tickets = await ticketModel.find();
            return tickets;
        } catch (error) {
            error.from = "TicketsMongo";
            return next(error);
        }
    };

    getTicketById = async (pid, next) => {

        try {
            const ticket = await ticketModel.findOne({_id: pid});
            return ticket;
        } catch (error) {
            error.from = "TicketsMongo";
            return next(error);
        }
    };

    updateUserTicket = async (pid, ticket, next) => {

        try {
            const ticketUpdated = await ticketModel.updateOne({ _id: pid }, { $set: ticket });
            return ticketUpdated;
        } catch (error) {
            error.from = "TicketsMongo";
            return next(error);
        }
    };

    deleteTicket = async (id, next) => {

        try {
            const deleteTicket = await ticketModel.deleteOne({_id: id});
            return deleteTicket;
        } catch (error) {
            error.from = "TicketsMongo";
            return next(error);
        }
    };
    
}