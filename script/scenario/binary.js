import { Canvas } from '../graphics.js'
import { NewtonEntity, NewtonSystem } from '../newton.js'
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
    
    planetA.velocity.y = NewtonSystem.findOrbitVelocity(planetA, planetB, system.G) * -.50
    planetB.velocity.y = NewtonSystem.findOrbitVelocity(planetB, planetA, system.G) * .50
    
    system.bodies.add(planetA)
    system.bodies.add(planetB)
}
