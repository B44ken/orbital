import { Vector } from "../vector.js"

// thrust, rotationAccel only updates on keyup and keydown
// fine for now because the body stops rotating when the key is released
export class KeyboardControl {
    constructor(parent) {
        this.parent = parent
        this.currentControls = {}
        this.keysPressed = new Set
        this.init(parent)   
    }
    init(ship) {
        document.addEventListener('keydown', event => {
            this.keysPressed.add(event.key)
            this.updateForces(ship)
        })
        document.addEventListener('keyup', event => {
            this.keysPressed.delete(event.key)
            this.updateForces(ship)
        })
    }
    updateForces(ship) {
        if(this.keysPressed.has('a'))
            this.currentControls.rotation = 1
        else if(this.keysPressed.has('d'))
            this.currentControls.rotation = -1
        else this.currentControls.rotation = 0

        if(this.keysPressed.has('w'))
            this.currentControls.thrust = -1
        else if(this.keysPressed.has('s'))
            this.currentControls.thrust = 1
        else this.currentControls.thrust = 0

        const heading = Vector.fromAngle(this.parent.rotation)
        ship.force = heading.mult(this.currentControls.thrust * this.parent.thrust)
        ship.rotationSpeed = this.currentControls.rotation * ship.rotationAccel
    }
}