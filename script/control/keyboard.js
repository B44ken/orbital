import { Vector } from "../vector.js"
import { Control } from "./control.js"

// thrust, rotationAccel only updates on keyup and keydown
// fine for now because the body stops rotating when the key is released
export class KeyboardControl extends Control {
    constructor(data = {}) {
        super()
        this.keysPressed = new Set
        this.init()
        const dataLayout = data.layout || {}
        this.layout = { left: 'a', right: 'd', up: 'w', down: 's', action: ' ', ...dataLayout }
    }

    init(ship) {
        document.addEventListener('keydown', event => {
            this.keysPressed.add(event.key)
            this.updateKeys()
            this.setForces()
        })
        document.addEventListener('keyup', event => {
            this.keysPressed.delete(event.key)
            this.updateKeys()
            this.setForces()
        })
    }

    updateKeys() {
        if(this.keysPressed.has(this.layout.left))
            this.currentControls.rotation = 1
        else if(this.keysPressed.has(this.layout.right))
            this.currentControls.rotation = -1
        else this.currentControls.rotation = 0

        if(this.keysPressed.has(this.layout.up))
            this.currentControls.thrust = -1
        else if(this.keysPressed.has(this.layout.down))
            this.currentControls.thrust = 1
        else this.currentControls.thrust = 0

        if(this.keysPressed.has(this.layout.action))
            this.currentControls.action = true
        else this.currentControls.action = false
    }

}