export class Comment {
    constructor(data){
        this.id = data.id
        this.name = data.creator.name
        this.body = data.body
    }
}