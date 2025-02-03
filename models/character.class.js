class Character extends MovableObject {
   speed = 4;
   world;
   isSlashing = false;
   isInvulnerable = false;
   isDeadAlready = false; 

   sounds = {
      WALK: new Audio('./audio/Walking1.mp3'),
      JUMP: new Audio('./audio/jump.mp3'),
      HURT: new Audio('./audio/hurt.mp3'),
      SLASH: new Audio('./audio/sword-sound-260274.mp3')
   };

   offset = {
      top: 30,
      left: 40,
      right: 40,
      bottom: 20
   }

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

   constructor() {
      super().loadImage(this.Images_Walking[0]);
      this.loadImages(this.Images_Walking);
      this.loadImages(this.Images_Jumping);
      this.loadImages(this.Images_Dead);
      this.loadImages(this.Images_Hurt);
      this.loadImages(this.Images_Throwing);
      this.loadImages(this.Images_Slashing);
      this.applyGravaty();
      this.animate();
   }

   playDeathAnimation() {
      if (this.isDeadAlready) return;
  
      console.log("Starte Todesanimation!");
      this.isDeadAlready = true;
      this.speed = 0;  
      this.world.keyboard = {}; 
  
      let index = 0;
      let deathAnimation = setInterval(() => {
          this.img = this.imageCache[this.Images_Dead[index]];
          index++;
  
          if (index >= this.Images_Dead.length) {
              clearInterval(deathAnimation);
              console.log("Todesanimation beendet!");
          }
      }, 100); // Wechsle Bild alle 100ms
  
      setTimeout(() => {
          console.log("Spieler ist tot! Game Over!");
      }, this.Images_Dead.length * 100);
  }
  
   animate() {
      setInterval(() => {
         this.sounds.WALK.pause();
         if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.sounds.WALK.play();
            this.otherDirection = false;
            this.offset = {
               top: 30,
               left: 40,
               right: 40,
               bottom: 20
            }
         }

         if (this.world.keyboard.LEFT && this.x > -100) {
            this.x -= this.speed;
            this.moveLeft();
            this.sounds.WALK.play();
            this.otherDirection = true;
            this.offset = {
               top: 30,
               left: 40,
               right: 40,
               bottom: 20
            }
         }
         

         if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            if(!this.world.keyboard.SPACE_SOLVED){
               this.jump();
               this.sounds.JUMP.play();
               // this.world.checkEnemyTopCollision();
               this.world.keyboard.SPACE_SOLVED = true;
            } 
         }

         if (this.world.keyboard.S) {
            this.isSlashing = true;
            this.playAnimation(this.Images_Slashing);
            this.sounds.SLASH.play();
            this.offset = {
                  top: 30,
                  left: 35,
                  right: 15,
                  bottom: 20
               };   
            if (!this.world.keyboard.S_SOLVED) {
               this.world.checkSlashingCollisions();
               this.world.keyboard.S_SOLVED = true;   
            }
            setTimeout(() => {
               this.isSlashing = false;
               this.world.keyboard.S_SOLVED = false;
            }, 1800); // Slashing schutz dauer
         }

         if (this.world.keyboard.D) {
            if(!this.world.keyboard.D_SOLVED){
              this.playAnimation(this.Images_Throwing);
               this.sounds.JUMP.play();  
               this.world.keyboard.D_SOLVED = true;
            }
           
         }

         this.world.camera_x = -this.x + 100;
      }, 1000 / 60);

   
      setInterval(() => {
         if (this.isDeadAlready) return;// Falls Charakter tot ist, keine weiteren Animationen starten
        
         if (this.isHurt()) {
            this.sounds.HURT.play();
            this.playAnimation(this.Images_Hurt);
         } else if (this.isAboveGround()) {
            this.playAnimation(this.Images_Jumping);
         } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
               this.playAnimation(this.Images_Walking);
            }
         }
      }, 20);
   }

}

