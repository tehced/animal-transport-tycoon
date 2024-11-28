import * as main from '../src/main.js';
import * as global from './global.js';

// sound effects
const sound_click = new Sound([1,0]);

function buildTitleMenu()
{
    let uiRoot = new UIObject(vec2(mainCanvasSize.x/2,0));

    const uiTitle = new UIText(vec2(0, 100), vec2(1e3, 70),
    'Little\nAnimal\nTransport');
    uiTitle.textColor = WHITE;
    uiTitle.lineWidth = 8;
    uiRoot.addChild(uiTitle);

    let uiMenu = new UIObject(vec2(0,450));
    uiRoot.addChild(uiMenu);

    const startNewGameButton = new UIButton(vec2(0,80), vec2(350,70), 'New Game', WHITE, 6, CYAN);
    uiMenu.addChild(startNewGameButton);
    startNewGameButton.onClick = ()=>
    {
        console.log('initializing new game');
        sound_click.play();
        main.startNewGame();
    }

    const settingsButton = new UIButton(vec2(0,160), vec2(350,70), 'Settings', WHITE, 6, CYAN);
    uiMenu.addChild(settingsButton);
    settingsButton.onClick = () =>
    {
        console.log('going to settings');
        sound_click.play();
        main.goToState()
    }

    return uiRoot;
}

function buildPlayerHUD()
{
    let uiRoot = new UIObject(vec2(mainCanvasSize.x/2,0));

    // const uiBackground = new UIObject

    const uiTimerLabel = new UIText(vec2(-500,50), vec2(1e3, 70),
                        '');

    uiTimerLabel.textColor = WHITE;
    uiTimerLabel.lineWidth = 4;

    const uiDayLabel = new UIText(vec2(0, 50), vec2(1e3, 70),
                        '');
    uiDayLabel.textColor = WHITE;
    uiDayLabel.lineWidth = 4;
    
    uiRoot.addChild(uiTimerLabel);
    uiRoot.addChild(uiDayLabel);

    return uiRoot;
}

function buildEndOfDayPopup()
{
    
}

///////////////////////////////////////////////////////////////////////////////
function getChild(parent)
{
    return parent.children;
}

function updateHUD(HUD, player)
{
    let timerLabel = HUD.children[0];
    let dayLabel = HUD.children[1];

    timerLabel.text = 'Remaining: ' + global.getFormattedDayTimer();
    dayLabel.text = 'Day: ' + player.day;
}

export
{
    buildTitleMenu,
    buildPlayerHUD,
    updateHUD,
}