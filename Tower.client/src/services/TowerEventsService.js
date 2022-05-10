import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TowerEventsService{
    async getTowerEvents() {
        const res = await api.get('api/events')
        AppState.towerEvents = res.data
    }

    async getTowerEventById(towerEventId) {
        const res = await api.get('api/events/'+ towerEventId)
        AppState.towerEvent = res.data

    }
    async getTicketsByTowerEventId(towerEventId) {
        const res = await api.get(`api/events/${towerEventId}/tickets`)
        AppState.tickets = res.data
    }
    async getTowerEventsByAccountId(accountId){
        const res = await api.get('api/account/')
    }
    async createTowerEvent(newTowerEvent) {
        const res = await api.post('api/events', newTowerEvent)
        
        logger.log(Error, 'create towerEvent error')
        AppState.towerEvents.unshift(res.data)
        return res.data
    }
    async cancelTowerEvent(towerEventId) {
        await api.delete(`api/events/${towerEventId}`)
       
    }
}

export const towerEventsService = new TowerEventsService()