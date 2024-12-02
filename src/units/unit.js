import { currentGameState, GameState } from "../main.js";
class Unit extends EngineObject {

    constructor(pos, size, tileInfo, angle=0, color, renderOrder=1) {
        super(pos, size, tileInfo, angle, color, renderOrder);

        this.animationFrame = 0;
        this.walkTile = tile(tileInfo.pos.add(vec2(12, 0), tileInfo.size));
        this.jumpHeight = 0;
        this.selected = false;
    }

    render() {
        let pos = this.pos.add(vec2(0, this.step ? 1/12 : this.jumpHeight));

        this.step = Math.floor(this.walkFrame / 10) % 2;

        drawTile(pos, this.size, this.step ? this.walkTile : this.tileInfo, undefined, undefined, this.mirror);
        this.selected && drawTile(this.pos, vec2(3), tile(7, vec2(16,16)));
    }

    update() {
        if (currentGameState === GameState.Day)
        {       
            const mouseWasOver = this.mouseIsOver;
            this.mouseIsOver = isOverlapping(this.pos, this.size, mousePos);
            if (this.mouseIsOver && !mouseWasOver)
                console.log('enter');
                this.onEnter();
                
            if (!this.mouseIsOver && mouseWasOver)
                console.log('exit');
                this.onLeave();
            if (mouseWasPressed(0) && this.mouseIsOver)
            {
                this.mouseIsHeld = true;
                console.log('press');
                this.onPress();
            }
            else if (this.mouseIsHeld && !mouseIsDown(0))
            {
                this.mouseIsHeld = false;
                if (this.mouseIsOver)
                    clearInput();
                    console.log('click');
                    this.onClick();
                    this.selected = !this.selected;
            }
        } else {
            this.selected = false;
        }
    }

    onEnter() {};
    onLeave() {};
    onPress() {};
    onClick() {};

}

export { Unit }