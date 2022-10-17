import { binaryScenario } from './scenario/binary.js'
import { shipScenario } from './scenario/ship.js'

document.querySelector('select').addEventListener('change', event => {
    location.search = `?scenario=${event.target.value}` 
})

const query = new URLSearchParams(window.location.search)
const scenario = query.get('scenario') || 'ship'

if(scenario == 'binary')
    binaryScenario()
if(scenario == 'ship')
    shipScenario()