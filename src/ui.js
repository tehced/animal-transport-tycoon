import { startNewGame, startNewDay, goToGameState, GameState, goToMenuState, Scene } from './main.js';
import { GLOBAL, COLORS, getFormattedDayTimer } from'./global.js';

//defaults
const defaultButtonColor = COLORS.NOTEBOOK;
const defaultTextColor = BLACK;
const defaultHoverColor = YELLOW;
const defaultLineWidth = 6;

// sound effects
const sound_click = new Sound([1,0]);

function buildTitleMenu()
{
    let uiRoot = new UIObject(vec2(canvasFixedSize.x/2,0));

    const uiTitle = new UIText(vec2(0, 100), vec2(1e3, 100),
    'Little\nAnimal\nTransport');
    uiTitle.textColor = WHITE;
    uiRoot.addChild(uiTitle);

    let uiMenu = new UIObject(vec2(0,450));
    uiRoot.addChild(uiMenu);

    const startNewGameButton = new UIButton(vec2(0,uiTitle.pos.y+160), vec2(350,70), 'New Game', defaultButtonColor, defaultLineWidth, defaultTextColor, defaultHoverColor);
    uiMenu.addChild(startNewGameButton);
    startNewGameButton.onClick = ()=>
    {
        console.log('initializing new game');

        if (GLOBAL.soundFxMaster){
            sound_click.play(vec2(0,0), GLOBAL.soundFxVolume);
        }
        startNewGame();
    }

    const settingsButton = new UIButton(vec2(0,startNewGameButton.pos.y+80), vec2(350,70), 'Settings', defaultButtonColor, defaultLineWidth, defaultTextColor, defaultHoverColor);
    uiMenu.addChild(settingsButton);
    settingsButton.onClick = () =>
    {
        console.log('going to settings');
        if (GLOBAL.soundFxMaster){
            sound_click.play(vec2(0,0), GLOBAL.soundFxVolume);
        }
        goToMenuState(Scene.Settings);
    }

    return uiRoot;
}

function buildSettingsMenu()
{
    let uiRoot = new UIObject(vec2(canvasFixedSize.x/2,0));

    const uiTitle = new UIText(vec2(0, 100), vec2(1e3, 70),
            'Settings');
    uiTitle.textColor = WHITE;
    uiRoot.addChild(uiTitle);

    let uiMenu = new UIObject(vec2(0, 100));
    uiRoot.addChild(uiMenu);

    const backButton = new UIButton(vec2(uiTitle.pos.x - 350, uiTitle.pos.y-100), vec2(175,70), 'Back', defaultButtonColor, defaultLineWidth, defaultTextColor, defaultHoverColor);
    uiMenu.addChild(backButton);
    backButton.onClick = () =>
    {
        console.log('going back to menu');
        if (GLOBAL.soundFxMaster){
            sound_click.play(vec2(0,0), GLOBAL.soundFxVolume);
        }
        goToMenuState(Scene.MainMenu);
    }

    return uiRoot;
}

function buildPlayerHUD()
{
    let uiRoot = new UIObject(vec2(canvasFixedSize.x/2,0));

    const uiBackground = new UITile(vec2(0,0),vec2(624*3,320*.6),tile(0,vec2(624,32),2));
    // const uiBackground = new drawUIRect
    const uiTimerLabel = new UIText(vec2(-500,50), vec2(1e3, 40),
                        '');
    const uiDayLabel = new UIText(vec2(0, 50), vec2(1e3, 40),
                        '');
    
    
    uiRoot.addChild(uiTimerLabel);
    uiRoot.addChild(uiDayLabel);
    uiRoot.addChild(uiBackground);
    
    return uiRoot;
}

function buildActionPanel()
{
    let uiRoot = new UIObject(vec2(64,0));

    const uiMenu = new UIObject(vec2(0,200));

    const testButton = new UITile(vec2(0,20), vec2(64,64), tile(0, 32, 4));
    testButton.onClick = () =>
    {
        testButton.selected = true;
        console.log(testButton.selected);
    }
    const buttonBackground = new UIObject(vec2(0,20), vec2(64,64));

    uiRoot.addChild(uiMenu);
    uiMenu.addChild(testButton);
    uiMenu.addChild(buttonBackground);

    return uiRoot;
}


function buildEndOfDayPopup()
{
    let uiRoot = new UIObject(vec2(canvasFixedSize.x/2,canvasFixedSize.y/2));

    const uiBackground = new UITile(vec2(0,0),vec2(896,896),tile(0,128,1));
    const uiTitle = new UIText(vec2(0,-350), vec2(1e3,40),
    'Summary: ');

    const continueToNewDayButton = new UIButton(vec2(0,230), vec2(350,70), 'Continue', defaultButtonColor, defaultLineWidth, defaultTextColor, defaultHoverColor);
    continueToNewDayButton.onPress = () =>
    {
        if (GLOBAL.soundFxMaster){
            sound_click.play(vec2(0,0), GLOBAL.soundFxVolume);
        }
        uiRoot.visible = false;
        
        goToGameState(GameState.Day);
        startNewDay();
    }

    uiRoot.addChild(uiBackground);
    uiRoot.addChild(uiTitle);
    uiRoot.addChild(continueToNewDayButton);

    return uiRoot;
}

///////////////////////////////////////////////////////////////////////////////
function getChild(parent)
{
    return parent.children;
}

function updateHUD(HUD)
{
    let timerLabel = HUD.children[0];
    let dayLabel = HUD.children[1];

    timerLabel.text = 'Remaining: ' + getFormattedDayTimer();
    dayLabel.text = 'Day: ' + GLOBAL.dayCount;
}

export
{
    getChild,
    buildTitleMenu,
    buildSettingsMenu,
    buildPlayerHUD,
    buildActionPanel,
    buildEndOfDayPopup,
    updateHUD,
}