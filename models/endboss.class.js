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
  this.clearMovementIntervals();

  this.movementInterval = setInterval(() => {
    if (this.isDying || this.isHurt()) return;

    const distance = Math.abs(world.character.x - this.x);
    if (distance <= 500) {
      this.startWalking();
    } else {
      this.stopWalking();
    }
  }, 80);
}

/**
* Clears any existing movement or walking intervals.
* This ensures that there are no overlapping intervals when starting new movements or walking cycles.
* 
* @returns {void}
*/
clearMovementIntervals() {
  if (this.movementInterval) clearInterval(this.movementInterval);
  if (this.walkingInterval) clearInterval(this.walkingInterval);
}

/**
* Starts the walking animation and movement of the Endboss toward the player.
* The walking interval is created, and the direction is updated in every cycle.
* 
* @returns {void}
*/
startWalking() {
  this.clearWalkingInterval(); // Ensure no previous walking interval is running.

  this.walkingInterval = setInterval(() => {
    if (this.isDying || this.isHurt()) return;

    this.updateDirection();
    this.moveCharacter();
  }, 5);

  this.playWalkingAnimation();
}

/**
* Clears the walking interval, stopping any active walking movement.
* 
* @returns {void}
*/
clearWalkingInterval() {
  if (this.walkingInterval) clearInterval(this.walkingInterval);
}

/**
* Updates the direction in which the Endboss is moving.
* The direction is set based on the Endboss's x-coordinate, reversing direction if it reaches the specified limits.
* 
* @returns {void}
*/
updateDirection() {
  this.otherDirection = this.x >= 1800 ? true : this.x <= 1200 ? false : this.otherDirection;
}

/**
* Moves the Endboss either left or right based on the current direction.
* 
* @returns {void}
*/
moveCharacter() {
  this.otherDirection ? this.moveLeft() : this.moveRight();
}

/**
* Plays the walking animation for the Endboss, including the slashing animation.
* Additionally, it plays the walk sound effect.
* 
* @returns {void}
*/
playWalkingAnimation() {
  this.playAnimation(this.Images_Slashing);
  AudioHub.playSound(AudioHub.EndbossWalk);
}

/**
* Pauses the walking sound and stops the Endboss from walking.
* 
* @returns {void}
*/
stopWalking() {
  AudioHub.EndbossWalk.pause();
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

  this.startDyingSequence();
  this.playDeadAnimationFrames();
}

/**
* Starts the dying sequence by setting the Endboss's state to dying, clearing intervals, and reducing energy.
* 
* @returns {void}
*/
startDyingSequence() {
  this.isDying = true;
  this.energy = 0;
  this.stopMovement();
}

/**
* Clears the movement and walking intervals, halting any further movement or actions.
* 
* @returns {void}
*/
stopMovement() {
  clearInterval(this.movementInterval);
  clearInterval(this.walkingInterval);
  this.stopWalking();
}

/**
* Plays the dying animation frames for the Endboss.
* The animation is shown frame by frame and plays a sound with each frame.
* 
* @returns {void}
*/
playDeadAnimationFrames() {
  let currentFrame = 0;
  const deadAnimationInterval = setInterval(() => {
      if (currentFrame < this.Images_Dying.length) {
          this.updateDeadFrame(currentFrame);
          currentFrame++;
      } else {
          this.finishDeadAnimation(deadAnimationInterval);
      }
  }, 100);
}

/**
* Updates the image for each frame during the dying animation.
* A sound is played every time a new frame is shown.
* 
* @param {number} frame - The index of the current frame being shown.
* 
* @returns {void}
*/
updateDeadFrame(frame) {
  AudioHub.playSound(AudioHub.EndbossHurt);
  this.img = this.imageCache[this.Images_Dying[frame]];
}

/**
* Finishes the dying animation by displaying the last frame and stopping the animation interval.
* 
* @param {number} deadAnimationInterval - The interval ID for the dying animation.
* 
* @returns {void}
*/
finishDeadAnimation(deadAnimationInterval) {
  clearInterval(deadAnimationInterval);
  this.img = this.imageCache[this.Images_Dying[this.Images_Dying.length - 1]];
}


}
