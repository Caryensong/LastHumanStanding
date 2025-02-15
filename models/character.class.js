/**
 * Represents the main character in the game.
 * The character can walk, jump, slash, throw, and interact with the game world.
 * 
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
   /**
    * @param {number} -The movement speed of the character.
    * @param {object} -The reference to the game world.
    * @param {boolean} -Indicates whether the character is currently slashing.
    * @param {boolean} -Indicates whether the character is invulnerable.
    * @param {boolean} -Indicates whether the character is already dead.
    */
   speed = 3;
   world;
   isSlashing = false;
   isInvulnerable = false;
   isDeadAlready = false; 


    /**
     * Defines the hitbox offset of the character.
     * @type {object}
     * @property {number} top - The top offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     * @property {number} bottom - The bottom offset.
     */
   offset = {
      top: 30,
      left: 40,
      right: 40,
      bottom: 20
   }

    /**
     * Array of image paths for walking animation.
     * @param {string[]}
     */
   Images_Walking = [
      './img/human/Walking/0_Fallen_Angels_Walking_002.png',
      './img/human/Walking/0_Fallen_Angels_Walking_003.png',
      './img/human/Walking/0_Fallen_Angels_Walking_004.png',
      './img/human/Walking/0_Fallen_Angels_Walking_005.png',
      './img/human/Walking/0_Fallen_Angels_Walking_006.png',
      './img/human/Walking/0_Fallen_Angels_Walking_007.png',
      './img/human/Walking/0_Fallen_Angels_Walking_008.png',
      './img/human/Walking/0_Fallen_Angels_Walking_009.png',
      './img/human/Walking/0_Fallen_Angels_Walking_010.png',
      './img/human/Walking/0_Fallen_Angels_Walking_011.png',
      './img/human/Walking/0_Fallen_Angels_Walking_012.png',
      './img/human/Walking/0_Fallen_Angels_Walking_013.png',
      './img/human/Walking/0_Fallen_Angels_Walking_014.png',
      './img/human/Walking/0_Fallen_Angels_Walking_015.png',
      './img/human/Walking/0_Fallen_Angels_Walking_016.png',
      './img/human/Walking/0_Fallen_Angels_Walking_017.png',
      './img/human/Walking/0_Fallen_Angels_Walking_018.png',
      './img/human/Walking/0_Fallen_Angels_Walking_019.png',
      './img/human/Walking/0_Fallen_Angels_Walking_020.png',
      './img/human/Walking/0_Fallen_Angels_Walking_021.png',
      './img/human/Walking/0_Fallen_Angels_Walking_022.png',
      './img/human/Walking/0_Fallen_Angels_Walking_023.png',
   ];

     /**
     * Array of image paths for jumping animation.
     * @param {string[]}
     */
   Images_Jumping = [
      './img/human/Jump Start/0_Fallen_Angels_Jump Start_000.png',
      './img/human/Jump Start/0_Fallen_Angels_Jump Start_001.png',
      './img/human/Jump Start/0_Fallen_Angels_Jump Start_002.png',
      './img/human/Jump Start/0_Fallen_Angels_Jump Start_003.png',
      './img/human/Jump Start/0_Fallen_Angels_Jump Start_004.png',
      './img/human/Jump Start/0_Fallen_Angels_Jump Start_005.png',
      './img/human/Jump Loop/0_Fallen_Angels_Jump Loop_000.png',
      './img/human/Jump Loop/0_Fallen_Angels_Jump Loop_001.png',
      './img/human/Jump Loop/0_Fallen_Angels_Jump Loop_002.png',
      './img/human/Jump Loop/0_Fallen_Angels_Jump Loop_003.png',
      './img/human/Jump Loop/0_Fallen_Angels_Jump Loop_004.png',
      './img/human/Falling Down/0_Fallen_Angels_Falling Down_000.png',
      './img/human/Falling Down/0_Fallen_Angels_Falling Down_001.png',
      './img/human/Falling Down/0_Fallen_Angels_Falling Down_002.png',
      './img/human/Falling Down/0_Fallen_Angels_Falling Down_003.png',
      './img/human/Falling Down/0_Fallen_Angels_Falling Down_004.png',
      './img/human/Falling Down/0_Fallen_Angels_Falling Down_005.png',
   ];

    /**
     * Array of image paths for dead animation.
     * @param {string[]}
     */
   Images_Dead = [
      './img/human/Dying/0_Fallen_Angels_Dying_000.png',
      './img/human/Dying/0_Fallen_Angels_Dying_001.png',
      './img/human/Dying/0_Fallen_Angels_Dying_002.png',
      './img/human/Dying/0_Fallen_Angels_Dying_003.png',
      './img/human/Dying/0_Fallen_Angels_Dying_004.png',
      './img/human/Dying/0_Fallen_Angels_Dying_005.png',
      './img/human/Dying/0_Fallen_Angels_Dying_006.png',
      './img/human/Dying/0_Fallen_Angels_Dying_007.png',
      './img/human/Dying/0_Fallen_Angels_Dying_008.png',
      './img/human/Dying/0_Fallen_Angels_Dying_009.png',
      './img/human/Dying/0_Fallen_Angels_Dying_010.png',
      './img/human/Dying/0_Fallen_Angels_Dying_011.png',
      './img/human/Dying/0_Fallen_Angels_Dying_012.png',
      './img/human/Dying/0_Fallen_Angels_Dying_013.png',
      './img/human/Dying/0_Fallen_Angels_Dying_014.png'
   ];

      /**
     * Array of image paths for hurt animation.
     * @param {string[]}
     */
   Images_Hurt = [
      './img/human/Hurt/0_Fallen_Angels_Hurt_000.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_001.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_002.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_003.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_004.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_005.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_006.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_007.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_008.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_009.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_010.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_011.png'
   ];

      /**
     * Array of image paths for slash animation.
     * @param {string[]}
     */
   Images_Slashing = [
      './img/human/Run Slashing/0_Fallen_Angels_Run Slashing_000.png',
      './img/human/Run Slashing/0_Fallen_Angels_Run Slashing_001.png',
      './img/human/Run Slashing/0_Fallen_Angels_Run Slashing_002.png',
      './img/human/Run Slashing/0_Fallen_Angels_Run Slashing_003.png',
      './img/human/Run Slashing/0_Fallen_Angels_Run Slashing_004.png',
      './img/human/Run Slashing/0_Fallen_Angels_Run Slashing_005.png',
      './img/human/Run Slashing/0_Fallen_Angels_Run Slashing_006.png',
      './img/human/Run Slashing/0_Fallen_Angels_Run Slashing_007.png',
      './img/human/Run Slashing/0_Fallen_Angels_Run Slashing_008.png',
      './img/human/Run Slashing/0_Fallen_Angels_Run Slashing_009.png',
      './img/human/Run Slashing/0_Fallen_Angels_Run Slashing_010.png',
      './img/human/Run Slashing/0_Fallen_Angels_Run Slashing_011.png'
   ];

    /**
     * Array of image paths for throwing animation.
     * @param {string[]}
     */
   Images_Throwing = [
      './img/human/Throwing/0_Fallen_Angels_Throwing_000.png',
      './img/human/Throwing/0_Fallen_Angels_Throwing_001.png',
      './img/human/Throwing/0_Fallen_Angels_Throwing_002.png',
      './img/human/Throwing/0_Fallen_Angels_Throwing_003.png',
      './img/human/Throwing/0_Fallen_Angels_Throwing_004.png',
      './img/human/Throwing/0_Fallen_Angels_Throwing_005.png',
      './img/human/Throwing/0_Fallen_Angels_Throwing_006.png',
      './img/human/Throwing/0_Fallen_Angels_Throwing_007.png',
      './img/human/Throwing/0_Fallen_Angels_Throwing_008.png',
      './img/human/Throwing/0_Fallen_Angels_Throwing_009.png',
      './img/human/Throwing/0_Fallen_Angels_Throwing_010.png',
      './img/human/Throwing/0_Fallen_Angels_Throwing_011.png',
   ];

       /**
     * Array of image paths for idle animation.
     * @param {string[]}
     */
   Images_Idle =[
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_000.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_001.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_002.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_003.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_004.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_005.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_006.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_007.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_008.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_009.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_010.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_011.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_012.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_013.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_014.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_015.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_016.png',
      './img/human/Idle Blinking/0_Fallen_Angels_Idle Blinking_017.png'
   ];

   /**
     * Creates an instance of Character.
     */
   constructor() {
      super().loadImage(this.Images_Walking[0]);
      this.loadImages(this.Images_Walking);
      this.loadImages(this.Images_Idle);
      this.loadImages(this.Images_Jumping);
      this.loadImages(this.Images_Dead);
      this.loadImages(this.Images_Hurt);
      this.loadImages(this.Images_Throwing);
      this.loadImages(this.Images_Slashing);
      this.applyGravaty();
      this.animate();
   }

   /**
 * Triggers the death animation of the character.
 */
playDeathAnimation() {
   if (this.isDeadAlready) return;
   this.isDeadAlready = true;
   this.speed = 0;
   this.world.keyboard = {};
   let index = 0;
   let deathAnimation = setInterval(() => {
       if (index < this.Images_Dead.length) {
           this.img = this.imageCache[this.Images_Dead[index++]];
           AudioHub.playSound(AudioHub.CharDead);
       } else {
           clearInterval(deathAnimation);
           this.img = this.imageCache[this.Images_Dead.at(-1)];
       }
   }, 100);
}

/**
* Handles character movement and actions at a fixed interval.
*/
animate() {
   setInterval(() => {
       this.handleMovement();
       this.handleActions();
       this.world.camera_x = -this.x + 100;
   }, 1000 / 60);
   setInterval(() => this.handleAnimation(), 70);
}

/**
* Handles character movement based on user input.
*/
handleMovement() {
   AudioHub.CharWalk.pause();
   if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) this.move("right");
   if (this.world.keyboard.LEFT && this.x > -100) this.move("left");
   if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.world.keyboard.SPACE_SOLVED) this.jumpAction();
}

/**
* Handles character actions such as slashing and throwing.
*/
handleActions() {
   if (this.world.keyboard.S && !this.world.keyboard.S_SOLVED) this.slashAction();
   if (this.world.keyboard.D && !this.world.keyboard.D_SOLVED) this.throwAction();
}

/**
* Handles character animation based on state.
*/
handleAnimation() {
   if (this.isDeadAlready) return;
   if (this.isSlashing) return this.playAnimation(this.Images_Slashing);
   if (this.isHurt()) return this.playHurtAnimation();
   if (this.isAboveGround()) return this.playAnimation(this.Images_Jumping);
   if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) return this.playAnimation(this.Images_Walking);
   this.playAnimation(this.Images_Idle);
}

/**
* Moves the character in the specified direction.
* @param {string} direction - The direction to move ("right" or "left").
*/
move(direction) {
   this[direction === "right" ? "moveRight" : "moveLeft"]();
   AudioHub.playSound(AudioHub.CharWalk);
   this.otherDirection = direction !== "right";
   this.offset = { top: 30, left: 40, right: 40, bottom: 20 };
}

/**
* Executes the jump action for the character.
*/
jumpAction() {
   this.jump();
   AudioHub.playSound(AudioHub.CharJump);
   this.world.keyboard.SPACE_SOLVED = true;
}

/**
* Executes the slashing attack for the character.
*/
slashAction() {
   this.isSlashing = true;
   AudioHub.playSound(AudioHub.CharSlash);
   this.offset = { top: 30, left: 35, right: 15, bottom: 20 };
   this.world.checkSlashingCollisions();
   this.world.keyboard.S_SOLVED = true;
   setTimeout(() => {
       this.isSlashing = false;
       this.world.keyboard.S_SOLVED = false;
   }, 1000);
}

/**
* Executes the throwing action for the character.
*/
throwAction() {
   this.playAnimation(this.Images_Throwing);
   AudioHub.playSound(AudioHub.CharJump);
   this.world.keyboard.D_SOLVED = true;
}

/**
* Plays the hurt animation and sound effect.
*/
playHurtAnimation() {
   AudioHub.playSound(AudioHub.CharHurt);
   this.playAnimation(this.Images_Hurt);
}

}

