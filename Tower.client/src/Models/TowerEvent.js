import { transformWithEsbuild } from "vite"

export class TowerEvent {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.img = data.coverImg
        this.creatorId = data.creatorId
    }
}