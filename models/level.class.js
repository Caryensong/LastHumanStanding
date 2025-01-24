class Level {   
    statusBar;
    start; 
    objects;
    enemies;
    moon;
    clouds;
    backgroundObjects;
    level_end_x=2160;

    constructor(statusBar, start, objects, enemies, moon, clouds,  backgroundObjects){  
        this.statusBar = statusBar;
        this.start = start;
        this.objects= objects;
        this.enemies = enemies;
        this.moon = moon;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}