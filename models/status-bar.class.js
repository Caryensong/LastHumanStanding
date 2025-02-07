/**
 * Represents a status bar for the player's health, poison level, or the endboss's health in the game.
 * The status bar dynamically updates based on the type and percentage of the respective status.
 * 
 * @class StatusBar
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {

  /**
   * Images representing different health (life) levels.
   * @type {Array<string>}
   */
  Images_Life = [
    'img/Life/0.png',
    'img/Life/20.png',
    'img/Life/40.png',
    'img/Life/60.png',
    'img/Life/80.png',
    'img/Life/100.png',
  ];

  /**
   * Images representing different poison (poisoned bubbles) levels.
   * @type {Array<string>}
   */
  Images_Poison = [
    'img/poisoned bubbles/0.png',
    'img/poisoned bubbles/20.png',
    'img/poisoned bubbles/40.png',
    'img/poisoned bubbles/60.png',
    'img/poisoned bubbles/80.png',
    'img/poisoned bubbles/100.png',
  ];

  /**
   * Images representing different endboss health levels.
   * @type {Array<string>}
   */
  Images_EndBoss = [
    './img/endboss/statusbar/0.png',
    './img/endboss/statusbar/20.png',
    './img/endboss/statusbar/40.png',
    './img/endboss/statusbar/60.png',
    './img/endboss/statusbar/80.png',
    './img/endboss/statusbar/100.png',
  ];

  /**
   * The current life percentage of the player.
   * @type {number}
   */
  precentage = 100;

  /**
   * The current poison percentage affecting the player.
   * @type {number}
   */
  poisonPercentage = 100;

  /**
   * The current health percentage of the endboss.
   * @type {number}
   */
  endBossPercentage = 100;

  /**
   * Creates an instance of the StatusBar and initializes its type and respective status.
   * 
   * @param {number} x - The x-coordinate for the position of the status bar.
   * @param {number} y - The y-coordinate for the position of the status bar.
   * @param {number} width - The width of the status bar.
   * @param {number} height - The height of the status bar.
   * @param {string} [type='life'] - The type of status bar ('life', 'poison', 'endbossLife').
   */
  constructor(x, y, width, height, type = 'life') {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; 
    this.loadImages(this.Images_Life);
    this.loadImages(this.Images_Poison);
    this.loadImages(this.Images_EndBoss);

    if (this.type === 'life') {
      this.setPercentage(100); // Life starts with 100%
    } else if (this.type === 'poison') {
      this.setPoisonPercentage(100); // Poison starts with 100%
    } else if (this.type === 'endbossLife') {
      this.setEndbossPercentage(100); // Endboss life starts with 100%
    }
  }

  /**
   * Sets the endboss health percentage and updates the status bar image accordingly.
   * 
   * @param {number} endBossPercentage - The percentage of health the endboss has left.
   */
  setEndbossPercentage(endBossPercentage) {
    if (this.type !== 'endbossLife') return;
    this.endBossPercentage = endBossPercentage;
    let path = this.Images_EndBoss[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Sets the player's health percentage and updates the status bar image accordingly.
   * 
   * @param {number} percentage - The health percentage of the player.
   */
  setPercentage(percentage) {
    if (this.type !== 'life') return; // Only for life type
    this.percentage = percentage;
    let path = this.Images_Life[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Sets the poison level percentage and updates the status bar image accordingly.
   * 
   * @param {number} amount - The poison level percentage affecting the player.
   */
  setPoisonPercentage(amount) {
    if (this.type !== 'poison') return;
    this.poisonPercentage = amount;
    let path = this.Images_Poison[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the current percentage value (life, poison, or endboss).
   * 
   * @returns {number} The index for the appropriate image based on the percentage value.
   */
  resolveImageIndex() {
    if (this.type === 'poison') {
      if (this.poisonPercentage === 100) {
        return 5;
      } else if (this.poisonPercentage >= 80) {
        return 4;
      } else if (this.poisonPercentage >= 60) {
        return 3;
      } else if (this.poisonPercentage >= 40) {
        return 2;
      } else if (this.poisonPercentage >= 20) {
        return 1;
      } else {
        return 0;
      }
    }

    if (this.type === 'life') {
      if (this.percentage === 100) {
        return 5;
      } else if (this.percentage >= 80) {
        return 4;
      } else if (this.percentage >= 60) {
        return 3;
      } else if (this.percentage >= 40) {
        return 2;
      } else if (this.percentage >= 20) {
        return 1;
      } else {
        return 0;
      }
    }

    if (this.type === 'endbossLife') {
      if (this.endBossPercentage === 100) {
        return 5;
      } else if (this.endBossPercentage >= 80) {
        return 4;
      } else if (this.endBossPercentage >= 60) {
        return 3;
      } else if (this.endBossPercentage >= 40) {
        return 2;
      } else if (this.endBossPercentage >= 20) {
        return 1;
      } else {
        return 0;
      }
    }
  }
}
