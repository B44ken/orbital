import { HitboxCircle, HitboxNone, NewtonEntity } from './graphics.js'
import { Vector } from './vector.js'
import { Canvas } from './graphics.js'
import { findOrbitVelocity, NewtonSystem } from './newton.js'

const planet = new NewtonEntity({
    mass: 100000000,
    color: '#0f0',
    size: 10,
    hitbox: HitboxCircle
})
const ship = new NewtonEntity({
    mass: 1000,
    position: new Vector({ x: 30, y: 0}),
    sprite: 'asset/ship.jpg',
})
ship.velocity.y = findOrbitVelocity(planet, ship, 30)

window.ship = ship

const canvas = new Canvas(document.querySelector('canvas'), {
    scale: 10,
})
const system = new NewtonSystem(canvas, {
    tickrate: 1000,
    bodies: [ planet, ship],
})

document.addEventListener('keydown', (e) => {
    if(e.key == 'q')
        system.paused = !system.paused
})

setInterval(() => {
    const hit = planet.collide(ship)
}, 200)