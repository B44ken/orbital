export class Vector {
    constructor(component = {}) {
        this.x = component.x || 0
        this.y = component.y || 0
    }
    add(other) {
        if(other instanceof Vector) {
            return new Vector({ x: this.x + other.x, y: this.y + other.y })
        } else if(typeof other === 'number') {
            return new Vector({ x: this.x + other, y: this.y + other })
        }
    }
    sub(other) {
        if(other instanceof Vector) {
            return this.add(other.mult(-1))
        } else if(typeof other === 'number') {
            return this.add(-other)
        }
    }
    mult(other) {
        if(other instanceof Vector) {
            return new Vector({ x: this.x * other.x, y: this.y * other.y })
        } else if(typeof other === 'number') {
            return new Vector({ x: this.x * other, y: this.y * other })
        }
    }
    div(other) {
        if(other instanceof Vector) {
            return new Vector({ x: this.x / other.x, y: this.y / other.y })
        } else if(typeof other === 'number') {
            return new Vector({ x: this.x / other, y: this.y / other })
        }
    }
    dist(vector = new Vector) { 
        const dx = this.x - vector.x
        const dy = this.y - vector.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        return distance
    }
    normal() {
        return this.div(this.dist())
    }
    angle(other = new Vector) {
        console.log(other, this.sub(other))
        return 1
    }

    static fromAngle(a, mag = 1) {
        return new Vector({
            x: Math.cos(a),
            y: Math.sin(a)
        }).mult(mag)
    }
}