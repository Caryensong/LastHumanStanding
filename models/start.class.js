/**
 * Represents the starting object in the game. This object is typically used as a start point or as part of the initial game setup.
 * It is a movable object that is displayed on the screen with a specified image and dimensions.
 * 
 * @class Start
 * @extends MovableObject
 */
class Start extends MovableObject {

    /**
     * Creates a new start object with the specified image, position, and size.
     * 
     * @param {string} imagePath - The path to the image that represents the start object.
     * @param {number} x - The x-coordinate of the start object.
     * @param {number} y - The y-coordinate of the start object.
     * @param {number} width - The width of the start object.
     * @param {number} height - The height of the start object.
     */
    constructor(imagePath, x, y, width, height) {
      super().loadImage(imagePath);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  }
  