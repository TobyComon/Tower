import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class TicketsService {
    async removeTicket(eventId, userId) {
        const target = await dbContext.Tickets.findById(eventId)
        if(!target){
            throw new BadRequest('Ticket not found')
        }
        const towerEvent = await dbContext.TowerEvents.findById(target.eventId)
        towerEvent.capacity ++
        await target.remove()
        await towerEvent.save()
    }
    async getTicketsByAccountId(accountId) {
        return await dbContext.Tickets.find({accountId}).populate('event', ' name description')
    }
    async getTicketsByTowerEventId(towerEventId) {
        return await dbContext.Tickets.find({eventId: towerEventId}).populate('account', 'name picture')
    }

    async createTicket(newTicket, userId){
        // REVIEW This was to prevent multiple tickets per user for an event. This should be handled on the front end instead.

        // const exists = dbContext.Tickets.findOne({accountId: newTicket.accountId, towerEventId: newTicket.towerEventId}).populate('account', 'name picture')
        // if(exists == newTicket){
        //     throw new Forbidden
        // }
        const ticket = await dbContext.Tickets.create(newTicket)
        await ticket.populate('account')
        const towerEvent = await dbContext.TowerEvents.findById(ticket.eventId)
        towerEvent.capacity --
        //const capacity = await dbContext.TowerEvents.findById()
        await towerEvent.save()
        return ticket

    }
}

export const ticketsService = new TicketsService()