import { Vector } from './vector.js'

export const G = 0.00000001
export class NewtonBody {
    constructor(data) {
        this.mass = data.mass
        this.position = new Vector(data.position) || Vector.zero()
        this.velocity = new Vector(data.velocity) || Vector.zero()
    }

    move(time, velocity = this.velocity) {
        this.position = this.position.add(velocity.mult(time))
    }

    addForce(force) {
        this.velocity = this.velocity.add(force.div(this.mass))
    }

    gravity(body) {
        const direction = this.position.sub(body.position).normal()
        const magnitude = (G * this.mass * body.mass) / (this.position.dist(body.position) ** 2)
        return direction.mult(magnitude)
    }
}

export class NewtonSystem {
    constructor(canvas, data) {
        this.bodies = data.bodies || []
        this.tickrate = data.tickrate || 60
        this.background = data.background || '#000'
        this.paused = false
        this.canvas = canvas

        setInterval(() => {
            if(this.paused) return
            this.canvas.clear(this.background)
            for(const body1 of this.bodies) {
                this.canvas.draw(body1)      
                for(const body2 of this.bodies) {
                    if(body1 === body2) continue
                    body1.addForce(body2.gravity(body1))
                }
                body1.move(1 / this.tickrate)
            }
        }, 1000 / this.tickrate)
    }

    move(time) {
        this.bodies.forEach(body => {
            body.move(time)
        })
    }
}