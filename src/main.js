/*
    Little JS Animal Transport Tycoon

*/

'use strict';
import * as Objects from '../src/objects.js';

// showWatermark = false;
// showSplashScreen = true;

let levelSize;
let cursor;
let startGameButton;
let settingsButton;

const Scene = {
    MainMenu: 0,
    Game: 1,
    Settings: 2,
}

let currentScreen = Scene.MainMenu;

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // called once after the engine starts up
    // setup the game

    canvasFixedSize = vec2(1280,720); //720p Landscape
    levelSize = vec2(1280,720);
    cameraPos = levelSize.scale(0.5);
    cameraScale = 16;
    cursor = new Objects.Cursor(vec2(levelSize.x / 2, levelSize.y / 2));

    if (currentScreen === Scene.MainMenu)
    {
        startGameButton = new Objects.StartButton(vec2(cameraPos.x, cameraPos.y - 2));
        settingsButton = new Objects.SettingsButton(vec2(cameraPos.x, cameraPos.y - 12));
    }
    
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // called every frame at 60 frames per second
    // // handle input and update the game state

    cursor.pos = mousePos;

    if (startGameButton.selected) {
        startGame();
        goToState(Scene.Game);
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
    
}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    // called before objects are rendered
    // draw any background effects that appear behind objects
    const font = new FontImage();

    if (currentScreen === Scene.MainMenu) {
        
        font.drawText("Animal\nTransport\nTycoon", vec2(cameraPos.x, cameraPos.y + 20), 0.6, true);
        
        // drawTile(vec2(cameraPos.x, cameraPos.y + 16 + Math.sin(timeReal)), vec2(12), 1, tileSizeDefault, new Color(1,1,1,1), 0, 0, new Color(0,0,0,0), true);

        return;
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // called after objects are rendered
    // // draw effects or hud that appear above all objects
    
}

/////////////////////////////////////////////////////////////////////////////
function goToState(scene)
{
    if (currentScreen !== scene)
    {
        currentScreen = scene;
    }
}

function startGame()
{
    if (currentScreen === Scene.MainMenu)
    {
        startGameButton.destroy();
        settingsButton.destroy();
    }

    
}
/////////////////////////////////////////////////////////////////////////////

// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);