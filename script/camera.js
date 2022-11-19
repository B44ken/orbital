import { Vector } from "./vector.js"

export class Camera {
    constructor(data = {}) {
        this.multiplier = data.multiplier || 1.5
        this.minSize = data.minSize || 40
        this.maxSize = data.maxSize || 100
        this.bodies = data.bodies || []
    }
    
    getExtents() {
        const tracked = Array(...this.bodies).filter(body => body.class.has('cameraTrack'))
        const trackAlways = Array(...this.bodies).filter(body => body.class.has('cameraTrackAlways'))[0]

        const xMax = Math.max(...tracked.map(body => body.position.x + body.size))
        const xMin = Math.min(...tracked.map(body => body.position.x - body.size))
        const yMax = Math.max(...tracked.map(body => body.position.y + body.size))
        const yMin = Math.min(...tracked.map(body => body.position.y - body.size))

        this.tracked = tracked
        this.extents = {
            x: xMax - xMin,
            y: yMax - yMin,
            xMax, xMin, yMax, yMin
        }

        const clampedX = Math.max(Math.min(this.extents.x, this.maxSize), this.minSize)
        const clampedY = Math.max(Math.min(this.extents.y, this.maxSize), this.minSize)
        this.scale = Math.min(innerHeight, innerWidth) / Math.max(clampedX, clampedY) / this.multiplier

        this.center = new Vector({
            x: (this.extents.xMax + this.extents.xMin) / 2,
            y: (this.extents.yMax + this.extents.yMin) / 2
        })
    }

    findScale() {
        this.getExtents()
    }

    findCenter() {
        this.getExtents()
    }
}