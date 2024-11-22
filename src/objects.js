class Cursor extends EngineObject {
    constructor(pos)
    {
        super(pos, vec2(0));
        this.setCollision(1,1);

        this.renderOrder = 20
    }

    update()
    {
        // this.pos.x = mousePos.x;
        // this.pos.y = mousePos.y;

        // this.pos.x = clamp(this.pos.x, this.size.x / 2, levelSize.x - this.size.x / 2);
        // this.pos.y = clamp(this.pos.y, this.size.y / 2, levelSize.y - this.size.y / 2);
    }
}

class Button extends EngineObject {
    constructor(pos, size, text, number, color, backgroundColor)
    {
        super(pos, size);
        this.text = text;
        this.number = number;
        this.color = color;
        this.backgroundColor = backgroundColor;
        this.selected = false;
        this.font = new FontImage(undefined, vec2(8), vec2(0,1));
        this.setCollision(1);
    }

    render()
    {
        if (this.selected) {
            this.color = new Color(1,0,1);
            this.backgroundColor = new Color(0.5,0,0.5);
        } else {
            this.color = new Color(1,0,0);
            this.backgroundColor = new Color(0.5,0,0);
        }

        drawRect(vec2(this.pos.x, this.pos.y), this.size, this.backgroundColor, 0, false);
        drawRect(vec2(this.pos.x, this.pos.y), vec2(this.size.x - 1, this.size.y - 1), this.color, 0, false);
        this.font.drawText(this.text, vec2(this.pos.x, this.pos.y + 1.5), 0.2, true);
        if (this.number > -1) {
            this.font.drawText(this.number.toString(), vec2(this.pos.x + 5, this.pos.y - 1), 0.2, true);
        }
    }

    collideWithObject(o)
    {
        if (isOverlapping(o.pos, o.size, this.pos, this.size) && isDown()) {
            this.doSelect();
        }
        return false;
    }

    doSelect()
    {
        engineObjects.forEach((obj) => {
            if (obj instanceof Button) {
                obj.selected = false;
            }
        })
        this.selected = true;
    }
}

class StartButton extends Button {
    constructor(pos, cursor) 
    {
        super(pos, vec2(18,8), "Start\nGame", -1, new Color(1,0,0), new Color(0.5,0,0));
    }
}

class SettingsButton extends Button {
    constructor(pos)
    {
        super(pos, vec2(18,8), "Settings", -1, new Color(1,0,0), new Color(0.5,0,0));
    }
}

function isDown() {
    return mouseIsDown(0)
}

function isClicked(o) {
    return (o === cursor && mouseIsDown(0))
}

export {

    Cursor,
    Button,
    StartButton,
    SettingsButton
}