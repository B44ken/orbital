import { Control } from "./control.js";
import { JoystickControl } from "./joystick.js";
import { KeyboardControl } from "./keyboard.js";

export class BothControls extends Control {
    constructor(parent) {
        super(parent)
        this.joystick = new JoystickControl(parent)
        this.joystick.parent = parent
        this.keyboard = new KeyboardControl(parent)
        this.keyboard.parent = parent
    }

    attach(parent) {
        this.joystick.attach(parent)
        this.keyboard.attach(parent)
    }
}