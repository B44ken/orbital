import { Canvas, HitboxCircle } from '../graphics.js'
import { findOrbitVelocity, NewtonEntity, NewtonSystem } from '../newton.js'
import { KeyboardControl, ShipEntity } from '../ship.js'
import { Vector } from '../vector.js'

const canvas = new Canvas(document.querySelector('canvas'))

const system = new NewtonSystem(canvas, { tickrate: 60 })

const planet = new NewtonEntity({
    mass: 5e5
})

const ship = new ShipEntity({
    position: new Vector({ x: 10 }),
    sprite: 'asset/ship.png',
    controller: KeyboardControl,
    hitbox: HitboxCircle,
})

ship.velocity.y = findOrbitVelocity(ship, planet)

export const shipScenario = () => {
    system.bodies.push(planet, ship)
}