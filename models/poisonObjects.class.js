/**
 * Represents an object that behaves like poison in the game. 
 * It is an animated object that moves randomly within a defined area and displays a set of images in a loop to simulate the poison's appearance.
 * 
 * @class PoisonObjects
 * @extends MovableObject
 */
class PoisonObjects extends MovableObject {

  /**
   * An array of image paths for the poison animation.
   * 
   * @type {string[]}
   */
  Images = [
    './img/poison/1.png',
    './img/poison/2.png',
    './img/poison/3.png',
    './img/poison/4.png',
    './img/poison/5.png',
    './img/poison/6.png',
    './img/poison/7.png',
    './img/poison/8.png'
  ];

  /**
   * Creates a new poison object at a random position within the defined x and y range.
   * 
   * @param {number} x - The initial x-coordinate for the poison object.
   * @param {number} y - The initial y-coordinate for the poison object.
   */
  constructor(x, y) {
    super().loadImage(this.Images[0]);
    this.loadImages(this.Images);
    this.x = x + Math.random() * 720;
    this.y = y + Math.random() * 215;
    this.width = 35;
    this.height = 35;
    this.animation();
  }

  /**
   * Starts an animation loop that cycles through the poison images to create a visual effect.
   * The animation is updated every 250 milliseconds.
   * 
   * @method animation
   */
  animation() {
    setInterval(() => {
      this.playAnimation(this.Images);
    }, 250);
  }
}
