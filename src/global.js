/*
global variables

*/

const GLOBAL = {
    dayTimer: new Timer(),
    dayCount: 0,
}

const COLORS = {

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
    GLOBAL.dayCount += 1;
}

export{
    GLOBAL,
    COLORS,
    incrementDay,
    startDayTimer,
    getFormattedDayTimer,
}