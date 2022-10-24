import { NewtonEntity } from './newton.js';
import { Vector } from './vector.js';

export class Projectile extends NewtonEntity {
    constructor(parent, system) {
        super()
        this.velocity = Vector.fromAngle(parent.rotation).mult(-0.5)
        this.position = parent.position.add(this.velocity)
        this.mass = 10
        this.size = 0.2
        this.color = '#38f2f5'

        setTimeout(() => {
            system.bodies.delete(this)
        }, 500)
    }
}

