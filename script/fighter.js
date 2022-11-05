import { HitboxCircle } from './graphics.js';
import { NewtonEntity } from './newton.js';
import { Vector } from './vector.js';

export class Projectile extends NewtonEntity {
    constructor(parent, system) {
        super()
        this.system = system
        this.parent = parent
        this.velocity = Vector.fromAngle(parent.rotation).mult(-0.5)
        this.position = parent.position.add(this.velocity)
        this.mass = 10
        this.size = 0.2
        this.color = '#38f2f5'
        this.damage = 10
        this.hitbox = HitboxCircle
        // todo: fix bounciness hack
        this.bounciness = -1

        setTimeout(() => {
            system.bodies.delete(this)
        }, 500)
    }

    onCollide(other) {
        if(this.parent === other) return
        this.system.bodies.delete(this)
        other.hp -= 10
        if(other.hp <= 0)
            this.system.bodies.delete(other)
    }
}

