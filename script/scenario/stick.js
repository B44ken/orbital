import { KeyboardControl } from '../control/keyboard.js'
import { Canvas } from '../graphics.js'
import { NewtonSystem } from '../newton.js'
import { Ship } from '../ship.js'
import { Vector } from '../vector.js'

export const joystickScenario = () => {
    const canvas = new Canvas(document.querySelector('canvas'))
    
    const system = new NewtonSystem(canvas, { tickrate: 60 })

    const shipWASD = new Ship({
        position: new Vector({ x: -10, y: 0 }),
        sprite: 'asset/ship-blue.png',
        controller: new KeyboardControl,
    })


    system.addBodies(shipWASD)
}


