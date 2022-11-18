import { AIControl } from "../control/ai.js"
import { BothControls } from "../control/both.js"
import { KeyboardControl } from "../control/keyboard.js"
import { Shooter } from "../fighter.js"
import { Canvas, HitboxCircle } from "../graphics.js"
import { NewtonSystem } from "../newton.js"
import { Ship } from "../ship.js"
import { Vector } from "../vector.js"
import { Fuel } from '../fuel.js'

export const AIScenario = () => {
    const canvas = new Canvas(document.querySelector('canvas'))
    const system = new NewtonSystem(canvas)

    const player = new Ship({
        mass: 100,
        hp: 100,
        sprite: 'asset/ship-blue.png',
        position: new Vector({ x: 0, y: -5 }),
        controller: new BothControls,
        rotation: Math.PI,
        hitbox: HitboxCircle,
        action: new Shooter({ firePeriod: 350 }),
	fuel: new Fuel,
    })
    
    const opponent = new Ship({
        mass: 100,
        hp: 100,
        sprite: 'asset/ship.png',
        position: new Vector({ x: 0, y: 5 }),
        controller: new AIControl,
        hitbox: HitboxCircle,
        action: new Shooter({ firePeriod: 2000 }),
        rotation: Math.random() * Math.PI * 2,
    })

    system.addBodies(player, opponent)
}
