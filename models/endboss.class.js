class Endboss extends MovableObject {
  walking_sound = new Audio("./audio/monster_step.mp3");

  offset = {
    top: 65,
    left: 90,
    right: 60,
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

  hadFirstContact = false;

  constructor() {
    super().loadImage(this.Images_Slashing[0]);
    this.loadImages(this.Images_Slashing);
    this.x = 1800;
    this.y = 175;
    this.height = 300;
    this.width = 305;
    this.speed = 0.3;
    this.otherDirection = true;
    this.animate();
  }

  animate() {

    //   setInterval(()=>{     
    //     this.moveLeft();
    // }, 1000/ 60);



    setInterval(() => {
      const distance = Math.abs(world.character.x - this.x);

      if (distance <= 400) {
        setInterval(() => {
          if (world.character.x < this.x) {
          this.moveLeft(); // Richtung Spieler (links)
        } else if(world.character.x > this.x) {
          this.moveRight(); // Richtung Spieler (rechts)
          this.otherDirection = false;
        
        }
        }, 1000 / 25);

  
      this.playAnimation(this.Images_Slashing);
        this.walking_sound.play();
      } else {
        this.walking_sound.pause(); // Stoppe Sound, wenn außerhalb der Distanz
      }

    }, 100);
  }
}
