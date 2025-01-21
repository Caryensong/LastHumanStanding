class Level {   
    start;
    enemies;
    moon;
    clouds;
 
    backgroundObjects;

    constructor(start, enemies, moon, clouds,  backgroundObjects){  
        this.start = start;
        this.enemies = enemies;
        this.moon = moon;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}