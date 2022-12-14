import { Vector } from './vector.js'

export class NewtonBody {
    constructor(data = {}) {
        this.mass = data.mass || 100
        this.position = data.position || new Vector
        this.velocity = data.velocity || new Vector
        this.force = data.force || new Vector
        this.system = null
    }

    attach(system) {
        this.system = system
    }


    move(time, velocity = this.velocity, rotation = this.rotation) {
        velocity = velocity.add(this.force.div(this.mass))
        this.velocity = velocity
        this.position = this.position.add(velocity)

        if(this.rotationSpeed != 0 && !isNaN(this.rotationSpeed)) {
            this.rotation += this.rotationSpeed / time
        }
    }

    addForce(force) {
        this.force = this.force.add(force)
    }

    addImpulse(force) {
        this.velocity = this.velocity.add(force.div(this.mass))
    }

    gravity(body, G) {
        if(this.hasGravity == false) return new Vector

        const direction = this.position.sub(body.position).normal()
        const magnitude = (G * this.mass * body.mass) / (this.position.dist(body.position) ** 2)
        return direction.mult(magnitude)
    }
}

export class NewtonEntity extends NewtonBody {
    constructor(data = {}) {
        super(data)
        this.rotation = data.rotation || 0
        this.rotationVelocity = data.rotationVelocity || 0
        this.size = data.size || 1
        this.color = data.color || '#fff'
        this.hitbox = data.hitbox || (() => false)
        this.bounciness = data.bounciness || 0.75
        this.hasGravity =  data.hasGravity || true
        this.sprite = null
        this.hp = data.hp || Infinity
        this.class = new Set(data.class || null)
        if(data.sprite) {
            this.spriteSize = data.spriteSize || this.size
            if(typeof data.sprite === 'string') {
                this.sprite = new Image()
                this.sprite.src = data.sprite
            }
        }
    }

    // beyond broken
    bounce(other) {
        // r=d−2(d⋅n)n
        const normal = this.position.sub(other.position).normal()
        const dot = this.velocity.dot(normal)
        const reflection = this.velocity.sub(normal.mult(dot * 2))
        this.velocity = reflection.mult(this.bounciness)
    }
    collide(other) {
        return this.hitbox(this, other)
    }
}

export class NewtonSystem {
    G = 0.0000001
    paused = false
    constructor(canvas, data = {}) {
        this.bodies = new Set(data.bodies || [])
        this.tickrate = data.tickrate || 60
        this.background = data.background || '#000'
        this.canvas = canvas

        this.startAnimationFrames()
    }

    doPhysics(time) {
        if(this.paused) return
        this.canvas.reset(this.background)
        for(const body1 of this.bodies) {
            this.canvas.draw(body1)      
            body1.addImpulse(body1.force)
            for(const body2 of this.bodies) {
                if(body1 === body2)
                    continue
                body1.addImpulse(body2.gravity(body1, this.G))
                if(body1.collide(body2)) {
                    body1.bounce(body2)
                    if(body1.onCollide) body1.onCollide(body2)
                }
            }
            body1.move(time)
        }
    }

    startAnimationFrames() {
        let lastTime = 0
        const loop = (time) => {
            this.doPhysics(time - lastTime)
            lastTime = time
            requestAnimationFrame(loop)
        }
        requestAnimationFrame(loop)
    }

    addBodies(...bodies) {
        for(const body of bodies) {
            this.bodies.add(body)
            if(body.attach)
                body.attach(this)
        }
    }
    
    // G(m1m2)/r²
    static findOrbitVelocity(moon, planet, G) {
        return Math.sqrt((G * (moon.mass + planet.mass)) / (planet.position.dist(moon.position)))
    }
}