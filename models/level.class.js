class Level {   
    start;
    enemies;
    moon;
    clouds;
    backgroundObjects;
    level_end_x=1400;

    constructor(start, enemies, moon, clouds,  backgroundObjects){  
        this.start = start;
        this.enemies = enemies;
        this.moon = moon;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}