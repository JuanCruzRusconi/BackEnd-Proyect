import { Router } from "express";
import TicketsApiControllers from "../controllers/tickets.api.controller.js";
import passportMW from "../utils/jwt.middleware.js";

const ticketsRouter = Router();

const TicketsApiController = new TicketsApiControllers();

ticketsRouter.post("/", passportMW("jwt"), TicketsApiController.POSTTicket);

ticketsRouter.get("/", passportMW("jwt"), TicketsApiController.GETTickets);

ticketsRouter.get("/:pid", passportMW("jwt"), TicketsApiController.GETTicketById);

ticketsRouter.post("/user", passportMW("jwt"), TicketsApiController.GETTicketsUser);

ticketsRouter.put("/:pid", passportMW("jwt"), TicketsApiController.PUTTicket);

ticketsRouter.delete("/:pid", passportMW("jwt"), TicketsApiController.DELETETicket);

export default ticketsRouter;