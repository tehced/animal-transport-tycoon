/*
    Little JS Animal Transport Tycoon

*/

'use strict';

// enableAsserts = true;
// setShowSplashScreen(true);

import * as Player from './player.js';
import * as UI from './ui.js';
import * as World from './world.js';

import { GLOBAL, getFormattedDayTimer, incrementDay, startDayTimer } from './global.js';
import { inputManager } from './input.js';
import { Wolf } from './units/wolf.js';

let player, HUD, actionPanel;
let titleMenu, endOfDaySummaryMenu;
let settingsMenu;

let world, input;

let wolf;

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
    canvasFixedSize = vec2(1920,953);
    cameraPos = vec2(25,25);
    cameraScale = min(60, 60 * mainCanvas.width);

    // centers camera
    GLOBAL.desiredCameraPos = cameraPos;

    initUISystem();

    titleMenu = UI.buildTitleMenu();
    settingsMenu = UI.buildSettingsMenu();
    endOfDaySummaryMenu = UI.buildEndOfDayPopup();

    settingsMenu.visible = false;
    endOfDaySummaryMenu.visible = false;

    input = new inputManager();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state

    if (currentScene === Scene.MainMenu)
    {
        titleMenu.visible = true;
        settingsMenu.visible = false;
    }

    if (currentScene === Scene.Settings)
    {
        titleMenu.visible = false;
        settingsMenu.visible = true;
    }

    if (currentScene === Scene.Game)
        if (currentGameState === GameState.Day)
        {
            GLOBAL.desiredCameraPos = cameraPos;
            if (getFormattedDayTimer() < formatTime(1))
            {
                HUD.visible = false;
                goToGameState(GameState.EndOfDay);
            } else {
                
                UI.updateHUD(HUD);
                if (!wolf) {
                    wolf = new Wolf(vec2(25,25));
                }
            }
        }
        if (currentGameState === GameState.EndOfDay)
        {
            if (endOfDaySummaryMenu.visible === false){
                console.log('Day ended!');
                endOfDaySummaryMenu.visible = true;
                goToGameState(GameState.Idle);
            }
   
        }
        if (currentGameState === GameState.Idle)
        {
            return;
        }
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
    if (currentGameState === GameState.Day)
    {    
        if (cameraPos != GLOBAL.desiredCameraPos) {
            const diff = GLOBAL.desiredCameraPos.subtract(cameraPos);
            if (diff.length() < .2) {
                GLOBAL.desiredCameraPos = cameraPos;
            }
            cameraPos = cameraPos.add(diff.clampLength(diff.length()/10))
        }
    }

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

function buildWorld()
{
    World.loadLevel(0);
}

function startNewGame()
{
    titleMenu.visible = !titleMenu.visible;
    goToMenuState(Scene.Game);
    goToGameState(GameState.Day);
    initPlayer();
    startNewDay();
    buildWorld();
}

function initPlayer()
{
    player = new Player.Player();
    HUD = UI.buildPlayerHUD();
    actionPanel = UI.buildActionPanel();
}

function startNewDay()
{
    HUD.visible = true;
    startDayTimer();
    incrementDay();
}

export
{
    currentScene,
    currentGameState,
    Scene,
    GameState,
    actionPanel,
    startNewGame,
    startNewDay,
    goToMenuState,
    goToGameState,
}

// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['src/assets/tiles.png', 'src/assets/ui.png', 'src/assets/hud.png', 'src/assets/wolf.png', 'src/assets/objects.png']);
