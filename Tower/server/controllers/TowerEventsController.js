import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { towerEventsService } from '../services/towerEventsService.js'
import { commentsService } from '../services/CommentsService.js'
import { ticketsService } from '../services/TicketsService.js'

export class TowerEventsController extends BaseController {
    constructor(){
        super('api/events')
        this.router
        .get('', this.getAll)
        .get('/:id',this.getById)
        .get('/:id/tickets', this.getTicketsByTowerEventId)
        .get('/:id/comments', this.getCommentsByTowerEventId)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createTowerEvent)
        // .post('/:id/comments', this.createComment)
        // .delete('/:id/comments/:id', this.removeComment)
        .put('/:id', this.editTowerEvent )
        .delete('/:id', this.removeTowerEvent)

    }
    // async createComment(req, res, next) {
    //     // REVIEW I do not understand what is needed in order to pass the eventId
    //     try {
    //         req.body.creatorId = req.userInfo.id
    //         req.body.towerEventId = req.params.id
    //         const comment = await commentsService.createComment(req.body)
    //         return res.send(comment)
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    
    async getAll(req, res, next) {
        try {
            const towerEvents = await towerEventsService.getAll(req.params.query)
            return res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }
   async getById(req, res, next) {
        try {
            const towerEvent = await towerEventsService.getById(req.params.id)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async getTicketsByTowerEventId(req, res, next) {
        try {
            const tickets = await ticketsService.getTicketsByTowerEventId(req.params.id)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
   async getCommentsByTowerEventId(req, res, next) {
        try {
            const comments = await commentsService.getCommentsByTowerEventId(req.params.id)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }
   async createTowerEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.create(req.body)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async editTowerEvent(req, res, next) {
        try {
            req.body.id = req.params.id
            const towerEvent = await towerEventsService.editTowerEvent(req.body, req.userInfo.id)
            res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
  async  removeTowerEvent(req, res, next) {
        try {
            await towerEventsService.removeTowerEvent(req.params.id, req.userInfo.id)
            res.send("Deleted!")
        } catch (error) {
            next(error)
        }
    }
}