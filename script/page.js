import { NewtonEntity } from './graphics.js'
import { Vector } from './vector.js'
import { Canvas } from './graphics.js'
import { NewtonSystem } from './newton.js'

const planet = new NewtonEntity({
    mass: 1e9,
    position: Vector.zero(),
    velocity: Vector.zero(),
    color: '#0f0',
    size: 3
})
const ship = new NewtonEntity({
    mass: 1e4,
    position: new Vector({ x: 5, y: 0 }),
    velocity: new Vector({ x: 0, y: 50 }),
    size: 0.7,
    rotation: 10,
    sprite: 'asset/ship.jpg'
})

const canvas = new Canvas(document.querySelector('canvas'), {
    scale: 20,
})
const system = new NewtonSystem(canvas, {
    tickrate: 1000,
    bodies: [ planet, ship],
})

document.addEventListener('keydown', (event) => {
    if (event.key == 'w') {
        ship.velocity = ship.velocity.mult(1.1)
    } else if (event.key == 's') {
        ship.velocity = ship.velocity.mult(0.9)
    }
})

let maxHeight = 0
setInterval(() => {
    maxHeight = Math.max(maxHeight, ship.position.dist())
    console.log(maxHeight)
}, 10)

window.maxHeight = maxHeight