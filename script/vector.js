export class Vector {
    constructor(component) {
        this.x = component.x
        this.y = component.y
        if(this.z)
            this.z = component.z
    }
    static zero() {
        return new Vector({ x: 0, y: 0, z: 0 })
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
            return new Vector({ x: this.x - other.x, y: this.y - other.y })
        } else if(typeof other === 'number') {
            return new Vector({ x: this.x - other, y: this.y - other })
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
    dist(vector = Vector.zero()) { 
        const dx = this.x - vector.x
        const dy = this.y - vector.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        return distance
    }
    normal() {
        const magnitude = this.dist(new Vector({ x: 0, y: 0 }))
        return this.div(magnitude)
    }

}