import { Canvas } from '../graphics.js'
import { NewtonEntity, NewtonSystem } from '../newton.js'
import { Vector } from '../vector.js'

const VEL = 1.76

export const trinaryScenario = () => {
    const canvas = new Canvas(document.querySelector('canvas'), { scale: 5 })
    
    const system = new NewtonSystem(canvas, { tickrate: 3 })
    
    const planetA = new NewtonEntity({
        mass: 1e9,
        position: new Vector({ x: -1, y: 0}).mult(25),
        velocity: new Vector({ x: 0, y: -1}).mult(VEL),
        size: 10,
        color: '#f00',
    })
    
    const planetB = new NewtonEntity({
        mass: 1e9,
        position: new Vector({ x: Math.cos(Math.PI / 3), y: Math.sin(Math.PI / 3)}).mult(25),
        velocity: new Vector({ x: -Math.sin(Math.PI / 3), y: Math.cos(Math.PI / 3)}).mult(VEL),
        size: 10,
        color: '#0f0',
    })

    const planetC = new NewtonEntity({
        mass: 1e9,
        position: new Vector({ x: Math.cos(Math.PI / 3), y: -Math.sin(Math.PI / 3)}).mult(25),
        velocity: new Vector({ x: Math.sin(Math.PI / 3), y: Math.cos(Math.PI / 3)}).mult(VEL),
        size: 10,
        color: '#00f',
    })
    
    system.bodies.add(planetA, planetB, planetC)
}