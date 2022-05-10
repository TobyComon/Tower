import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TicketsService {
    async createTicket(ticket) {
        const res = await api.post('api/tickets', ticket)
        const found = AppState.tickets.findIndex(t => t.id == res.data.id)
        if (found != -1){
            AppState.tickets.splice(found, 1, res.data)
        } else{
            AppState.tickets.push(res.data)
        }
        const myFound = AppState.myTickets.findIndex(t => t.id == res.data.id)
        if (myFound != -1) {
            AppState.myTickets.splice(myFound, 1, res.data)

        } else {
            AppState.myTickets.push(res.data)
        }
    }
    async getTicketsByAccount() {
        const res = await api.get('account/tickets')
        AppState.myTickets = res.data
    }
}

export const ticketsService = new TicketsService()