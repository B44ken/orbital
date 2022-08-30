export class Vector {
    constructor(component) {
        this.x = component.x;
        this.y = component.y;
        if(this.z)
            this.z = component.z;
    }
    static zero() {
        return new Vector({ x: 0, y: 0, z: 0 })
    }
    add(other) {
        if(other instanceof Vector) {
            this.x += other.x;
            this.y += other.y;
            if(this.z)
                this.z += other.z;
            return this;
        } else if(typeof other === 'number') {
            this.x += other;
            this.y += other;
            if(this.z)
                this.z += other;
            return this;
        }
    }
    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        if(this.z)
            this.z -= vector.z;
        return this;
    }
    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        if(this.z)
            this.z *= scalar;
        return this;
    }
    div(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        if(this.z)
            this.z /= scalar;
        return this;
    }
    dist(vector) { 
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }
    normal() {
        const magnitude = this.dist(new Vector({ x: 0, y: 0 }));
        return new Vector({ x: this.x / magnitude, y: this.y / magnitude });
    }

}