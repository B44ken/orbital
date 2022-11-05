import { Vector } from '../vector.js'
import { Control } from './control.js'

export class JoystickControl extends Control {
    constructor(parent) {
        super(parent)
        this.circle = document.querySelector('.joystick-circle')
        this.button = document.querySelector('.joystick-button')
        this.position = document.querySelector('.joystick-position')
        this.init(parent)
    }   
    
    init() {
        document.addEventListener('mousedown', e => this.onDown(e))
        document.addEventListener('touchstart', e => this.onDown(e))
        document.addEventListener('mouseup', e => this.onUp(e))
        document.addEventListener('touchend', e => this.onUp(e))
        document.addEventListener('mousemove', e => this.onMove(e))
        document.addEventListener('touchmove', e => this.onMove(e))
    }

    onDown(event) {
        this.mousePos = new Vector({
            x: event.x | event.targetTouches[0].clientX,
            y: event.y | event.targetTouches[0].clientY 
        })
        this.position.classList.add('active')

        this.circle.style.left = this.mousePos.x + 'px'
        this.circle.style.top = this.mousePos.y + 'px'

        this.moveButton()
    }

    onUp(event) {
        this.position.classList.remove('active')
        this.currentControls.rotation = 0
    }

    onMove(event) {
        this.mousePos = new Vector({
            x: event.x | event.targetTouches[0].clientX,
            y: event.y | event.targetTouches[0].clientY 
        })
        this.moveButton()
        this.update()
        this.setForces(this.parent)
    }

    moveButton() {
        let buttonPos = this.mousePos
        const circlePos = new Vector({ x: this.circle.offsetLeft, y: this.circle.offsetTop })
        const distance = this.mousePos.sub(circlePos)

        if(distance.dist() > 80) {
            buttonPos = distance.normal().mult(80).add(circlePos)
        }

        this.button.style.left = buttonPos.x + 'px'
        this.button.style.top = buttonPos.y + 'px'
    }

    update() {
        const circlePos = new Vector({ x: this.circle.offsetLeft, y: this.circle.offsetTop })
        let stick = this.mousePos.sub(circlePos).div(80)
        if(!this.position.classList.contains('active')) {
            this.currentControls.rotation = 0
            this.currentControls.thrust = 0
            return
        }

        // the stick is actually a square, probably better this way?
        if(stick.x > 1) stick.x = 1
        if(stick.x < -1) stick.x = -1
        if(stick.y > 1) stick.y = 1
        if(stick.y < -1) stick.y = -1

        this.currentControls.rotation = -stick.x
        this.currentControls.thrust = stick.y
    }
}