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
      super().loadImage('./img/poison/1.png');
      this.loadImages(this.Images_Explosion); 
      this.x = x;
      this.y = y;
      this.character = character; 
      this.height = 50;
      this.width = 50;
      this.throwDirection = character.otherDirection ? -1 : 1;
      this.throw();
    }
  
    /**
     * Initiates the throwing action of the object, including the vertical speed due to gravity.
     * The object is thrown in the direction the character is facing (left or right).
     */
    throw() {
      this.speedY = 30;
      this.applyGravaty();
      setInterval(() => {
          this.x += this.throwDirection * 10;
      }, 40);
  }
}