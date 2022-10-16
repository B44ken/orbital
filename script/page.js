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
    mass: 5e8,
    position: new Vector,
    size: 50,
    color: '#fff',
})
window.planet = planet

const moon = new ShipEntity({
    mass: 1000,
    position: new Vector({ x: -40, y: 50 }),
    velocity: new Vector({ x: 1, y: 0 }),
    size: 5,
    color: '#f00',
    controller: KeyboardControl,
    hitbox: HitboxCircle,
})
window.moon = moon

system.bodies.push(planet, moon)