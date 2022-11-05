import { KeyboardControl } from "../control/keyboard.js"
import { Projectile } from "../fighter.js"
import { Canvas, HitboxCircle } from "../graphics.js"
import { NewtonSystem } from "../newton.js"
import { Ship } from "../ship.js"
import { Vector } from "../vector.js"

export const shootingScenario = () => {
    const canvas = new Canvas(document.querySelector('canvas'))
    const system = new NewtonSystem(canvas)

    const ship = new Ship({
        mass: 100,
        sprite: 'asset/ship.png',
        controller: new KeyboardControl,
        hitbox: HitboxCircle,
    })

    const opponent = new Ship({
        mass: 100,
        sprite: 'asset/ship-blue.png',
        position: new Vector({ x: 0, y: -10 }),
        hitbox: HitboxCircle,
        action: new Shooter
    })
    
    system.addBodies(ship, opponent)
}
