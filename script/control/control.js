import { Vector } from "../vector.js"

export class Control {
    constructor() {
        this.currentControls = {}
    }

    attach(parent) {
        this.parent = parent
    }

    setForces() {
        const heading = Vector.fromAngle(this.parent.rotation)
        this.parent.force = heading.mult(this.currentControls.thrust * this.parent.thrust)
        this.parent.rotationSpeed = this.currentControls.rotation * this.parent.rotationAccel

        if(this.currentControls.action && this.parent.action) {
            this.parent.action.doAction()
        }
    }

}