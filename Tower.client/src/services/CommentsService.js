import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
    async getComments(eventId) {
        const res = await api.get('api/events/' + eventId + '/comments')
        logger.log('comments error', res.data)
        AppState.comments = res.data
        console.log(AppState.comments)
    }
    async createComment(eventId){
        const res = await api.post('api/comments/' , eventId)
        logger.log('createCommentsError', res.data)
        AppState.comments.unshift(res.data)
    }
    async removeComment(commentId){
        await api.delete(`api/comments/${commentId}`)
    }
}

export const commentsService = new CommentsService()