import { Canvas, HitboxCircle } from '../graphics.js'
import { NewtonEntity, NewtonSystem } from '../newton.js'
import { Ship } from '../ship.js'
import { KeyboardControl } from "../control/keyboard.js"
import { Vector } from '../vector.js'
import { Shooter } from '../fighter.js'

export const shipScenario = () => {
    const canvas = new Canvas(document.querySelector('canvas'))

    const system = new NewtonSystem(canvas, { tickrate: 60 })

    const planet = new NewtonEntity({
        mass: 5e5,
        size: 1.5,
        hitbox: HitboxCircle,
    })

    const ship = new Ship({
        position: new Vector({ y: -10 }),
        spriteSize: 1.2,
        size: 0.6,
        sprite: 'asset/ship.png',
        controller: new KeyboardControl,
        hitbox: HitboxCircle,
        action: new Shooter
    })

    ship.velocity.x = NewtonSystem.findOrbitVelocity(ship, planet, system.G)

    system.addBodies(planet, ship)
}
