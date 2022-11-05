import { Control } from "./control.js";

export class BothControls extends Control {
    constructor(parent) {
        super(parent);
        this.joystick = new JoystickControl(parent);
        this.keyboard = new KeyboardControl(parent);
        this.currentControls = {};
        this.init(parent);
    }

}