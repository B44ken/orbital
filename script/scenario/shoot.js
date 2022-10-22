import { Projectile } from "../fighter.js"
import { Canvas, HitboxCircle } from "../graphics.js"
import { NewtonSystem } from "../newton.js"
import { KeyboardControl, Ship } from "../ship.js"
import { Vector } from "../vector.js"

const canvas = new Canvas(document.querySelector('canvas'))
const system = new NewtonSystem(canvas)

const ship = new Ship({
    mass: 100,
    sprite: 'asset/ship.png',
    controller: KeyboardControl,
    hitbox: HitboxCircle,
})

document.addEventListener('keydown', event => {
    if(event.key == ' ') {
        const projectile = new Projectile(ship)
        system.bodies.push(projectile)
    }
})

export const shootingScenario = () => {
    system.bodies.push(ship)
}