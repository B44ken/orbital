import { HitboxCircle, HitboxNone, NewtonEntity } from './graphics.js'
import { Vector } from './vector.js'
import { Canvas } from './graphics.js'
import { NewtonSystem } from './newton.js'

const planet = new NewtonEntity({
    mass: 1e9,
    position: Vector.zero(),
    velocity: Vector.zero(),
    color: '#0f0',
    size: 3,
    hitbox: HitboxCircle
})
const ship = new NewtonEntity({
    mass: 1e4,
    position: new Vector({ x: 2, y: 0 }),
    velocity: new Vector({ x: 0, y: 50 }),
    size: 1,
    rotation: 0,
    sprite: 'asset/ship.jpg',
    hitbox: HitboxNone
})

const canvas = new Canvas(document.querySelector('canvas'), {
    scale: 20,
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
    console.log(hit)
}, 200)