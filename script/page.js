import { binaryScenario } from './scenario/binary.js'
import { shipScenario } from './scenario/ship.js'
import { AIScenario } from './scenario/ai.js'
import { versusScenario } from './scenario/versus.js'

document.querySelector('select').addEventListener('change', event => {
    location.search = `?scenario=${event.target.value}` 
})

document.querySelector('.modal-close').addEventListener('click', event => {
    document.querySelector('.modal').classList.add('hidden')
})

const query = new URLSearchParams(window.location.search)
const scenario = query.get('scenario') || 'ship'

if(scenario == 'binary')
    binaryScenario()
if(scenario == 'ship')
    shipScenario()
if(scenario == 'ai')
    AIScenario()
if(scenario == 'versus')
    versusScenario()
