import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class CommentsService {
    async getCommentsByTowerEventId(towerEventId) {
        const comments = await dbContext.Comments.find({eventId: towerEventId}).populate('creator', 'name picture')
        return comments
    }
    async createComment(newComment) {
        // REVIEW do I need "name picture" ? 
        // const comment = await dbContext.Comments.create(body)
        // return comment
        const comment = await dbContext.Comments.create(newComment)
        await comment.populate('creator')
        
        return comment
        
    }
    async removeComment(commentId, userId) {
        const target = await dbContext.Comments.findById(commentId)
        if (!target) {
            throw new BadRequest('Could not find that comment')
        }
        if(target.creatorId.toString() !== userId.toString()) {
            throw new BadRequest('You cannot delete comments that you did not create')
        }
        await target.remove()
    }

}

export const commentsService = new CommentsService()