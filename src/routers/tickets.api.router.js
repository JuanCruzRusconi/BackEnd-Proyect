import { Router } from "express";
import TicketsApiControllers from "../controllers/tickets.api.controller.js";
import passportMW from "../utils/jwt.middleware.js";
import { verifyRole } from "../utils/mddw.js";

const ticketsApiRouter = Router();

const TicketsApiController = new TicketsApiControllers();

// ------- Rutas orientadas al usuario, acceso de usuario logueado ------- //
ticketsApiRouter.get("/myticket", passportMW("jwt"), TicketsApiController.GETTicketsUser);

ticketsApiRouter.post("/payments/:pid/payment-intents", passportMW("jwt"), TicketsApiController.POSTPayment);

// ------- Rutas orientadas al administrador, acceso unicamente admin ------- //
ticketsApiRouter.post("/", passportMW("jwt"), verifyRole("admin"), TicketsApiController.POSTTicket);

ticketsApiRouter.get("/", passportMW("jwt"), verifyRole("admin"), TicketsApiController.GETTickets);

ticketsApiRouter.get("/:pid", passportMW("jwt"), verifyRole("admin"), TicketsApiController.GETTicketById);

ticketsApiRouter.put("/:pid", passportMW("jwt"), verifyRole("admin"), TicketsApiController.PUTTicket);

ticketsApiRouter.delete("/:pid", passportMW("jwt"), verifyRole("admin"), TicketsApiController.DELETETicket);


export default ticketsApiRouter;