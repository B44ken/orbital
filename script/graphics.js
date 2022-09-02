import { Vector } from "./vector.js"

export class Canvas {
    constructor(canvasElement, data = {}) {
        this.canvasElement = canvasElement
        this.canvas = canvasElement.getContext('2d')
        this.canvasElement.width = innerWidth
        this.canvasElement.height = innerHeight
        this.scale = data.scale || 30
        this.rotation = data.rotation || 0
        this.centerScreen = new Vector({
            x: innerWidth * 0.5,
            y: innerHeight * 0.5
        })
        this.cameraPos = new Vector
        this.listenForResize()
    }
    clear(color) {
        this.canvas.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
        this.canvas.fillStyle = color
        this.canvas.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height)
    }
    draw(entity) {
        if(entity.sprite) {
            const realPosition = new Vector({
                x: entity.position.x * this.scale + this.centerScreen.x,
                y: entity.position.y * this.scale + this.centerScreen.y
            })
            const realSize = entity.size * this.scale
            this.canvas.save()
            this.canvas.translate(realPosition.x, realPosition.y)
            this.canvas.rotate(entity.rotation)
            this.canvas.drawImage(entity.sprite, -realSize / 2, -realSize / 2, realSize, realSize)
            this.canvas.restore()
        } else {
            const realPosition = new Vector({
                x: entity.position.x * this.scale + this.centerScreen.x,
                y: entity.position.y * this.scale + this.centerScreen.y
            })
            const realSize = entity.size * this.scale
            this.canvas.fillStyle = entity.color
            this.canvas.beginPath()
            this.canvas.arc(realPosition.x, realPosition.y, realSize, 0, Math.PI * 2)
            this.canvas.fill()
        }
    }
    listenForResize() {
        window.addEventListener('resize', () => {
            this.canvasElement.width = innerWidth
            this.canvasElement.height = innerHeight
            this.centerScreen = new Vector({
                x: innerWidth * 0.5,
                y: innerHeight * 0.5
            })
        })
    }
}

export const HitboxCircle = (A, B) => {
    const distance = A.position.dist(B.position)
    return distance < A.size + B.size
}
export const HitboxNone = () => false