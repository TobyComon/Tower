import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class TowerEventsService {
    async getAll(query={}) {
        return await dbContext.TowerEvents.find(query).populate('creator', 'name picture')
        //NOTE do I need this here?
    }
    async getById(id) {
        const towerEvent = await dbContext.TowerEvents.findById(id).populate('creator', 'name picture')
        if (!towerEvent) {
            throw new BadRequest("invalid id")
        }
        return towerEvent
    }

    async create(body) {
        return await dbContext.TowerEvents.create(body)
    }
    async removeTowerEvent(towerEventId, userId) {
        //REVIEW this entire function
        const towerEvent = await dbContext.TowerEvents.findById(towerEventId)
        if (towerEvent.creatorId.toString() !=userId){
            throw new Forbidden("You cannot delete a Tower Event you did not create")
        }
        towerEvent.isCanceled = !towerEvent.isCanceled

        await towerEvent.save()
    }
    async editTowerEvent(editedTowerEvent, userId) {
        const towerEvent = await dbContext.TowerEvents.findById(editedTowerEvent.id)
        if(!towerEvent) {
            throw new BadRequest('Could not find event')
        }
        if(towerEvent.isCanceled){
            throw new BadRequest('Unable to edit cancelled events')
        }
        towerEvent.name = editedTowerEvent.name || towerEvent.name
        towerEvent.description = editedTowerEvent.description || towerEvent.description
        await towerEvent.save()
        return editedTowerEvent
    }
}

export const towerEventsService = new TowerEventsService()