/**
 * Represents the Endboss character in the game. 
 * This object manages the Endboss's state (e.g., hurt, dying), animations, movement, and interactions with the player.
 * 
 * @class Endboss
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  offset = {
    top: 65,
    left: 65,
    right: 20,
    bottom: 40

  }
  /**
    * Array of image paths for the Endboss's animation.
    * 
    * @type {string[]}
    */
  Images_Slashing = [
    'img/endboss/Run Slashing/0_Golem_Run Slashing_000.png',
    'img/endboss/Run Slashing/0_Golem_Run Slashing_001.png',
    'img/endboss/Run Slashing/0_Golem_Run Slashing_002.png',
    'img/endboss/Run Slashing/0_Golem_Run Slashing_003.png',
    'img/endboss/Run Slashing/0_Golem_Run Slashing_004.png',
    'img/endboss/Run Slashing/0_Golem_Run Slashing_005.png',
    'img/endboss/Run Slashing/0_Golem_Run Slashing_006.png',
    'img/endboss/Run Slashing/0_Golem_Run Slashing_007.png',
    'img/endboss/Run Slashing/0_Golem_Run Slashing_008.png',
    'img/endboss/Run Slashing/0_Golem_Run Slashing_009.png',
    'img/endboss/Run Slashing/0_Golem_Run Slashing_010.png',
    'img/endboss/Run Slashing/0_Golem_Run Slashing_011.png',
  ];

  Images_Hurt = [
    './img/endboss/Hurt/0_Golem_Hurt_000.png',
    './img/endboss/Hurt/0_Golem_Hurt_001.png',
    './img/endboss/Hurt/0_Golem_Hurt_002.png',
    './img/endboss/Hurt/0_Golem_Hurt_003.png',
    './img/endboss/Hurt/0_Golem_Hurt_004.png',
    './img/endboss/Hurt/0_Golem_Hurt_005.png',
    './img/endboss/Hurt/0_Golem_Hurt_006.png',
    './img/endboss/Hurt/0_Golem_Hurt_007.png',
    './img/endboss/Hurt/0_Golem_Hurt_008.png',
    './img/endboss/Hurt/0_Golem_Hurt_009.png',
    './img/endboss/Hurt/0_Golem_Hurt_010.png',
    './img/endboss/Hurt/0_Golem_Hurt_011.png'
  ];

  Images_Dying = [
    './img/endboss/Dying/0_Golem_Dying_000.png',
    './img/endboss/Dying/0_Golem_Dying_001.png',
    './img/endboss/Dying/0_Golem_Dying_002.png',
    './img/endboss/Dying/0_Golem_Dying_003.png',
    './img/endboss/Dying/0_Golem_Dying_004.png',
    './img/endboss/Dying/0_Golem_Dying_005.png',
    './img/endboss/Dying/0_Golem_Dying_006.png',
    './img/endboss/Dying/0_Golem_Dying_007.png',
    './img/endboss/Dying/0_Golem_Dying_008.png',
    './img/endboss/Dying/0_Golem_Dying_009.png',
    './img/endboss/Dying/0_Golem_Dying_010.png',
    './img/endboss/Dying/0_Golem_Dying_011.png',
    './img/endboss/Dying/0_Golem_Dying_012.png',
    './img/endboss/Dying/0_Golem_Dying_013.png',
    './img/endboss/Dying/0_Golem_Dying_014.png'
  ];

  /**
  * Flag to determine if the Endboss is currently dying.
  * 
  * @type {boolean}
  */
  isDying = false;


  /**
  * Creates an instance of the Endboss.
  * Initializes the Endboss's image, position, size, movement, and animations.
  * 
  * @constructor
  */
  constructor() {
    super().loadImage(this.Images_Slashing[0]);
    this.loadImages(this.Images_Slashing);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dying);
    this.x = 1800;
    this.y = 220;
    this.height = 250;
    this.width = 255;
    this.speed = 0.3;
    this.otherDirection = true;
    this.energy = 100;
    this.startMovement();
  }


  /**
  * Starts the movement of the Endboss. The Endboss will walk toward the player and perform a slashing animation.
  * The movement stops if the Endboss is hurt or dying.
  * 
  * @returns {void}
  */
  startMovement() {
    if (this.movementInterval) clearInterval(this.movementInterval);
    if (this.walkingInterval) clearInterval(this.walkingInterval);

    this.movementInterval = setInterval(() => {
      if (this.isDying || this.isHurt()) return; // Stoppt Bewegung, wenn verletzt oder tot

      const distance = Math.abs(world.character.x - this.x);

      if (distance <= 500) {
        if (this.walkingInterval) clearInterval(this.walkingInterval);

        this.walkingInterval = setInterval(() => {
          if (this.isDying || this.isHurt()) {
            return;
          }

          if (this.x <= 1200) {
            this.otherDirection = false;
          } else if (this.x >= 1800) {
            this.otherDirection = true;
          }

          if (this.otherDirection) {
            this.moveLeft();
          } else {
            this.moveRight();
          }

        }, 5);

        this.playAnimation(this.Images_Slashing);
        AudioHub.playSound(AudioHub.EndbossWalk);
      } else {
        AudioHub.EndbossWalk.pause();
      }
    }, 80);
  }

  /**
    * Plays the hurt animation for the Endboss.
    * The hurt animation stops after playing through all frames, then resumes the Endboss's movement.
    * 
    * @returns {void}
    */
  playHurtAnimation() {
    if (this.isHurt()) return;

    clearInterval(this.movementInterval);
    clearInterval(this.walkingInterval);  

    let currentFrame = 0;

    const hurtAnimationInterval = setInterval(() => {
      if (currentFrame < this.Images_Hurt.length) {
        this.img = this.imageCache[this.Images_Hurt[currentFrame]];
        currentFrame++;
        AudioHub.playSound(AudioHub.EndbossHurt);
      } else {
        clearInterval(hurtAnimationInterval);
        setTimeout(() => {
          this.startMovement();
        }, 500);
      }
    }, 100); 
  }

  /**
    * Plays the dying animation for the Endboss.
    * The animation plays through all frames and then the Endboss is considered defeated.
    * 
    * @returns {void}
    */
  playDeadAnimation() {
    if (this.isDying) return;
    this.isDying = true;
    this.energy = 0;
    clearInterval(this.movementInterval); 
    clearInterval(this.walkingInterval); 
    AudioHub.EndbossWalk.pause();

    let currentFrame = 0;

    const deadAnimationInterval = setInterval(() => {
      if (currentFrame < this.Images_Dying.length) {
        AudioHub.playSound(AudioHub.EndbossHurt);
        this.img = this.imageCache[this.Images_Dying[currentFrame]];
        currentFrame++;
      } else {
        clearInterval(deadAnimationInterval);
        this.img = this.imageCache[this.Images_Dying[this.Images_Dying.length - 1]]; // Bleibt auf letztem Bild
      }
    }, 100);
  }

}
