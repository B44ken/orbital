export class JoystickControl {
    constructor(parent) {
    
    }   

    attachToElement() {
        const circle = document.querySelector('.joystick-circle')
        const stick = document.querySelector('.joystick-stick')

        document.addEventListener('mousedown', event => {
            circle.classList.add('active')
        })

        document.addEventListener('mouseup', event => {
            circle.classList.remove('active')
        })
    }
}