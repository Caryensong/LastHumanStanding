/**
 * Represents a background object in the game.
 * Extends the MovableObject class and supports transparency.
 * 
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject{
    /**
     * The opacity of the background object (1 = fully visible, 0 = fully transparent).
     * @type {number}
     */
    opacity = 1;

    /**
     * Creates an instance of BackgroundObject.
     * 
     * @param {string} imagePath - The path to the image file.
     * @param {number} x - The x-coordinate position of the background object.
     * @param {number} y - The y-coordinate position of the background object.
     * @param {number} width - The width of the background object.
     * @param {number} height - The height of the background object.
     * @param {number} [opacity=1] - The opacity of the background object (default is 1).
     */
    constructor(imagePath, x, y, width, height, opacity = 1){
        super().loadImage(imagePath);
        this.x = x;
        this.width = width;
        this.height = height;
        this.y = y;
        this.opacity = opacity; 
    }
    
}