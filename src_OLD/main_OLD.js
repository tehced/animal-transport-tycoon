/*
    Little JS Animal Transport Tycoon

*/

'use strict';

//imports
import * as Objects from '../src/objects.js';
import * as Player from '../src/player.js';
import * as Global from '../src/global.js';

if (!debug)
{
    showWatermark = false;
    showSplashScreen = true;
}

let levelSize;
let cursor, font;
let startGameButton, settingsButton, backButton;
let hudRect, moneyLabel, timeLabel, dayLabel;

const Scene = {
    MainMenu: 0,
    Game: 1,
    Settings: 2,
}

const SceneKey = {
    0: 'MainMenu',
    1: 'Game',
    2: 'Settings',
}

let currentScreen = Scene.MainMenu;

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // called once after the engine starts up
    // setup the game
    font = new FontImage();

    canvasFixedSize = vec2(1280,720); //720p Landscape
    levelSize = vec2(1280,720);
    cameraPos = levelSize.scale(0.5);
    cameraScale = 16;
    cursor = new Objects.Cursor(vec2(levelSize.x / 2, levelSize.y / 2));

    buildMainMenuButtons();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state

    cursor.pos = mousePos;

    if (startGameButton.selected) 
    {
        startGame();
        goToState(Scene.Game);
        startGameButton.selected = false;
    }

    if (settingsButton.selected)
    {
        if (currentScreen === Scene.MainMenu)
        {
            destroyMainMenu();
        }

        buildSettingsMenuButtons();
        goToState(Scene.Settings);
        settingsButton.selected = false;
    }

    if (backButton)
    {
        if (backButton.selected)
        {
            if (currentScreen === Scene.Settings)
            {
                buildMainMenuButtons();
                goToState(Scene.MainMenu);
            }

            destroySettingsMenu();
        }
        backButton.selected = false;
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

    if (currentScreen === Scene.MainMenu) 
    {
        font.drawText("Animal\nTransport\nTycoon", vec2(cameraPos.x, cameraPos.y + 20), 0.6, true);
        // drawTile(vec2(cameraPos.x, cameraPos.y + 16 + Math.sin(timeReal)), vec2(12), 1, tileSizeDefault, new Color(1,1,1,1), 0, 0, new Color(0,0,0,0), true);
    } 
    else if (currentScreen === Scene.Settings) 
    {
        font.drawText("Settings:", vec2(cameraPos.x, cameraPos.y + 18), 0.3, true);
    }
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // called after objects are rendered
    // // draw effects or hud that appear above all objects
    
    if (currentScreen === Scene.Game)
    {
        initPlayer();
        
    }
}

/////////////////////////////////////////////////////////////////////////////
// helper functions
function goToState(scene)
{
    if (currentScreen !== scene)
    {
        currentScreen = scene;
    }
}

function startGame()
{
    destroyMainMenu();
    newDay();
}

function newDay()
{
    Global.incrementDay();
    Global.startDayTimer();
}

function buildMainMenuButtons()
{
    startGameButton = new Objects.StartButton(vec2(cameraPos.x, cameraPos.y - 2));
    settingsButton = new Objects.SettingsButton(vec2(cameraPos.x, cameraPos.y - 12));
}

function destroyMainMenu()
{
    startGameButton.destroy();
    settingsButton.destroy();
}

function buildSettingsMenuButtons()
{
    backButton = new Objects.BackButton(vec2(cameraPos.x - 25, cameraPos.y + 17));
}

function destroySettingsMenu()
{
    backButton.destroy();
}

function buildHUD(player, countdown)
{
    hudRect = drawRect(vec2(cameraPos.x, cameraPos.y+20), vec2(80,16), new Color(0.996078431372549,0.905882352,0.3803921568627451), 0, false);
    timeLabel = font.drawText("Time Remaining: " + countdown, vec2(cameraPos.x - 20, cameraPos.y + 20), 0.2, true);
    dayLabel = font.drawText("Day: " + Global.GLOBAL.dayCount, vec2(cameraPos.x + 20, cameraPos.y + 20), 0.2, true);
    moneyLabel = font.drawText("Money: " + player.getMoney(), vec2(cameraPos.x + 5, cameraPos.y + 20), 0.2, true);
    
}

function initPlayer()
{
    let player = new Player.Player();
    let countdown = formatTime(-Global.GLOBAL.dayTimer);

    buildHUD(player, countdown);
}

/////////////////////////////////////////////////////////////////////////////

// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['tiles.png']);