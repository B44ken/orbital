import { Canvas, HitboxCircle } from '../graphics.js'
import { NewtonEntity, NewtonSystem } from '../newton.js'
import { KeyboardControl, Ship } from '../ship.js'
import { Vector } from '../vector.js'


const canvas = new Canvas(document.querySelector('canvas'))

const system = new NewtonSystem(canvas)

const planet = new NewtonEntity({
    mass: 5e1,
    gravity: false,
})

const ship = new Ship({
    position: new Vector({ x: 10 }),
    mass: 10000,
    sprite: 'asset/ship.png',
    controller: KeyboardControl,
    hitbox: HitboxCircle,
})

ship.velocity.y = NewtonSystem.findOrbitVelocity(ship, planet, system.G)

export const shipScenario = () => {
    system.bodies.push(planet, ship)
}