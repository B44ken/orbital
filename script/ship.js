import { NewtonEntity } from "./newton.js";
import { Shooter } from "./fighter.js";

export class Ship extends NewtonEntity {
    constructor(data = {}) {
        super(data)
        this.rotationAccel = data.rotationAccel || 2
        this.rotationSpeed = data.rotationSpeed || 0
        this.rotation = data.rotation || 0
        this.thrust = data.thrust || .1
        this.maxThrust = data.maxThrust || .1
        
        this.controller = data.controller || null
        if(this.controller) this.controller.attach(this)

        this.action = data.action || null
        if(this.action) this.action.attach(this)

        this.fuel = data.fuel || null
        if(this.fuel) this.fuel.attach(this)
    }
}