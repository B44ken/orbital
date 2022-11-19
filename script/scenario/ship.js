import { Canvas, HitboxCircle } from '../graphics.js'
import { NewtonEntity, NewtonSystem } from '../newton.js'
import { Ship } from '../ship.js'
import { Vector } from '../vector.js'
import { Shooter } from '../fighter.js'
import { Camera } from '../camera.js'
import { BothControls } from '../control/both.js'
import { KeyboardControl } from '../control/keyboard.js'
import { Fuel } from '../fuel.js'

export const shipScenario = () => {
    const canvas = new Canvas(document.querySelector('canvas'))
    const system = new NewtonSystem(canvas, { tickrate: 60 })
    canvas.camera = new Camera({
        bodies: system.bodies,
        minSize: 40
    })

    const planet = new NewtonEntity({
        mass: 5e6,
        size: 16,
        hitbox: HitboxCircle,
        class: ['cameraTrack']  
    })

    const playerA = new Ship({
        hp: 100,
        mass: 5,
        thrust: 0.005,
        position: new Vector({ y: -30 }),
        spriteSize: 2,
        sprite: 'asset/ship.png',
        controller: new BothControls,
        hitbox: HitboxCircle,
        action: new Shooter,
        class: ['cameraTrack', 'cameraTrackAlways']
    })

    const playerB = new Ship({
        hp: 100,
        sprite: 'asset/ship.png',
        position: new Vector({ y: 30 }),
        rotation: Math.PI,
        hitbox: HitboxCircle,
        action: new Shooter,
        spriteSize: 2,
        sprite: 'asset/ship-blue.png',
        class: ['cameraTrack'],
        controller: new KeyboardControl({
            layout: { 
                "up": "i",
                "down": "k",
                "left": "j",
                "right": "l",
                "action": "h"  
            }
        })
    })


    playerA.velocity.x = NewtonSystem.findOrbitVelocity(playerA, planet, system.G)
    playerB.velocity.x = -NewtonSystem.findOrbitVelocity(playerB, planet, system.G)


    system.addBodies(planet, playerA, playerB)
}
