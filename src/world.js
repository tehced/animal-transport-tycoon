'use strict';

let tileData, tileLayers, foregroundLayerIndex;
let levelSize

const setTileData = (pos, layer, data)=>
    pos.arrayCheck(tileCollisionSize) && (tileData[layer][(pos.y|0)*tileCollisionSize.x+pos.x|0] = data);
const getTileData = (pos, layer)=>
    pos.arrayCheck(tileCollisionSize) ? tileData[layer][(pos.y|0)*tileCollisionSize.x+pos.x|0]: 0;


function loadLevel(level)
{
    const sky = new Sky;
    //Loads level from a Tiled JS file
    const dataName = Object.keys(TileMaps)[level];
    const tileMapData = TileMaps[dataName];
    levelSize = vec2(tileMapData.width, tileMapData.height);
    initTileCollision(levelSize);

    tileData = [];
    tileLayers = [];
    const layerCount = tileMapData.layers.length;
    foregroundLayerIndex = layerCount - 1;
    for (let layer = layerCount; layer--;)
    {
        const layerData = tileMapData.layers[layer].data;
        const tileLayer = new TileLayer(vec2(), levelSize, tile(0));
        tileLayer.renderOrder = -1e3+layer;
        tileLayers[layer] = tileLayer;
        tileData[layer] = [];

        for (let x=levelSize.x; x--;)
        for (let y=levelSize.y; y--;)
        {
            const pos = vec2(x, levelSize.y-1-y);
            const tile = layerData[y*levelSize.x+x];

            setTileData(pos, layer, tile);
            
            const data = new TileLayerData(tile-1, 0, false);
            setTileCollisionData(pos, data);
            tileLayer.setData(pos, data);
        }
        tileLayer.redraw();
    }
}
///////////////////////////////////////////////////////////////////////////////
class Sky extends EngineObject
{
    constructor() 
    {
        super();

        this.renderOrder = -1e4;
        this.skyColor = WHITE;
        this.horizonColor = CYAN;
    }

    render()
    {
        // fill background with a gradient
        const gradient = mainContext.createLinearGradient(0, 0, 0, mainCanvas.height);
        gradient.addColorStop(0, this.skyColor);
        gradient.addColorStop(1, this.horizonColor);
        mainContext.save();
        mainContext.fillStyle = gradient;
        mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
        mainContext.globalCompositeOperation = 'lighter';
        
        // // draw stars
        // const random = new RandomGenerator(this.seed);
        // for (let i=1e3; i--;)
        // {
        //     const size = random.float(.5,2)**2;
        //     const speed = random.float() < .9 ? random.float(5) : random.float(9,99);
        //     const color = hsl(random.float(-.3,.2), random.float(), random.float());
        //     const extraSpace = 50;
        //     const w = mainCanvas.width+2*extraSpace, h = mainCanvas.height+2*extraSpace;
        //     const screenPos = vec2(
        //         (random.float(w)+time*speed)%w-extraSpace,
        //         (random.float(h)+time*speed*random.float())%h-extraSpace);
        //     mainContext.fillStyle = color;
        //     mainContext.fillRect(screenPos.x, screenPos.y, size, size);
        // }
        mainContext.restore();
    }
}

export { loadLevel, Sky, getTileData, setTileData }
