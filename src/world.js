'use strict';

let tileData, tileLayers, foregroundLayerIndex;
let levelSize

const setTileData = (pos, layer, data)=>
    pos.arrayCheck(tileCollisionSize) && (tileData[layer][(pos.y|0)*tileCollisionSize.x+pos.x|0] = data);
const getTileData = (pos, layer)=>
    pos.arrayCheck(tileCollisionSize) ? tileData[layer][(pos.y|0)*tileCollisionSize.x+pos.x|0]: 0;


function loadLevel(level)
{
    //Loads level from a Tiled JS file
    const dataName = Object.keys(TileMaps)[level];
    const tileMapData = TileMaps[dataName];
    console.log(tileMapData);
    levelSize = vec2(tileMapData.width, tileMapData.height);
    initTileCollision(levelSize);

    tileData = [];
    tileLayers = [];
    const layerCount = tileMapData.layers.length;
    foregroundLayerIndex = layerCount - 1;
    for (let layer = layerCount; layer--;)
    {
        const layerData = tileMapData.layers[layer].data;
        const tileLayer = new TileLayer(vec2(), levelSize, tile(1));
        tileLayer.renderOrder = -1e3+layer;
        tileLayers[layer] = tileLayer;
        tileData[layer] = [];

        for (let x=levelSize.x; x--;)
        for (let y=levelSize.y; y--;)
        {
            const pos = vec2(x, levelSize.y-1-y);
            const tile = layerData[y*levelSize.x+x];

            setTileData(pos, layer, tile);

            // setTileCollisionData(pos, 1);
            const data = new TileLayerData(tile-1)
            tileLayer.setData(pos, data);
        }
        tileLayer.redraw();
    }
}



export { loadLevel }