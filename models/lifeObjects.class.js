/**
 * Represents a life object in the game, which is a collectible item that can restore health or provide lives to the player.
 * These objects are typically displayed as health icons and move within the game world.
 * 
 * @class LifeObjects
 * @extends MovableObject
 */
class LifeObjects extends MovableObject{

      /**
   * An array of image paths representing the appearance of the life object.
   * The image used is a health icon.
   * 
   * @type {Array<string>}
   */
    Images =[
        './img/Life/icon_health.png'
    ];

  /**
   * Creates a new life object that can be collected by the player.
   * The position is randomized within specified limits, making the objects appear in different locations.
   * 
   * @param {number} x - The base x position of the life object.
   * @param {number} y - The base y position of the life object.
   */
    constructor(x, y){
        super().loadImage(this.Images[0]);
        this.loadImages(this.Images);
        this.x = x + Math.random()* 720;
        this.y = y + Math.random()* 215;
        this.width = 35;
        this.height = 35; 
    }
}