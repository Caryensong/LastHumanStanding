class Endboss extends MovableObject {
  walking_sound = new Audio("./audio/monster_step.mp3");

  offset={
    top: 65,
    left:90,
    right:90, 
    bottom:40
}

  Images_Walking = [
    "./img/endboss/Walking/0_Golem_Walking_000.png",
    "./img/endboss/Walking/0_Golem_Walking_001.png",
    "./img/endboss/Walking/0_Golem_Walking_002.png",
    "./img/endboss/Walking/0_Golem_Walking_003.png",
    "./img/endboss/Walking/0_Golem_Walking_004.png",
    "./img/endboss/Walking/0_Golem_Walking_005.png",
    "./img/endboss/Walking/0_Golem_Walking_006.png",
    "./img/endboss/Walking/0_Golem_Walking_007.png",
    "./img/endboss/Walking/0_Golem_Walking_008.png",
    "./img/endboss/Walking/0_Golem_Walking_009.png",
    "./img/endboss/Walking/0_Golem_Walking_010.png",
    "./img/endboss/Walking/0_Golem_Walking_011.png",
    "./img/endboss/Walking/0_Golem_Walking_012.png",
    "./img/endboss/Walking/0_Golem_Walking_013.png",
    "./img/endboss/Walking/0_Golem_Walking_014.png",
    "./img/endboss/Walking/0_Golem_Walking_015.png",
    "./img/endboss/Walking/0_Golem_Walking_016.png",
    "./img/endboss/Walking/0_Golem_Walking_017.png",
    "./img/endboss/Walking/0_Golem_Walking_018.png",
    "./img/endboss/Walking/0_Golem_Walking_019.png",
  ];

  constructor() {
    super().loadImage(this.Images_Walking[0]);
    this.loadImages(this.Images_Walking);
    this.x = 700;
    this.y = 175;
    this.height = 300;
    this.width = 305;
    this.speed = 0.3;
    this.otherDirection = true;
    this.animate();
  }
  
  animate() {
    setInterval(()=>{     
      this.moveLeft();
  }, 1000/ 60);


    setInterval(() => {
      this.playAnimation(this.Images_Walking);
      this.walking_sound.play();
    }, 100);
  }
}
