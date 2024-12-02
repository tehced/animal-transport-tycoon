/*
global variables

*/

const GLOBAL = {

    soundFxVolume: 1,
    soundFxMaster: true,

    bgMusicVolume: 1,
    bgMusicMaster: true,

    desiredCameraPos: cameraPos,

    //potentially move to a separate GameManager script
    dayTimer: new Timer(),
    dayCount: 0,
}

const COLORS = {
    NOTEBOOK: new Color(0.67,0.58,0.47),
}


function startDayTimer()
{
    return GLOBAL.dayTimer.set(5);
}

function getFormattedDayTimer()
{
    return formatTime(-GLOBAL.dayTimer);
}

function incrementDay()
{
    return GLOBAL.dayCount += 1;
}

export{
    GLOBAL,
    COLORS,
    incrementDay,
    startDayTimer,
    getFormattedDayTimer,
}