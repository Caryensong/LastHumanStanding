class Character extends MovableObject{
   speed = 4;  
   world;
   walking_sound= new Audio('./audio/Walking1.mp3');

   humanWalking = [
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

   humanJumping= [
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
 
     constructor(){
        super().loadImage(this.humanWalking[0]);
        this.loadImages(this.humanWalking);
        this.loadImages(this.humanJumping);
        this.applyGravaty();
        this.animate();
     }

     animate(){

      setInterval(() => {
         this.walking_sound.pause();
         if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){ 
            this.x +=this.speed;
            this.otherDirection = false;
            this.walking_sound.play();
         }
         if(this.world.keyboard.LEFT && this.x > -100 ){ 
            this.x -= this.speed;
            this.otherDirection = true;
            this.walking_sound.play();
         }
   
         if(this.world.keyboard.UP && !this.isAboveGround()){
            this.jump();
         }

         this.world.camera_x = -this.x + 100;
       }, 1000 / 60);
      

      setInterval(() => {
         if(this.isAboveGround()){
            this.playAnimation(this.humanJumping);
         } else{
             if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){ 
            this.playAnimation(this.humanWalking);
         }
         }
      }, 20);
     }

}