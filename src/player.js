class Player extends EngineObject 
{
    constructor() 
    {
        super(vec2(-1,-1),vec2(0,0));
        this.money = 0;
        this.day = 0;
    }
    getMoney()
    {
        return this.money;
    }
}

export{
    Player,
}