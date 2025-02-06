/**
 * Represents a game level containing all the necessary objects, enemies, and environmental elements.
 * This class organizes and stores references to different components of the level, such as status bars,
 * enemies, environmental objects, and background elements, which are essential for gameplay.
 * 
 * @class Level
 */
class Level {   
    statusBar;
    start; 
    objects;
    enemies;
    moon;
    clouds;
    backgroundObjects;
    zombieHands;
    groundObject;
    
      /**
   * The end position of the level where the player reaches to complete the level.
   * Default value is 2160, but can vary based on the level design.
   * 
   * @type {number}
   * @default 2160
   */
    level_end_x=2160;


      /**
   * Creates a new level with specified objects and components.
   * 
   * @param {StatusBar} statusBar - The status bar of the level.
   * @param {Object} start - The start point of the level.
   * @param {Array<Object>} objects - An array of objects in the level.
   * @param {Array<Enemy>} enemies - An array of enemies in the level.
   * @param {Object} moon - The moon object in the level.
   * @param {Array<Cloud>} clouds - An array of clouds in the level.
   * @param {Array<Object>} backgroundObjects - An array of background objects in the level.
   * @param {Array<Object>} zombieHands - An array of zombie hands in the level.
   * @param {Object} groundObject - The ground object in the level.
   */
    constructor(statusBar, start, objects, enemies, moon, clouds, backgroundObjects, zombieHands, groundObject){  
        this.statusBar = statusBar;
        this.start = start;
        this.objects= objects;
        this.enemies = enemies;
        this.moon = moon;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.zombieHands = zombieHands;
        this.groundObject =groundObject;
    }
}