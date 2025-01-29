class Endboss extends MovableObject {
  Walk = new Audio('./audio/monster_step.mp3');
  HURT = new Audio('./audio/monster-211717.mp3')

  offset = {
    top: 65,
    left: 65,
    right: 20,
    bottom: 40

  }

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

  isDying = false;
  isHurt = false; 

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

  startMovement() {
    if (this.movementInterval) clearInterval(this.movementInterval);
    if (this.walkingInterval) clearInterval(this.walkingInterval);

    this.movementInterval = setInterval(() => {
      if (this.isDying || this.isHurt) return; // Stoppt Bewegung, wenn verletzt oder tot


      const distance = Math.abs(world.character.x - this.x);

      if (distance <= 500) {
        if (this.walkingInterval) clearInterval(this.walkingInterval);

        this.walkingInterval = setInterval(() => {
          if (this.isDying || this.isHurt) {
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

        }, 1000 / 90) ;

        this.playAnimation(this.Images_Slashing);
        this.Walk.play();
        this.Walk.volume = 0.5;
      } else {
        this.Walk.pause();
      }
    }, 100);
  }

  

  playHurtAnimation() {
    if (this.isHurt) return;

    this.isHurt = true;  // Flag setzen, damit Animation nicht mehrfach gestartet wird

    clearInterval(this.movementInterval);  // Bewegung stoppen
    clearInterval(this.walkingInterval);  // Falls er noch läuft, stoppen

    let currentFrame = 0;

    const hurtAnimationInterval = setInterval(() => {
      if (currentFrame < this.Images_Hurt.length) {
        this.img = this.imageCache[this.Images_Hurt[currentFrame]];
        currentFrame++;
        this.HURT.play();

        
      } else {
        clearInterval(hurtAnimationInterval);
        setTimeout(() => {
          this.isHurt = false; // Nach der Animation wieder freigeben
          this.startMovement();
          ; // Nur EINMAL Bewegung starten
        }, 500);
      }
    }, 100);  // Schnellere Hurt-Animation für bessere Sichtbarkeit
  }


  playDeadAnimation() {
    if (this.isDying) return;
    this.isDying = true;
    this.energy = 0;
    clearInterval(this.movementInterval); // Stoppt alle Bewegungen
    clearInterval(this.walkingInterval); // Falls noch eine Bewegung läuft
    this.Walk.pause(); // Stoppt den Sound

    let currentFrame = 0;

    const deadAnimationInterval = setInterval(() => {
      if (currentFrame < this.Images_Dying.length) {
        this.HURT.play();
        this.img = this.imageCache[this.Images_Dying[currentFrame]];
        currentFrame++;
      } else {
        clearInterval(deadAnimationInterval);
        console.log("Endboss ist besiegt!");

      }
    }, 100);
  }

}
