import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController{
    constructor() {
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
        .delete('', this.removeComment)

    }
    removeComment(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async createComment(req, res, next) {
        // REVIEW I do not understand what is needed in order to pass the eventId
        try {
            req.body.creatorId = req.userInfo.id
            // req.body.eventId = req.params.id
            const comment = await commentsService.createComment(req.body)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }}
 