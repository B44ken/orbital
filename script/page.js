import { NewtonEntity } from './graphics.js'
import { Vector } from './vector.js'
import { Canvas } from './graphics.js'
import { NewtonSystem } from './newton.js'

const canvas = new Canvas(document.querySelector('canvas'))
const system = new NewtonSystem(canvas, {
    bodies: [
        new NewtonEntity({
            mass: 1e9,
            position: Vector.zero(),
            velocity: Vector.zero(),
            color: '#0f0',
            size: 3
        }), new NewtonEntity({
            mass: 1e5,
            position: new Vector({ x: 0, y: 10 }),
            velocity: new Vector({ x: 8, y: 0 }),
            size: 0.3,
            rotation: 10,
        })
    ]
})