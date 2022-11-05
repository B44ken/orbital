import { BothControls } from "../control/both.js"
import { KeyboardControl } from "../control/keyboard.js"
import { Shooter } from "../fighter.js"
import { Canvas, HitboxCircle } from "../graphics.js"
import { NewtonSystem } from "../newton.js"
import { Ship } from "../ship.js"
import { Vector } from "../vector.js"

export const shootingScenario = () => {
    const canvas = new Canvas(document.querySelector('canvas'))
    const system = new NewtonSystem(canvas)

    const ship = new Ship({
        mass: 100,
        hp: 100,
        sprite: 'asset/ship.png',
        position: new Vector({ x: 0, y: 5 }),
        hitbox: HitboxCircle,
        controller: new KeyboardControl,
        hitbox: HitboxCircle,
        action: new Shooter
    })

    const opponent = new Ship({
        mass: 100,
        hp: 100,
        sprite: 'asset/ship-blue.png',
        position: new Vector({ x: 0, y: -5 }),
        controller: new BothControls({ layout: {
            up: 'i', down: 'k', left: 'j', right: 'l', action: 'u',
        }}),
        rotation: Math.PI,
        hitbox: HitboxCircle,
        action: new Shooter
    })
    
    system.addBodies(ship, opponent)
}
