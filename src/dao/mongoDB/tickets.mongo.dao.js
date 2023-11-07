import ticketModel from "../../schemas/tickets.schema.js"

export default class TicketsDAO {

    constructor () {}

    getTickets = async () => {
        
        try {
            const tickets = await ticketModel.find();
            return tickets;
        } catch (e) {
            console.log(e);
        }
    };

    getTicketById = async (id) => {

        try {
            const ticket = await ticketModel.findById(id);
            return ticket;
        } catch (e) {
            console.log(e);
        }
    };

    getTicketByPurchaser = async (purchaser) => {

    };

    getTicketByCode = async (code) => {

    };

    createTicket = async (ticket) => {

        try {
            const newTicket = await ticketModel.create([ticket]);
            return newTicket;
        } catch (e) {
            return [];
        }
    };

}