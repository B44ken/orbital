import { KeyboardControl } from "../control/keyboard.js"
import { BothControls } from "../control/both.js"
import { Shooter } from "../fighter.js"
import { Canvas, HitboxCircle } from "../graphics.js"
import { NewtonSystem, NewtonEntity } from "../newton.js"
import { Ship } from "../ship.js"
import { Vector } from "../vector.js"


export const versusScenario = () => {
    const canvas = new Canvas(document.querySelector('canvas'))
    const system = new NewtonSystem(canvas)

    const playerA = new Ship({
        mass: 100,
        hp: 100,
        sprite: 'asset/ship-blue.png',
        position: new Vector({ x: -8, y: 0 }),
        controller: new BothControls,
        rotation: Math.PI,
        hitbox: HitboxCircle,
        action: new Shooter,
	size: 0.7,
	spriteSize: 1.4
    })
    
    const playerB = new Ship({
        mass: 100,
        hp: 100,
        sprite: 'asset/ship.png',
        position: new Vector({ x: 8, y: 0 }),
        hitbox: HitboxCircle,
        controller: new KeyboardControl({
		layout: {
			"up": "i",
			"down": "k",
			"left": "j",
			"right": "l",
			"action": "h"
		}	
	}),
        hitbox: HitboxCircle,
        action: new Shooter,
	size: 0.7,
	spriteSize: 1.4
    })

    const planet = new NewtonEntity({
	mass: 300_000,
	hp: Infinity,
	size: 4,
	hitbox: HitboxCircle,
	color: '#afa',
    })


    system.addBodies(playerA, playerB, planet)
}
