/**
 * Represents an object that can move within the game world. 
 * This class handles the basic movement, gravity, collision detection, and interactions for movable objects such as characters and enemies.
 * 
 * @class MovableObject
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

    /**
     * The speed at which the object moves horizontally.
     * 
     * @type {number}
     * @default 0.15
     */
    speed = 0.15;
  
    /**
     * The direction the object is facing. If true, the object is facing right; otherwise, left.
     * 
     * @type {boolean}
     * @default false
     */
    otherDirection = false;
  
    /**
     * The vertical speed of the object (used for gravity effects).
     * 
     * @type {number}
     * @default 0
     */
    speedY = 0;
  
    /**
     * The acceleration applied to the object due to gravity.
     * 
     * @type {number}
     * @default 2.5
     */
    acceleration = 2.5;
  
    /**
     * The current energy level of the object.
     * 
     * @type {number}
     * @default 100
     */
    energy = 100;
  
    /**
     * The timestamp of the last time the object was hit.
     * 
     * @type {number}
     * @default 0
     */
    lastHit = 0;
  
    /**
     * The offset used to adjust the object's collision box.
     */
    offset = {top: 0, left: 0, right: 0, bottom: 0};
  
    /**
     * Applies gravity to the object, adjusting its vertical position and speed.
     * The object will fall until it reaches the ground.
     * 
     * @method applyGravaty
     */
    applyGravaty() {
      setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        } else {
          this.y = 307; 
          this.speedY = 0;
        }
      }, 1000 / 25);
    }
  
    /**
     * Checks if the object is above the ground (used for detecting whether the object is falling).
     * 
     * @returns {boolean} True if the object is above the ground, false otherwise.
     * @method isAboveGround
     */
    isAboveGround() {
      if (this instanceof ThrowableObject) {
        return true;
      } else {
        return this.y < 300;
      }
    }
  
    /**
     * Checks if this object is colliding with another object.
     * 
     * @param {MovableObject} mo The other object to check for collision.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     * @method isColliding
     */
    isColliding(mo) {
      return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
  
    /**
     * Checks if the object is colliding with another object (e.g., zombie) from the top.
     * 
     * @param {MovableObject} mo The other object to check for top collision.
     * @returns {boolean} True if the object is colliding from the top, false otherwise.
     * @method isTopZombieColliding
     */
    isTopZombieColliding(mo) {
      const bottomOfCharacter = this.y + this.height - this.offset.bottom;
      const topOfEnemy = mo.y + mo.offset.top;
      const horizontalOverlap = this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
                                this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
  
      return bottomOfCharacter >= topOfEnemy && bottomOfCharacter <= topOfEnemy + mo.height && horizontalOverlap;
    }
  
    /**
     * Checks if a slashing attack from the object is colliding with another object.
     * 
     * @param {MovableObject} mo The other object to check for collision.
     * @returns {boolean} True if the slashing area of the object is colliding with the other object, false otherwise.
     * @method isSlashingColliding
     */
    isSlashingColliding(mo) {
      let slashX = this.otherDirection
        ? this.x - this.offset.left
        : this.x + this.width + this.offset.right;
  
      let slashWidth = this.offset.right + this.offset.left;
  
      return (slashX < mo.x + mo.width && slashX + slashWidth > mo.x);
    }
  
    /**
     * Plays the animation by looping through the provided images.
     * 
     * @param {string[]} images An array of image paths to be used in the animation.
     * @method playAnimation
     */
    playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  
    /**
     * Moves the object to the right by its speed.
     * 
     * @method moveRight
     */
    moveRight() {
      this.x += this.speed;
    }
  
    /**
     * Moves the object to the left by its speed.
     * 
     * @method moveLeft
     */
    moveLeft() {
      this.x -= this.speed;
    }
  
    /**
     * Makes the object jump by applying vertical speed.
     * 
     * @method jump
     */
    jump() {
      this.speedY = 25;
    }
  
    /**
     * Reduces the object's energy by 10. If the energy reaches 0, triggers death or defeat animations.
     * 
     * @method hit
     */
    hit() {
      this.energy -= 10;
  
      if (this.energy <= 0) {
        this.energy = 0;
  
        if (this instanceof Character) {
          this.playDeathAnimation();
        } else if (this instanceof Endboss) {
          console.log("Endboss besiegt!");
          this.playDeadAnimation();
        }
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  
    /**
     * Determines if the object was hurt within the last 0.5 seconds.
     * 
     * @returns {boolean} True if the object was hurt within the last 0.5 seconds, false otherwise.
     * @method isHurt
     */
    isHurt() {
      let timepassed = new Date().getTime() - this.lastHit;
      timepassed = timepassed / 1000; // in seconds
      return timepassed < 0.5; // within 0.5s
    }
  
    /**
     * Checks if the object is dead (i.e., its energy is 0).
     * 
     * @returns {boolean} True if the object is dead, false otherwise.
     * @method isDead
     */
    isDead() {
      return this.energy == 0;
    }
  
    /**
     * Moves the object down by its speed.
     * 
     * @method moveDown
     */
    moveDown() {
      this.y += this.speed;
    }
  }
  