import { NewtonEntity } from "./graphics.js";
import { Vector } from "./vector.js";

export class ShipEntity extends NewtonEntity {
    constructor(data = {}) {
        super(data)
        this.rotationSpeed = data.rotationSpeed || 0
        this.maxThrust = data.maxThrust || 0
        this.controller = new data.controller(this)
        this.force = data.force || new Vector
    }
}

export class KeyboardControl {
    constructor(parent, data = {}) {
        this.parent = parent
        this.thrust = 0
        this.rotation = 0
        document.addEventListener('keydown', event => null)
    }
}

export class AIControl {}