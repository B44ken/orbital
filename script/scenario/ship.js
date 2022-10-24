import { Canvas, HitboxCircle } from '../graphics.js'
import { NewtonEntity, NewtonSystem } from '../newton.js'
import { Ship } from '../ship.js'
import { KeyboardControl } from "../control/keyboard.js"
import { Vector } from '../vector.js'

export const shipScenario = () => {
    const canvas = new Canvas(document.querySelector('canvas'))

    const system = new NewtonSystem(canvas, { tickrate: 60 })

    const planet = new NewtonEntity({
        mass: 5e5,
        size: 1.5
    })

    const ship = new Ship({
        position: new Vector({ y: -10 }),
        spriteSize: 1,
        sprite: 'asset/ship.png',
        controller: KeyboardControl,
    })

    ship.velocity.x = NewtonSystem.findOrbitVelocity(ship, planet, system.G)

    system.bodies.add(planet, ship)
}
