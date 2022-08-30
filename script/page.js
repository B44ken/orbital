import { NewtonBody } from './newton.js';
import { Vector } from './vector.js';

const canvasElement = document.querySelector('canvas')
const canvas = canvasElement.getContext('2d')
canvasElement.width = innerWidth
canvasElement.height = innerHeight


const scale = 900


const planet = new NewtonBody({
    mass: 1000000,
    position: { x: (innerWidth / 2 / scale), y: 0.5 },
    velocity: { x: 0, y: 0 }
})

const ship = new NewtonBody({
    mass: 5,
    position: { x: (innerWidth / 2 / scale), y: 0.55 },
    velocity: { x: -0.10, y: 0 }
})

const framerate = 60
setInterval(() => {
    ship.velocity.add(ship.gravity(planet).mult(1 / framerate))
    planet.velocity.add(planet.gravity(ship).mult(1 / framerate))
    ship.move()
    planet.move()
    console.log(ship. velocity)

    canvas.clearRect(0, 0, canvas.width, canvas.height)
    canvas.fillStyle = '#000'
    canvas.fillRect(0, 0, canvasElement.width, canvasElement.height)
    canvas.fillStyle = '#f00'
    canvas.beginPath()
    canvas.arc(ship.position.x * scale, ship.position.y * scale, 10, 0, 6.29)
    canvas.fill()
    canvas.fillStyle = '#0f0'
    canvas.beginPath()
    canvas.arc(planet.position.x * scale, planet.position.y * scale, 10, 0, 6.29)
    canvas.fill()
}, 1000 / framerate)


// 