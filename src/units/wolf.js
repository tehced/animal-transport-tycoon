import { Unit } from './unit.js';

class Wolf extends Unit {

    constructor(pos) {
        super(pos, vec2(2,2), tile(0,40,3));
        this.selected = false;
    }

    render() {
        super.render()
    }
    
    // update() {
    //     let mouseisOver;
    //     mouseisOver = isOverlapping(this.pos, this.size, mousePosScreen);
    //     const mouseWasOver = mouseisOver;
    //     if (mouseisOver && !mouseWasOver)
    //         this.onEnter();
    //     if (!mouseisOver && mouseWasOver)
    //         this.onLeave();
    //     if (mouseWasPressed(0) && mouseisOver)
    //     {
    //         this.mouseIsHeld = true;
    //         this.onPress();
    //     } else if (this.mouseIsHeld && !mouseIsDown(0)) {
    //         this.mouseIsHeld = false;
    //         if (mouseisOver)
    //             this.onClick();
    //     }
    // }
    // onEnter() {};
    // onLeave() {};
    // onPress() {};
    // onClick() {
    //     console.log('click');
    // };

}

export { Wolf }