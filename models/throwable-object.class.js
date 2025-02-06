/**
 * Represents an object that can be thrown by the character, such as a poison object or projectile.
 * The object follows a parabolic path due to gravity and can be thrown in the direction the character is facing.
 * 
 * @class ThrowableObject
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

    /**
     * The offset values that help to position the object for collision detection and rendering.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     * @property {number} bottom - The bottom offset.
     */
    offset = {
      top: 0,
      left: 10,
      right: 10,
      bottom: 0
    };
  
    /**
     * An array of image paths representing the explosion animations of the throwable object.
     * @type {Array<string>}
     */
    Images_Explosion = [
      './img/explosion/explosion1.png',
      './img/explosion/explosion2.png',
      './img/explosion/explosion3.png',
    ];
  
    /**
     * Creates an instance of the ThrowableObject and initializes its properties.
     * The object is thrown from the character's current position and follows a gravity-affected path.
     * 
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     * @param {Character} character - The character who is throwing the object.
     */
    constructor(x, y, character) {
      super().loadImage('./img/poison/1.png'); // Sets the initial image of the object
      this.loadImages(this.Images_Explosion); // Loads the explosion images for the throwable object
      this.x = x;
      this.y = y;
      this.character = character; // Reference to the character object
      this.height = 50; // Set the height of the throwable object
      this.width = 50;  // Set the width of the throwable object
      this.throw(); // Initiates the throwing action of the object
    }
  
    /**
     * Initiates the throwing action of the object, including the vertical speed due to gravity.
     * The object is thrown in the direction the character is facing (left or right).
     */
    throw() {
      this.speedY = 30; // Initial speed in the Y-direction (upward throw)
      this.applyGravaty(); // Applies gravity to the object
      setInterval(() => {
        // Moves the object in the direction the character is facing (left or right)
        if (this.character.otherDirection === true) {
          this.x -= 10; // Moves left if the character is facing left
        } else {
          this.x += 10; // Moves right if the character is facing right
        }
      }, 40); // Updates the position of the object every 40 milliseconds
    }
  }
  