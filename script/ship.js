import { NewtonEntity } from "./newton.js";

export class Ship extends NewtonEntity {
    constructor(data = {}) {
        super(data)
        this.rotationAccel = data.rotationAccel || 2
        this.rotationSpeed = data.rotationSpeed || 0
        this.rotation = data.rotation || 0
        this.thrust = data.thrust || .1
        this.controller = data.controller ? new data.controller(this, data) : null
    }
}