import { Canvas, HitboxCircle } from '../graphics.js'
import { findOrbitVelocity, NewtonEntity, NewtonSystem } from '../newton.js'
import { Vector } from '../vector.js'


export const binaryScenario = () => {
    const canvas = new Canvas(document.querySelector('canvas'), { scale: 5 })
    
    const system = new NewtonSystem(canvas, { tickrate: 60 })
    
    const planetA = new NewtonEntity({
        mass: 1e8,
        position: new Vector({ x: -25, y: 0}),
        size: 10,
        color: '#f00',
    })
    
    const planetB = new NewtonEntity({
        mass: 1e8,
        position: new Vector({ x: 25, y: 0}),
        size: 10,
        color: '#00f',
    })
    
    planetA.velocity.y = findOrbitVelocity(planetA, planetB) * -.50
    planetB.velocity.y = findOrbitVelocity(planetB, planetA) * .50
    
    system.bodies.push(planetA, planetB)
}