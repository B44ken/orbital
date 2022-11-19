export class Fuel {
    constructor(data = {}) {
        this.ship = data.ship || null
        this.maxThrust = data.ship.thrust || 0.1
        this.maxFuel = data.maxFuel || 10
        this.fuel = this.maxFuel * 0.5
        this.gainRate = data.gainRate || 0.2
        this.outOfFuel = false
        this.interval = 1 / 20

        setInterval(() => this.track(), 1000 * this.interval)
        this.setGauge()
    }

    get percent() {
        return 100 * this.fuel / this.maxFuel
    }

    attach(ship) {
        // this.ship = ship
        // this.maxThrust = ship.thrust
    }

    track() {
        const thrust = this.ship?.controller?.currentControls.thrust || 0

        // intention: landing on a planet gives 10x fuel
        let gain = this.gainRate * this.interval
        if(this.ship.velocity.dist() < 0.01)
            gain *= 10
        this.fuel += gain

        // if out of fuel, player must wait for fuel to regenerate to 20%
        if(this.outOfFuel) {
            this.ship.thrust = 0
            if(this.percent > 20)
                this.outOfFuel = false
        } else
            this.ship.thrust = this.maxThrust

        this.fuel -= Math.abs(thrust * this.interval * !this.outOfFuel)
        this.fuel = Math.max(0, this.fuel)
        this.fuel = Math.min(this.maxFuel, this.fuel)
        if(this.fuel == 0)
            this.outOfFuel = true

        this.setGauge()
    }

    setGauge() {
        const gauge = document.querySelector('.fuel-inner')
        gauge.style.height = this.percent + '%'

        if(this.fuel / this.maxFuel < 0.2)
            gauge.classList.add('danger')
        else
            gauge.classList.remove('danger')
    }
}