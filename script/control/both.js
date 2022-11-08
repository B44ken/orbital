import { Control } from "./control.js";
import { JoystickControl } from "./joystick.js";
import { KeyboardControl } from "./keyboard.js";

export class BothControls extends Control {
    constructor(data) {
        super(data)
        this.joystick = new JoystickControl(data)
        this.keyboard = new KeyboardControl(data)
    }

    attach(parent) {
        this.joystick.attach(parent)
        this.keyboard.attach(parent)
    }
}