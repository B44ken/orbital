import { binaryScenario } from './scenario/binary.js'
import { shipScenario } from './scenario/ship.js'
import { shootingScenario } from './scenario/shoot.js'
import { joystickScenario } from './scenario/stick.js'
import { fuelScenario } from './scenario/fuel.js'

document.querySelector('select').addEventListener('change', event => {
    location.search = `?scenario=${event.target.value}` 
})

const query = new URLSearchParams(window.location.search)
const scenario = query.get('scenario') || 'shoot'

if(scenario == 'binary')
    binaryScenario()
if(scenario == 'ship')
    shipScenario()
if(scenario == 'shoot')
    shootingScenario()
if(scenario == 'stick')
    joystickScenario()
if(scenario == 'fuel')
    fuelScenario()