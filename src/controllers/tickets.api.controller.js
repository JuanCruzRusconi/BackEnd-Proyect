import TicketsServices from "../services/tickets.services.js";
import UsersServices from "../services/users.services.js";
import CustomError from "../utils/customError.js";
import ErrorsDictionary from "../utils/errorsDictionary.js";

const UserService = new UsersServices();

export default class TicketsApiControllers {

    constructor () {
        this.service = new TicketsServices();
    };

    POSTTicket = async (req, res, next) => {

        try {
            const body = req.body;
            if(!body.body) return CustomError.createError(ErrorsDictionary.USER_INPUT_ERROR);
            const ticket = await this.service.CreateTicket(body, next);
            res.status(201).send({error: false, msg: "Producto de prueba creado correctamente."});
        } catch (error) {
            error.from = "TicketsApiControllers";
            return next(error);
        }
    };
    
    GETTickets = async (req, res, next) => {
    
        try {
            const tickets = await this.service.GetTickets(next);
            if(!tickets) return CustomError.createError(ErrorsDictionary.NOT_FOUND);
            res.status(200).send({ status: "success", response: tickets });
        } catch (error) {
            error.from = "TicketsApiControllers";
            return next(error);
        }
    };
    
    GETTicketById = async (req, res, next) => {
    
        try {
            const { pid } = req.params;
            const ticket = await this.service.GetTicketById(pid, next);
            if(!ticket) return CustomError.createError(ErrorsDictionary.NOT_FOUND_ONE);
            res.send(ticket);
        } catch (error) {
            error.from = "TicketsApiControllers";
            return next(error);
        }
    };
    
    GETTicketsUser = async (req, res, next) => {
    
        try {
            const user = req.user.tickets;
            const tickets = await this.service.GetTicketsUser(user, next);
            if(!tickets) return CustomError.createError(ErrorsDictionary.DOCUMENT_EMPTY);
            res.send(tickets);
        } catch (error) {
            error.from = "TicketsApiControllers";
            return next(error);
        }
    };
    
    PUTTicket = async (req, res, next) => {
    
        try {
            const { pid } = req.params;
            const ticket = req.body;
            if(!ticket.body) return CustomError.createError(ErrorsDictionary.USER_INPUT_ERROR);
            const users = await this.service.UpdateUserTicket(pid, ticket, next);
            res.send(await this.service.GetTicketById(pid, next));
        } catch (error) {
            error.from = "TicketsApiControllers";
            return next(error);
        }
    };
    
    DELETETicket = async (req, res, next) => {
    
        try {
            const { pid } = req.params;
            const user = req.user._id;
            if(!await this.service.GetTicketById(pid, next)) return CustomError.createError(ErrorsDictionary.NOT_FOUND_ONE);
            const ticket = await this.service.DeleteTicket(user, pid, next);
            res.send({error: false, msg: "Ticket deleted."});
        } catch (error) {
            error.from = "TicketsApiControllers";
            return next(error);
        }
    };

    POSTPayment = async (req, res, next) => {

        try {

        } catch (error) {

        }
    }

}

