import { Unit } from './unit.js';

class Wolf extends Unit {

    constructor(pos) {
        super(pos, vec2(2), tile(0,40,3));
    }

    render() {
        
        super.render();
    }
    
}

export { Wolf }