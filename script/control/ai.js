import { Control } from "./control.js";
import { Vector } from "../vector.js";

export class AIControl extends Control {
    constructor() {
        super()
        this.targetPosition = new Vector
        this.otherShip = null
        setInterval(() => this.interval(), 50)
    }

    interval() {
        if(!this.parent) return

        this.otherShip = Array(...this.parent.system.bodies).filter(body => body !== this.parent)[0]
        if(!this.otherShip) return

        const otherAngle = this.parent.position.sub(this.otherShip.position).angle()
        this.currentControls.rotation = (otherAngle - this.parent.rotation)
        
        this.parent.action.doAction()
        this.setForces()
    }
}