import { Canvas } from '../graphics.js'
import { findOrbitVelocity, NewtonBody, NewtonEntity, NewtonSystem } from '../newton.js'
import { Vector } from '../vector.js'

const canvas = new Canvas(document.querySelector('canvas'), { scale: 5 })

const system = new NewtonSystem(canvas, { tickrate: 60 })

const planet = new NewtonEntity({
    mass: 1e8,
    size: 10,
})

const ship = new NewtonEntity({
    position: new Vector({ x: 30, y: 0}),
    sprite: '../asset/ship.png',
    spriteSize: 5,
})

ship.velocity.y = findOrbitVelocity(ship, planet)

export const shipScenario = () => {
    system.bodies.push(planet, ship)
}