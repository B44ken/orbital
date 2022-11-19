import { Control } from "./control.js"

// thrust, rotationAccel only updates on keyup and keydown
// fine for now because the body stops rotating when the key is released
export class KeyboardControl extends Control {
    constructor(data = {}) {
        super()
        const dataLayout = data.layout || {}
        this.keysPressed = new Set
        this.layout = { left: 'a', right: 'd', up: 'w', down: 's', action: ' ', ...dataLayout }
        this.turnSens = data.turnSens || 0.5
        this.init()
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
            this.currentControls.rotation = this.turnSens
        else if(this.keysPressed.has(this.layout.right))
            this.currentControls.rotation = -this.turnSens
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