import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class CommentsService {
    async getCommentsByTowerEventId(towerEventId) {
        const comments = await dbContext.Comments.find({eventId: towerEventId}).populate('creator', 'name picture')
        return comments
    }
    async createComment(body) {
        
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator')
        
        return comment
        
    }
    async removeComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new BadRequest('Could not find that comment')
        }
        if(comment.creatorId.toString() !== userId) {
            throw new BadRequest('You cannot delete comments that you did not create')
        }
        await comment.remove()
        return comment
    }

}

export const commentsService = new CommentsService()