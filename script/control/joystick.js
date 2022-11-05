import { Vector } from '../vector.js'

export class JoystickControl {
    constructor(parent) {
        this.circle = document.querySelector('.joystick-circle')
        this.button = document.querySelector('.joystick-button')
        this.position = document.querySelector('.joystick-position')
        this.init(parent)
    }   
    
    init() {
        document.addEventListener('mousedown', event => {
            this.mousePos = new Vector({ x: event.x, y: event.y })
            this.position.classList.add('active')

            this.circle.style.left = this.mousePos.x + 'px'
            this.circle.style.top = this.mousePos.y + 'px'

            this.moveButton()
        })

        document.addEventListener('mouseup', event => {
            this.position.classList.remove('active')
        })

        document.addEventListener('mousemove', event => {
            this.mousePos = new Vector({ x: event.x, y: event.y })
            this.moveButton()
        })
    }

    moveButton() {
        let buttonPos = this.mousePos
        const circlePos = new Vector({ x: this.circle.offsetLeft, y: this.circle.offsetTop })
        const distance = this.mousePos.sub(circlePos)

        if(distance.dist() > 80)
            buttonPos = distance.normal().mult(80).add(circlePos)

        this.button.style.left = buttonPos.x + 'px'
        this.button.style.top = buttonPos.y + 'px'
    }
}