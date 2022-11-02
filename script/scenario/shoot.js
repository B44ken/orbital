import { KeyboardControl } from "../control/keyboard.js"
import { Projectile } from "../fighter.js"
import { Canvas, HitboxCircle } from "../graphics.js"
import { NewtonSystem } from "../newton.js"
import { Ship } from "../ship.js"

export const shootingScenario = () => {
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
            // manaully adding and removing the projectile is not ideal
            system.bodies.add(new Projectile(ship, system))
        }
    })

    system.bodies.add(ship)
}
