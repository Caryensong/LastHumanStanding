class Level {   
    statusBar;
    start;
    enemies;
    moon;
    clouds;
    backgroundObjects;
    level_end_x=2160;

    constructor(statusBar, start, enemies, moon, clouds,  backgroundObjects){  
        this.statusBar = statusBar;
        this.start = start;
        this.enemies = enemies;
        this.moon = moon;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}