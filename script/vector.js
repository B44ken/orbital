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
    normal(length = 1) {
        return this.div(this.dist()).mult(length)
    }
    angle(other = new Vector) {
        return Math.atan2(this.x - other.x, this.y - other.y)
    }
    dot(other) {
        return this.x * other.x + this.y * other.y
    }

    static fromAngle(a, mag = 1) {
        return new Vector({
            x: Math.sin(a),
            y: Math.cos(a)
        }).mult(mag)
    }
}