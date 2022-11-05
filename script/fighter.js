import { HitboxCircle } from './graphics.js';
import { NewtonEntity } from './newton.js';
import { Vector } from './vector.js';

export class Shooter {
    constructor() {
        this.firePeriod = 500
        this.lastShot = 0
    }

    attach(ship) {
        this.ship = ship
    }

    doAction() {
        const sinceLastShot = Date.now() - this.lastShot
        if(sinceLastShot > this.firePeriod) {
            this.lastShot = Date.now()
            const bullet = new Projectile
            bullet.attachParent(this.ship)
        }
    }
}

export class Projectile extends NewtonEntity {
    constructor() {
        super()
        this.system = null
        this.mass = 0.1
        this.size = 0.2
        this.color = '#38f2f5'
        this.damage = 30
        this.hitbox = HitboxCircle
        // todo: replace bounciness hack
        this.bounciness = -1

        setTimeout(() => {  
            this.system.bodies.delete(this)
        }, 1000)
    }

    attachParent(parent) {
        this.parent = parent
        this.system = parent.system
        this.velocity = Vector.fromAngle(this.parent.rotation).mult(-this.parent.size * 1.4)
        // shouldn't have to move the projectile outside the parent's position
        this.position = parent.position.add(this.velocity) 
        console.log(this.system)
        this.system.addBodies(this)

    }

    onCollide(other) {
        if(this.parent === other) return
        this.system.bodies.delete(this)
        other.hp -= this.damage
        if(other.hp <= 0)
            this.system.bodies.delete(other)
    }
}

