import { NewtonEntity } from "./newton.js";
import { Vector } from "./vector.js";

export class ShipEntity extends NewtonEntity {
    constructor(data = {}) {
        super(data)
        this.rotationSpeed = data.rotationSpeed || 0
        this.maxThrust = data.maxThrust || 4
        this.controller = new data.controller(this, data)
        this.force = data.force || new Vector
    }
}

export class KeyboardControl {
    constructor(parent, data = {}) {
        this.parent = parent
        this.thrust = data.thrust || 1
        this.rotation = 0
        this.init(parent)
    }
    init(ship) {
        document.addEventListener('keydown', event => {
            const heading = ship.velocity.normal().mult(this.thrust * ship.maxThrust)
            if(event.key == 'w')
                ship.force = heading
        })
        document.addEventListener('keyup', event => {
            if(event.key == 'w')
                ship.force = new Vector({x: 0, y: -1})
        })
    }
}

export class AIControl {}