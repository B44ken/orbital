const G = -0.00000001;
import { Vector } from './vector.js';

export class NewtonBody {
    constructor(data) {
        this.mass = data.mass
        this.position = new Vector(data.position)
        this.velocity = new Vector(data.velocity)
    }

    move(velocity = this.velocity) {
        this.position.add(velocity)
    }

    gravity(body) {
        const force = Vector.zero().add(this.position)
        const distance = Math.max(this.position.dist(body.position), 0.01)
        const magnitude = (G * this.mass * body.mass) / (distance ** 2)
        const direction = force.sub(body.position).normal()
        return direction.mult(magnitude)
    }
}