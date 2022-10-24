export class JoystickControl {
    constructor(parent) {
    
    }   

    attachToElement() {
        const circle = document.querySelector('.joystick-circle')
        const stick = document.querySelector('.joystick-stick')

        document.addEventListener('click', event => {
            circle.classList.add('active')
        })

        document.addEventListener('', event => {
            circle.classList.remove('active')
        }
    }
}