import fs from "fs/promises";

export default class TicketsFS {

    constructor () {
        this.tickets = [];
    }

    #id = 0;

    createTicket = async (ticket, next) => {

        try {
            const file = await fs.readFile("./src/tickets.json", "utf-8");
            const tickets = JSON.parse(file);
            const newTicket = {
                id: tickets[tickets.length -1].id + 1,
                ...ticket,
            }
            tickets.push(newTicket);
            await fs.writeFile("./src/tickets.json", JSON.stringify(tickets));
            return ticket;
        } catch (error) {
            error.from = "TicketsFileSystem";
            return next(error);
        }
    };

    getTickets = async (next) => {
        
        try {
            const file = await fs.readFile("./src/tickets.json", "utf-8");
            this.tickets = JSON.parse(file);
            return this.tickets;
        } catch (error) {
            error.from = "TicketsFileSystem";
            return next(error);
        }
    };

    getTicketById = async (id, next) => {

        try {
            const file = await fs.readFile("./src/tickets.json", "utf-8");
            this.tickets = JSON.parse(file);
            let cartToUpdate = this.tickets.find((ticket) => ticket.id === id);
            return cartToUpdate;
        } catch (error) {
            error.from = "TicketsFileSystem";
            return next(error);
        }
    };

    

    updateProductInCartById = async (pid, newTicket, next) => {

        try {
            const file = await fs.readFile("./src/tickets.json", "utf-8");
            const tickets = JSON.parse(file);
            if (!pid) return "Ticket Not Found";
            let update = tickets.map((ticket) => {
                if (ticket.id === pid) { let ticket = newTicket }
                return update;    
            });
            await fs.writeFile("./src/tickets.json", JSON.stringify(update));
            return "Product added to cart succesfully";
        } catch (error) {
            error.from = "TicketsFileSystem";
            return next(error);
        }
    };

    deleteTicket = async (id, next) => {
        
        try {
            const file = await fs.readFile("./src/tickets.json", "utf-8");
            this.tickets = JSON.parse(file);
            let ticketFound = this.tickets.find((ticket) => ticket.id === id);
            if(!ticketFound){
                return `No se ha encontrado el ticket con id: ${id}`;
            }
            let deleteTicket = this.tickets.filter((ticket) => ticket.id !== id)
            await fs.writeFile("./src/tickets.json", JSON.stringify(deleteTicket, null, 2));
            return ticketFound;
        } catch (error) {
            error.from = "TicketsFileSystem";
            return next(error);
        }
    };
}
