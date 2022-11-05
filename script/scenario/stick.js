import { JoystickControl } from '../control/joystick.js'
import { Canvas } from '../graphics.js'
import { NewtonSystem } from '../newton.js'
import { Ship } from '../ship.js'

export const joystickScenario = () => {
    const canvas = new Canvas(document.querySelector('canvas'))
    
    const system = new NewtonSystem(canvas, { tickrate: 60 })

    const ship = new Ship({
        spriteSize: 1.2,
        size: 0.6,
        sprite: 'asset/ship.png',
        controller: JoystickControl,
    })

    system.bodies.add(ship)
}


