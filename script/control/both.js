import { Control } from "./control.js";
import { JoystickControl } from "./joystick.js";
import { KeyboardControl } from "./keyboard.js";

export class BothControls extends Control {
    constructor(data) {
        super(data)
        this.joystick = new JoystickControl(data)
        this.keyboard = new KeyboardControl(data)

        setInterval(() => this.updateControls(), 1000 / 60)
    }

    attach(parent) {
        this.joystick.attach(parent)
        this.keyboard.attach(parent)
    }

    updateControls() {
        if(this.joystick.currentControls.thrust != 0)
            this.currentControls.thrust = this.joystick.currentControls.thrust
        else
            this.currentControls.thrust = this.keyboard.currentControls.thrust
        
        if(this.joystick.currentControls.rotation != 0)
            this.currentControls.rotation = this.joystick.currentControls.rotation
        else
            this.currentControls.rotation = this.keyboard.currentControls.rotation
    }
}
