import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController {
    constructor(){
        super('api/tickets')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createTicket)
        .delete('/:id', this.removeTicket)
       
    }
   async removeTicket(req, res, next) {
        try {
            await ticketsService.removeTicket(req.params.id, req.userInfo.id)
            res.send()
        } catch (error) {
            next(error)
        }
    }
    async createTicket(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const ticket = await ticketsService.createTicket(req.body)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}