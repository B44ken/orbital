import { Vector } from "../vector.js"

export class Control {
    constructor(parent) {
        this.parent = parent
        this.currentControls = {}
        this.init(parent)
    }

    setForces(ship) {
        const heading = Vector.fromAngle(this.parent.rotation)
        ship.force = heading.mult(this.currentControls.thrust * this.parent.thrust)
        ship.rotationSpeed = this.currentControls.rotation * this.parent.rotationAccel
    }

}