import { Vector } from "./vector.js"

export class Camera {
    constructor(data = {}) {
        this.baseZoom = data.baseZoom || 200
        this.minScale = data.minScale || 10
        this.maxScale = data.maxScale || 20
        this.bodies = data.bodies || []
    }
    
    getExtents() {
        const xMax = Math.max(...Array(...this.bodies).map(body => body.position.x + body.size))
        const xMin = Math.min(...Array(...this.bodies).map(body => body.position.x - body.size))
        const yMax = Math.max(...Array(...this.bodies).map(body => body.position.y + body.size))
        const yMin = Math.min(...Array(...this.bodies).map(body => body.position.y - body.size))

        this.extents = {xMax, xMin, yMax, yMin}
    }

    findScale() {
        this.getExtents()
        const {xMax, xMin, yMax, yMin} = this.extents
        const realScale = this.baseZoom / Math.max(xMax - xMin, yMax - yMin)
        this.scale = Math.min(Math.max(realScale, this.minScale), this.maxScale)
    }

    findCenter() {
        this.getExtents()
        this.center = new Vector({
            x: (this.extents.xMax + this.extents.xMin) / 2,
            y: (this.extents.yMax + this.extents.yMin) / 2
        })
    }
}