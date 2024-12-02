import { GLOBAL } from "./global.js";
import { currentGameState, GameState } from "./main.js";
import { getTileData } from "./world.js";

const ZOOM_FACTOR = 2;

class inputManager extends EngineObject {

    constructor(){
        super(vec2(-1,-1),vec2(0,0))

        this.isDragging = false;
        this.dragTimer = new Timer();
        this.dragDelta = vec2();
        this.lastMousePos = vec2();
    }

    update() {
        if (currentGameState === GameState.Day)
        {
            if (mouseWasPressed(0))
            {
                console.log(getTileData(mousePos, 0));
            }
            if (mouseWasPressed(2))
            {
                this.isDragging = true;
                this.dragTimer.set(1);
                this.lastMousePos = mousePos.copy();
            } else if (mouseWasReleased(2)) {
                this.isDragging = false;
                this.dragDelta = vec2();
            }

            if (this.isDragging)
            {
                this.dragDelta = mousePos.subtract(this.lastMousePos);
                GLOBAL.desiredCameraPos = GLOBAL.desiredCameraPos.subtract(this.dragDelta);
            }

            cameraScale -= mouseWheel*ZOOM_FACTOR;
            cameraScale = clamp(cameraScale, 1, 100);

        } else {
            this.isDragging = false;
            this.dragDelta = vec2();
        }
    }
}

export { inputManager }