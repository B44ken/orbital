import { Vector } from './vector.js'
import { Canvas, HitboxCircle } from './graphics.js'
import { findOrbitVelocity, NewtonEntity, NewtonSystem } from './newton.js'
import { KeyboardControl, ShipEntity } from './ship.js'

const canvas = new Canvas(document.querySelector('canvas'), {
    scale: 3,
})
const system = new NewtonSystem(canvas, {
    tickrate: 60,
})

const planet = new NewtonEntity({
    mass: 10000000000,
    position: new Vector,
    size: 30,
    color: '#fff',
})

const moon = new ShipEntity({
    mass: 1000,
    position: new Vector({ x: 100, y: 20 }),
    velocity: new Vector({ x: 0, y: 0.1 }),
    size: 5,
    color: '#f00',
    controller: KeyboardControl,
    hitbox: HitboxCircle,
})
window.moon = moon

// moon.velocity.y = findOrbitVelocity(planet, moon, moon.position.dist(planet.position))

system.bodies.push(planet, moon)