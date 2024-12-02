class Unit extends EngineObject {

    constructor(pos, size, tileInfo) {
        super(pos, size, tileInfo);

        this.animationFrame = 0;
        this.walkTile = tile(tileInfo.pos.add(vec2(12, 0), tileInfo.size));
        this.jumpHeight = 0;
        
    }

    render() {
        let pos = this.pos.add(vec2(0, this.step ? 1/12 : this.jumpHeight));

        this.step = Math.floor(this.walkFrame / 10) % 2;

        drawTile(pos, this.size, this.step ? this.walkTile : this.tileInfo, undefined, undefined, this.mirror);
    }

}

export { Unit }