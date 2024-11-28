/*
    Little JS Animal Transport Tycoon

*/

'use strict';

import * as Player from '../src/player.js';
import * as Global from '../src/global.js';
import * as UI from '../src/ui.js';
import * as World from '../src/world.js';

// setShowSplashScreen(true);

let player, HUD;
let titleMenu;

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

const GameState = {
    Day: 0,
    EndOfDay: 1,
    Idle: 2,
}

let currentScene = Scene.MainMenu;
let currentGameState = GameState.Idle;

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // called once after the engine starts up
    // setup the game
    canvasMaxSize = vec2(1920,1080);
    // canvasPixelated = true;
    cameraPos = vec2(25,25);
    // cameraScale = 25;

    initUISystem();
    titleMenu = UI.buildTitleMenu();

}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state

    if (currentScene === Scene.MainMenu)
    {
        titleMenu.visible = true;
    }

    if (currentScene === Scene.Settings)
    {
        settingsMenu.visible = true;
    }

    if (currentScene === Scene.Game)
        if (currentGameState === GameState.Day)
            if (Global.getFormattedDayTimer() < formatTime(1))
            {
                HUD.visible = !HUD.visible;
                goToGameState(GameState.EndOfDay);
            } else {
                UI.updateHUD(HUD, player);
            }
        if (currentGameState === GameState.EndOfDay)
        {
            console.log('Day ended!');
            startNewDay(player);
            HUD.visible = !HUD.visbile;
            goToGameState(GameState.Day);
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
    
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // called after objects are rendered
    // draw effects or hud that appear above all objects

}

///////////////////////////////////////////////////////////////////////////////
// helper functions
function goToMenuState(scene)
{
    if (currentScene !== scene)
    {
        currentScene = scene;
    }
}

function goToGameState(state)
{
    if (currentGameState !== state)
    {
        currentGameState = state;
    }
}

function startNewGame()
{
    titleMenu.visible = !titleMenu.visible;
    goToMenuState(Scene.Game);
    goToGameState(GameState.Day);
    initPlayer();
    startNewDay(player);
    World.loadLevel(0);
}

function initPlayer()
{
    player = new Player.Player();
    HUD = UI.buildPlayerHUD();
}

function startNewDay(player)
{
    Global.startDayTimer();
    player.day += 1;
    UI.updateHUD(HUD, player);
}

export
{
    startNewGame,
    goToMenuState,
}

// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['src/tiles.png']);
