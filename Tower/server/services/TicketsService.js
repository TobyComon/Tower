import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class TicketsService {
    async removeTicket(eventId, userId) {
        const ticket = await dbContext.Tickets.findById(eventId)
        if(!ticket){
            throw new BadRequest('Ticket not found')
        }
        if(ticket.accountId.toString() !== userId){
            throw new Forbidden('You cannot delete a ticket that is not yours')
        }
        const towerEvent = await dbContext.TowerEvents.findById(ticket.eventId)
        towerEvent.capacity ++
        await ticket.remove()
        await towerEvent.save()
    }
    async getTicketsByAccountId(accountId) {
        return await dbContext.Tickets.find({accountId}).populate('event', ' name coverImg')
    }
    async getTicketsByTowerEventId(towerEventId) {
        return await dbContext.Tickets.find({eventId: towerEventId}).populate('account', 'name picture')
    }

    async createTicket(ticket){
       
        const newTicket = await dbContext.Tickets.create(ticket)
        const towerEvent = await dbContext.TowerEvents.findById(ticket.eventId)
        await newTicket.populate('account')
        if(towerEvent.capacity <= 0){
            throw new BadRequest('No tickets left!')
        }
        towerEvent.capacity --
       
        await towerEvent.save()
        return newTicket

    }
}

export const ticketsService = new TicketsService()